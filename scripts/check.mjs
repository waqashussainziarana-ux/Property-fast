import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'4173',SMTP_HOST:''},stdio:'ignore'});
process.on('exit',()=>server.kill());
let ready=false;
for(let i=0;i<40;i++){try{await fetch('http://localhost:4173/api/contact');ready=true;break;}catch{await new Promise(r=>setTimeout(r,100));}}
assert.ok(ready,'Test server starts');
const root=resolve('dist');
async function files(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?files(join(dir,e.name)):join(dir,e.name)))).flat();}
const all=await files(root);const pages=all.filter(x=>x.endsWith('.html'));let checkedLinks=0;
for(const file of pages){
  const html=await readFile(file,'utf8');
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: one h1`);
  assert.ok(html.includes('name="description"'),`${file}: metadata`);
  assert.ok(html.includes('lang="en-GB"'),`${file}: language`);
  assert.ok(html.includes('+447538189214'),`${file}: phone`);
  assert.ok(html.includes('stablondon4@gmail.com'),`${file}: email`);
  assert.ok(!/Urban Property Compliance|0330 059 9992|Tariq Digitals|950\+|ISO 27001/.test(html),`${file}: reference brand must not leak`);
  for(const [,url] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)){
    if(!url.startsWith('/')||url.startsWith('//')||url.startsWith('/api/'))continue;
    const path=resolve(root,'.'+url.split(/[?#]/)[0]);
    try{const meta=await stat(path);if(meta.isDirectory())await stat(join(path,'index.html'));checkedLinks++;}catch{assert.fail(`Missing internal resource: ${url} from ${file}`);}
  }
}
const client=await readFile('public/assets/app.js','utf8');
assert.ok(!/SMTP_PASS|FORM_SECRET/.test(client),'No SMTP secrets in client');
const response=await fetch('http://localhost:4173/api/contact');
assert.equal(response.status,200);assert.deepEqual(await response.json(),{available:false,token:null});
const unavailable=await fetch('http://localhost:4173/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Test visitor'})});
assert.equal(unavailable.status,503,'Unconfigured SMTP must not report success');
const missing=await fetch('http://localhost:4173/this-page-does-not-exist/');assert.equal(missing.status,404);
console.log(JSON.stringify({htmlPages:pages.length,sitePages:pages.length-1,internalLinksAndAssetsChecked:checkedLinks,unconfiguredEmail:'honest 503 and unavailable flag',notFound:404,referenceBrandLeaks:0},null,2));
server.kill();
