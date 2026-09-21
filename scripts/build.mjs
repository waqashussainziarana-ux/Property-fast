import {mkdir,writeFile,cp} from 'node:fs/promises';
import {resolve} from 'node:path';
import {site} from '../src/config.mjs';
import {services} from '../src/services.mjs';
import {layout,home,servicesPage,detailPage,packagesPage,aboutPage,contactPage,privacyPage,intro,btn,esc} from '../src/render.mjs';

const out=resolve('dist');
await mkdir(out,{recursive:true});
await cp('public',out,{recursive:true});
const pages=[
  ['/', 'Property compliance, made straightforward', 'Property Fast brings together EPCs, EICRs, gas safety checks and property services. Call 07538 189214 or request a tailored quotation.', home()],
  ['/services/','Property certificates, inspections & services','Explore energy certificates, electrical reports, gas safety, fire risk assessments and more with Property Fast.',servicesPage()],
  ...services.map(s=>[`/services/${s.slug}/`,s.title,s.description,detailPage(s)]),
  ['/landlord-packages/','Landlord compliance packages','Combine property certificates, inspections and inventory enquiries in a tailored landlord package.',packagesPage()],
  ['/about/','About Property Fast','A straightforward point of contact for property certificates, inspections and essential services.',aboutPage()],
  ['/contact/','Contact & request a quote','Contact Property Fast on 07538 189214, WhatsApp or email. Tell us about your property and request a tailored quotation.',contactPage()],
  ['/work-with-us/','Work with Property Fast','Introduce your assessor, engineering or property services business to Property Fast.',contactPage(true)],
  ['/privacy/','Privacy & website information','How Property Fast handles enquiries and the information you choose to share.',privacyPage()],
];
for(const [route,title,description,body] of pages){
  const dir=resolve(out,'.'+route);await mkdir(dir,{recursive:true});
  await writeFile(resolve(dir,'index.html'),layout(title,description,route,body));
}
await writeFile(resolve(out,'404.html'),layout('Page not found','The requested page could not be found.','/404/',intro('Page not found','A small detour.','The page you requested is not here. Let’s get you back to the right place.')+`<div class="container not-found">${btn('Back to home','/')}</div>`));
await writeFile(resolve(out,'robots.txt'),site.indexable&&site.url?`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
if(site.url)await writeFile(resolve(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(([p])=>`<url><loc>${esc(site.url+p)}</loc></url>`).join('')+'</urlset>');
console.log(`Built ${pages.length} pages in ${out}. Search indexing: ${site.indexable?'enabled':'disabled for review'}.`);
