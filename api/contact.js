import {createHmac,randomBytes,timingSafeEqual,createHash} from 'node:crypto';
import nodemailer from 'nodemailer';
import {site} from '../src/config.mjs';
import {services} from '../src/services.mjs';

// Per-instance guard is supplementary; configure a Vercel Firewall rate-limit rule before enabling SMTP.
const attempts=new Map();
const usedTokens=new Map();
const allowedServices=new Set([...services.map(s=>s.title),'Landlord essentials','Tenancy ready','Portfolio care','Something else / not sure']);
const configured=()=>['SMTP_HOST','SMTP_USER','SMTP_PASS','SMTP_FROM','FORM_SECRET'].every(k=>Boolean(process.env[k]));
const signature=payload=>createHmac('sha256',process.env.FORM_SECRET||'unconfigured').update(payload).digest('hex');
const makeToken=()=>{const payload=`${Date.now()}.${randomBytes(16).toString('hex')}`;return `${payload}.${signature(payload)}`;};
function validToken(token){
  if(typeof token!=='string'||token.length>160)return false;
  const parts=token.split('.');if(parts.length!==3)return false;
  const [time,nonce,sig]=parts;
  const age=Date.now()-Number(time);
  if(!/^\d+$/.test(time)||!/^[a-f0-9]{32}$/.test(nonce)||!/^[a-f0-9]{64}$/.test(sig)||age<1500||age>30*60*1000)return false;
  return timingSafeEqual(Buffer.from(signature(`${time}.${nonce}`)),Buffer.from(sig));
}
function clean(value,max){return typeof value==='string'?value.trim().slice(0,max):'';}
function reply(res,status,data){res.setHeader('Cache-Control','no-store');return res.status(status).json(data);}
export default async function handler(req,res){
  if(req.method==='GET')return reply(res,200,{available:configured(),token:configured()?makeToken():null});
  if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return reply(res,405,{error:'Method not allowed.'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return reply(res,415,{error:'Please use the website enquiry form.'});
  let data=req.body;
  if(typeof data==='string'){try{data=JSON.parse(data);}catch{return reply(res,400,{error:'Invalid enquiry.'});}}
  if(!data||typeof data!=='object'||Array.isArray(data))return reply(res,400,{error:'Invalid enquiry.'});
  if(Buffer.byteLength(JSON.stringify(data))>12000)return reply(res,413,{error:'Your enquiry is too long.'});
  if(!configured())return reply(res,503,{error:'Online email delivery is not active yet. Please use email or WhatsApp below.'});
  const allowedOrigins=[process.env.SITE_URL,process.env.VERCEL_URL&&`https://${process.env.VERCEL_URL}`,process.env.VERCEL_PROJECT_PRODUCTION_URL&&`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`].filter(Boolean).map(u=>u.replace(/\/$/,''));
  if(!process.env.VERCEL)allowedOrigins.push('http://localhost:4173','http://127.0.0.1:4173');
  if(!allowedOrigins.includes(req.headers.origin))return reply(res,403,{error:'Please send your enquiry from the Property Fast website.'});
  if(data.website||!validToken(data.token))return reply(res,400,{error:'Please refresh the page and try again.'});
  const now=Date.now();
  for(const [k,v] of attempts)if(v.until<now)attempts.delete(k);
  for(const [k,until] of usedTokens)if(until<now)usedTokens.delete(k);
  const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  const key=createHash('sha256').update(ip).digest('hex');
  const current=attempts.get(key)||{count:0,until:now+15*60*1000};
  if(current.count>=5)return reply(res,429,{error:'Too many attempts. Please wait 15 minutes or contact us by phone.'});
  current.count++;attempts.set(key,current);
  if(usedTokens.has(data.token))return reply(res,409,{error:'This enquiry has already been submitted. Please call if you need to check delivery.'});
  const name=clean(data.name,100),email=clean(data.email,180),phone=clean(data.phone,30),postcode=clean(data.postcode,12).toUpperCase(),service=clean(data.service,120),message=clean(data.message,3000),type=data.type;
  if(name.length<2||/[\r\n]/.test(name)||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||!/^[A-Z0-9 ]{3,12}$/.test(postcode)||!allowedServices.has(service)||message.length<10||data.consent!==true||!['quote','contractor'].includes(type))return reply(res,400,{error:'Please check the required fields and enter a valid email address and postcode.'});
  usedTokens.set(data.token,now+30*60*1000);
  const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:process.env.SMTP_PORT==='465',requireTLS:process.env.SMTP_PORT!=='465',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},connectionTimeout:8000,greetingTimeout:8000,socketTimeout:12000,tls:{minVersion:'TLSv1.2'}});
  try{
    const result=await transport.sendMail({from:{name:'Property Fast website',address:process.env.SMTP_FROM},to:site.email,replyTo:{name,address:email},subject:`Property Fast ${type==='contractor'?'contractor enquiry':'quote request'}: ${service}`,text:`New Property Fast enquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone||'Not supplied'}\nPostcode: ${postcode}\nService: ${service}\nType: ${type}\n\n${message}\n\nConsent: customer agreed to being contacted about this enquiry.`});
    if(!result.accepted?.length)throw new Error('Recipient not accepted');
    return reply(res,200,{ok:true});
  }catch{
    // Avoid logging personal data or SMTP credentials; retain token to discourage duplicate sends on uncertain delivery.
    return reply(res,502,{error:'Email delivery could not be confirmed. Please call us or use an alternative below.'});
  }finally{transport.close();}
}
