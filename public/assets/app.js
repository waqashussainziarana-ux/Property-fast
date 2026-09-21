const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu(){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const selected=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;
  document.querySelectorAll('[data-group]').forEach(card=>{card.hidden=selected!=='All services'&&card.dataset.group!==selected;if(!card.hidden)count++;});
  document.querySelector('#filter-count').textContent=`${count} service${count===1?'':'s'}`;
}));

const form=document.querySelector('[data-enquiry]');
if(form){
  const selected=new URLSearchParams(location.search).get('service');
  const serviceSelect=form.elements.service;
  if(selected){const match=[...serviceSelect.options].find(o=>o.value.toLowerCase()===selected.toLowerCase());if(match)serviceSelect.value=match.value;}
  const status=form.querySelector('.form-status');
  const submit=form.querySelector('.form-submit');
  const alternatives=form.querySelector('.form-alternatives');
  let token='';let sendingAvailable=false;let pending=false;
  fetch('/api/contact',{headers:{Accept:'application/json'}}).then(r=>r.json()).then(data=>{
    sendingAvailable=data.available===true;token=data.token||'';
    if(!sendingAvailable){submit.firstChild.textContent='Prepare your enquiry ';status.textContent='Online email delivery is being configured. Prepare your enquiry below, then choose email or WhatsApp to send it.';}
  }).catch(()=>{submit.firstChild.textContent='Prepare your enquiry ';status.textContent='Prepare your enquiry, then send it using your email app or WhatsApp.';});
  function fallbacks(data,uncertain=false){
    const subject=`Property Fast ${data.type==='contractor'?'contractor enquiry':'quote request'}: ${data.service}`;
    const body=`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone||'Not provided'}\nPostcode: ${data.postcode}\nService: ${data.service}\n\n${data.message}`;
    form.querySelector('[data-email-fallback]').href=`mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('[data-wa-fallback]').href=`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(subject+'\n\n'+body)}`;
    alternatives.querySelector('p').textContent=uncertain?'Delivery has not been confirmed. Please call before resending to avoid duplicates, or review your message in another app.':'Your message has not been sent. Choose an alternative to review and send it:';
    alternatives.hidden=false;
  }
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(pending||!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form));
    data.consent=form.elements.consent.checked;data.token=token;
    alternatives.hidden=true;status.className='form-status';
    if(!sendingAvailable){status.textContent='Your enquiry is ready to review. Choose email or WhatsApp below to send it.';fallbacks(data);return;}
    pending=true;submit.disabled=true;status.textContent='Sending your enquiry…';
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(20000)});
      const result=await response.json();
      if(!response.ok){const error=new Error(result.error||'Your enquiry could not be sent.');error.deliveryUncertain=response.status===502||response.status===409;throw error;}
      status.className='form-status success';status.textContent='Thank you. Your enquiry has been accepted by our email service. If you do not hear back, please call us.';
      form.reset();submit.hidden=true;
    }catch(error){status.className='form-status error';const uncertain=error.deliveryUncertain||['TimeoutError','TypeError'].includes(error.name);status.textContent=uncertain?'We could not confirm delivery. Please call before sending again to avoid a duplicate.':error.message;fallbacks(data,uncertain);}
    finally{pending=false;submit.disabled=false;}
  });
}
