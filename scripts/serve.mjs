import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import handler from '../api/contact.js';
const root=resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server=createServer(async(req,res)=>{
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  if(pathname==='/api/contact'||pathname==='/api/contact/'){
    let raw='';let tooLarge=false;
    for await(const chunk of req){raw+=chunk;if(raw.length>16000){tooLarge=true;break;}}
    if(tooLarge){res.writeHead(413);res.end('Request too large');return;}
    try{req.body=raw?JSON.parse(raw):{};}catch{res.writeHead(400);res.end('Invalid JSON');return;}
    res.status=n=>(res.statusCode=n,res);res.json=d=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(d));};
    await handler(req,res);return;
  }
  let path=resolve(root,'.'+pathname);
  if(path!==root&&!path.startsWith(root+'/')){res.writeHead(403);res.end('Forbidden');return;}
  try{if((await stat(path)).isDirectory())path=resolve(path,'index.html');const body=await readFile(path);res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream'});res.end(body);}
  catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}
});
server.listen(Number(process.env.PORT||4173),'0.0.0.0',()=>console.log('Property Fast preview: http://localhost:4173'));
