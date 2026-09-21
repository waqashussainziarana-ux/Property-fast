import assert from 'node:assert/strict';
import {createHmac,randomBytes} from 'node:crypto';
import nodemailer from 'nodemailer';
import handler from '../api/contact.js';
import {services} from '../src/services.mjs';

// No live mail is sent: replace the SMTP transport with a deterministic test double.
Object.assign(process.env,{SMTP_HOST:'smtp.example.test',SMTP_PORT:'587',SMTP_USER:'test',SMTP_PASS:'test',SMTP_FROM:'sender@example.test',FORM_SECRET:'test-only-secret',SITE_URL:'https://property.example.test',VERCEL:'1'});
const origin=process.env.SITE_URL;
let sent,options,fail=false,closed=0;
nodemailer.createTransport=opts=>{options=opts;return {sendMail:async mail=>{sent=mail;if(fail)throw new Error('Simulated failure');return {accepted:[mail.to]};},close:()=>closed++};};
function token(){const payload=`${Date.now()-3000}.${randomBytes(16).toString('hex')}`;return `${payload}.${createHmac('sha256',process.env.FORM_SECRET).update(payload).digest('hex')}`;}
function data(){return {name:'Test Visitor',email:'visitor@example.test',phone:'',postcode:'SW1A 1AA',service:services[0].title,message:'Please quote for this property.',consent:true,type:'quote',website:'',token:token()};}
let ip=0;
async function request(body,headers={},method='POST'){
 const res={code:0,body:null,setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
 await handler({method,headers:{origin,'content-type':'application/json','x-forwarded-for':`192.0.2.${++ip}`,...headers},body},res);return res;
}
assert.equal((await request(null,{},'GET')).body.available,true);
assert.equal((await request(data(),{origin:'https://untrusted.example'})).code,403);
assert.equal((await request({...data(),website:'spam'})).code,400);
assert.equal((await request({...data(),token:'invalid'})).code,400);
assert.equal((await request({...data(),consent:false})).code,400);
assert.equal((await request({...data(),email:'bad\r\nBcc: attacker@example.test'})).code,400);
assert.equal((await request({...data(),service:'Unknown service'})).code,400);
assert.equal((await request(data(),{'content-type':'text/plain'})).code,415);
assert.equal((await request(data(),{},'DELETE')).code,405);
assert.equal((await request({...data(),message:'x'.repeat(13000)})).code,413);
const enquiry=data();assert.equal((await request(enquiry)).code,200);
assert.equal(sent.to,'stablondon4@gmail.com');assert.equal(sent.replyTo.address,'visitor@example.test');assert.equal(options.requireTLS,true);
assert.equal((await request(enquiry)).code,409);
for(let i=0;i<5;i++)assert.equal((await request(data(),{'x-forwarded-for':'198.51.100.1'})).code,200);
assert.equal((await request(data(),{'x-forwarded-for':'198.51.100.1'})).code,429);
fail=true;assert.equal((await request(data())).code,502);assert.equal(closed,7);
console.log('SMTP handler checks passed: validation, origins, honeypot, token, recipient, TLS, replay, rate limit, success and failure. No live mail sent.');
