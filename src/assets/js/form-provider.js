/* Public configuration only. Credentials belong in Worker secrets. */
(function(){
  'use strict';
  var forms=Array.from(document.querySelectorAll('#contactForm, #quoteForm'));
  if(!forms.length)return;
  var MAX=10000000;
  var extensions=['stl','3mf','obj','ply','step','stp','iges','igs','dxf','dwg','fcstd','f3d','blend','sldprt','sldasm','zip','7z','rar','jpg','jpeg','png','webp','heic','heif','pdf'];
  var config, mode=null, captchaReady;
  var measuredEnquiries=new Set();
  function status(form,message,error){var el=form.querySelector('[data-submission-status]');el.textContent=message;el.classList.remove('form-success');el.classList.toggle('form-error',!!error);if(error){el.setAttribute('tabindex','-1');el.focus();}}
  function enable(form,value){form.querySelector('[type="submit"]').disabled=!value;}
  function loadScript(src){return new Promise(function(resolve,reject){var s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=function(){reject(new Error('The enquiry service could not load. Please check your connection and reload this page.'));};document.head.appendChild(s);});}
  function randomHex(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),function(b){return b.toString(16).padStart(2,'0');}).join('');}
  function resetCaptcha(form){form._captcha='';if(window.turnstile&&form._widget!==undefined)window.turnstile.reset(form._widget);}
  async function prepareCaptcha(form){
    if(!captchaReady)captchaReady=window.turnstile?Promise.resolve():loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit').catch(function(e){captchaReady=null;throw e;});
    await captchaReady;
    if(form._widget!==undefined)return;
    form._widget=window.turnstile.render(form.querySelector('[data-captcha]'),{sitekey:config.turnstileSiteKey,action:'bondar_enquiry',size:'flexible',theme:'auto',
      callback:function(token){form._captcha=token;},'expired-callback':function(){form._captcha='';},'error-callback':function(){form._captcha='';}});
  }
  function filesFor(form){return form._files||[];}
  function validateFiles(files){
    if(files.length>3)throw new Error('Please choose no more than three files. For more files, share a folder link instead.');
    files.forEach(function(f){var ext=f.name.split('.').pop().toLowerCase();
      if(!f.size||f.size>MAX)throw new Error(f.name+': each file must be non-empty and 10 MB or smaller.');
      if(!extensions.includes(ext)||/\.(exe|com|bat|cmd|ps1|js|vbs|scr|msi|html?|svg)(\.|$)/i.test(f.name))throw new Error(f.name+': this file format is not supported.');
    });
  }
  function renderFiles(form){
    var list=form.querySelector('[data-file-list]');if(!list)return;list.replaceChildren();
    filesFor(form).forEach(function(file,i){var item=document.createElement('li'),text=document.createElement('span'),remove=document.createElement('button');
      text.textContent=file.name+' ('+(file.size/1000000).toFixed(2)+' MB)';remove.type='button';remove.className='btn btn-ghost';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+file.name);
      remove.disabled=!!form._busy||!!form._locked||!!(form._session&&form._session.committing);remove.addEventListener('click',function(){form._files.splice(i,1);form._session=null;renderFiles(form);form.querySelector('[type="file"]').focus();});item.append(text,remove);list.appendChild(item);
    });
  }
  function values(form){var fields={};Array.from(form.querySelectorAll('input,select,textarea')).forEach(function(el){
    if(!el.name||el.type==='file'||el.type==='hidden'||el.disabled||el.name==='website'||el.name==='cf-turnstile-response')return;
    fields[el.name]=el.value.trim();
  });return fields;}
  function request(form,action,body,isFile,onProgress){return new Promise(function(resolve,reject){
    var xhr=new XMLHttpRequest(),s=form._session;xhr.open('POST',config.gateway+'/session/'+s.id+'/'+action);xhr.timeout=isFile?120000:40000;
    xhr.setRequestHeader('Authorization','Bearer '+s.key);xhr.setRequestHeader('Content-Type',isFile?'application/octet-stream':'application/json');
    if(isFile&&onProgress)xhr.upload.onprogress=function(e){if(e.lengthComputable)onProgress(Math.round(e.loaded/e.total*100));};
    xhr.onload=function(){var data;try{data=JSON.parse(xhr.responseText);}catch(e){data={};}
      if(xhr.status<200||xhr.status>=300||data.success!==true){var error=new Error(data.message||'The service could not accept the request. Your details have been kept.');error.status=xhr.status;error.retryable=data.retryable===true;reject(error);}else resolve(data);};
    xhr.onerror=xhr.ontimeout=function(){var e=new Error('Connection interrupted. Your details and selected files have been kept. Please try again.');e.network=true;reject(e);};
    xhr.send(isFile?body:JSON.stringify(body||{}));
  });}
  function freeze(form,value){form._busy=value;form.setAttribute('aria-busy',String(value));Array.from(form.querySelectorAll('input:not([type="hidden"]),select,textarea,button')).forEach(function(el){el.disabled=value;});var button=form.querySelector('[type="submit"]');button.textContent=value?'Sending…':form._submitLabel;renderFiles(form);}
  function success(form,data){
    // Acceptance is a lead, not proof of email delivery or a paid order.
    // Keep request IDs only in this document to deduplicate recovered responses.
    if(data.state==='accepted'&&typeof data.id==='string'&&!measuredEnquiries.has(data.id)){
      measuredEnquiries.add(data.id);
      try{if(window.BondarAnalytics)window.BondarAnalytics.track('generate_lead',{form_type:form.id==='quoteForm'?'quote':'contact'});}catch(e){/* Measurement must never interrupt a successful enquiry. */}
    }
    form.reset();form._files=[];form._session=null;form._locked=false;resetCaptcha(form);freeze(form,false);
    var box=form.querySelector('[data-submission-status]');box.replaceChildren();box.classList.remove('form-error');box.classList.add('form-success');
    var title=document.createElement('strong'),message=document.createElement('span'),reference=document.createElement('span');
    title.textContent=form.id==='quoteForm'?'Quote request sent successfully':'Message sent successfully';
    message.textContent='Thank you — we have received your '+(form.id==='quoteForm'?'request':'message')+'. We will reply by email. You do not need to send it again.';
    reference.textContent='Reference: '+data.id;reference.className='form-success-reference';box.append(title,message,reference);
    box.setAttribute('tabindex','-1');box.focus();
  }
  async function send(form){
    var fields=values(form),files=filesFor(form);validateFiles(files);
    if(fields['File link']&&!/^https?:\/\//i.test(fields['File link']))throw new Error('Please enter a full http or https file link.');
    var payload={type:form.id==='quoteForm'?'quote':'contact',fields:fields,files:files.map(function(f){return {name:f.name,size:f.size};})};
    var fingerprint=JSON.stringify(payload);
    if(form._session&&form._session.fingerprint!==fingerprint){if(form._session.committing)throw new Error('Please contact us with reference BL-'+form._session.id+' before changing and resending this enquiry.');form._session=null;}
    if(!form._session)form._session={id:crypto.randomUUID(),key:randomHex(),fingerprint:fingerprint};
    var session=form._session;
    if(!session.prepared&&!form._captcha){await prepareCaptcha(form);throw new Error('Please complete the security verification before sending.');}
    var trap=form.querySelector('[name="website"]').value;
    freeze(form,true);
    if(window.BondarAnalytics)window.BondarAnalytics.track('form_submit_attempt',{form_type:payload.type});
    try{
      var data;
      if(session.prepared){status(form,'Checking your previous attempt…',false);try{data=await request(form,'status',{});}catch(e){if(e.status===410){form._session=null;resetCaptcha(form);throw new Error('The upload session expired. Your details have been kept. Please verify and send again.');}throw e;}}
      else{status(form,'Verifying your enquiry…',false);data=await request(form,'prepare',Object.assign({},payload,{captcha:form._captcha,honeypot:trap}));session.prepared=true;resetCaptcha(form);}
      if(data.state==='accepted'){success(form,data);return;}
      if(data.state==='uncertain'||data.state==='sending'){session.committing=true;throw new Error('We could not confirm acceptance. Please contact us with reference BL-'+session.id+' before submitting again.');}
      for(var i=0;i<files.length;i++){
        if(data.uploaded.includes(i))continue;
        status(form,'Uploading file '+(i+1)+' of '+files.length+'…',false);
        await request(form,'file/'+i,files[i],true,function(percent){status(form,'Uploading file '+(i+1)+' of '+files.length+': '+percent+'%'+(percent===100?' — waiting for storage confirmation…':''),false);});
        status(form,'File '+(i+1)+' of '+files.length+' saved. '+files[i].name,false);
      }
      status(form,'All selected files are saved. Sending your enquiry…',false);session.committing=true;
      data=await request(form,'submit',{});success(form,data);
    }catch(e){
      if(e.retryable)session.committing=false;
      if(session.committing&&e.network)e.message='The response was interrupted. Your enquiry may have been accepted. Use Send again to check this same request, or contact us with reference BL-'+session.id+'.';
      throw e;
    }finally{freeze(form,false);}
  }
  forms.forEach(function(form){
    form._files=[];form._submitLabel=form.querySelector('[type="submit"]').textContent;
    form.addEventListener('submit',function(e){
      if(mode===0||mode===1)return;
      e.preventDefault();if(form._busy||form._locked)return;
      if(mode!==2){status(form,'The enquiry service is still loading or unavailable. Please reload or contact us by email.',true);return;}
      send(form).catch(function(error){status(form,error.message,true);});
    });
    form.addEventListener('input',function(){if(form._session&&!form._session.committing&&!form._busy)form._session=null;});
    var input=form.querySelector('[type="file"]');if(input)input.addEventListener('change',function(){
      if(mode!==2)return;
      if(form._session&&form._session.committing){input.value='';status(form,'Please check your previous request before selecting new files.',true);return;}
      var added=Array.from(input.files),candidate=filesFor(form).slice();added.forEach(function(f){if(!candidate.some(function(x){return x.name===f.name&&x.size===f.size&&x.lastModified===f.lastModified;}))candidate.push(f);});
      try{validateFiles(candidate);form._files=candidate;form._session=null;renderFiles(form);status(form,candidate.length+' file(s) selected. Files are uploaded when you send the request.',false);}
      catch(e){status(form,e.message,true);}input.value='';
    });
  });
  fetch('/assets/data/form-provider.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('The enquiry settings could not load.');return r.json();}).then(async function(c){
    config=c;
    if(c.mode===2){
      if(!/^https:\/\/[^/]+$/.test(c.gateway)||!/^0x[A-Za-z0-9_-]+$/.test(c.turnstileSiteKey))throw new Error('The enquiry service is not ready. Please contact us by email or WhatsApp.');
      mode=2;forms.forEach(function(form){enable(form,true);status(form,'',false);});
      // Load verification only when the visitor starts using a form.
      forms.forEach(function(form){form.addEventListener('focusin',function(){prepareCaptcha(form).catch(function(e){status(form,e.message,true);});},{once:true});});return;
    }
    if(c.mode===1||c.mode===0){
      if(c.mode===0&&!/^https:\/\/formsubmit\.co\/[^/]+$/.test(c.formsubmitEndpoint||''))throw new Error('FormSubmit has not been configured. Please contact us by email.');
      mode=c.mode;
      forms.forEach(function(form){form.setAttribute('data-provider-mode',String(mode));form.setAttribute('data-provider-endpoint',mode===0?c.formsubmitEndpoint:'https://formly.email/submit');form.querySelector('[data-captcha]').hidden=true;var file=form.querySelector('[type="file"]');if(file){file.multiple=false;form.querySelector('#q-file-help').textContent='Legacy provider: one supported file only, up to 10 MB.';}});
      await loadScript('/assets/js/formly-relay.js?v=5');forms.forEach(function(form){enable(form,true);status(form,'',false);});return;
    }
    throw new Error('Unknown enquiry provider. Please contact us by email.');
  }).catch(function(e){mode=null;forms.forEach(function(form){enable(form,false);status(form,e.message,true);});});
})();
