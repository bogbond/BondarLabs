// Bondar Labs only. Credentials are Worker secrets; no Dreamy Cake changes.
export const MAX_FILE = 10_000_000;
export const EXTENSIONS = ['stl','3mf','obj','ply','step','stp','iges','igs','dxf','dwg','fcstd','f3d','blend','sldprt','sldasm','zip','7z','rar','jpg','jpeg','png','webp','heic','heif','pdf'];
const ORIGINS = ['https://bondarlabs.co.uk', 'https://www.bondarlabs.co.uk'];
const DAY = 86400000;
const AMBIGUOUS = 'We could not confirm acceptance. Please contact us with your request reference before submitting again.';
export class FormError extends Error { constructor(status, message) { super(message); this.status = status; } }
function json(status, data) { return Response.json(data, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}}); }
function fail(error) { return json(error instanceof FormError ? error.status : 502, {success:false,retryable:error.retryable===true,message:error instanceof FormError ? error.message : 'The enquiry service is temporarily unavailable. Your form has been kept. Please try again.'}); }
async function limited(request, max) {
  if (Number(request.headers.get('Content-Length')) > max) throw new FormError(413,'The upload is too large. Each file must be 10 MB or smaller.');
  if (!request.body) throw new FormError(400,'The request is empty.');
  const reader=request.body.getReader(), chunks=[]; let total=0;
  while(true) { const p=await reader.read(); if(p.done) break; total+=p.value.byteLength;
    if(total>max) {await reader.cancel(); throw new FormError(413,'The upload is too large. Each file must be 10 MB or smaller.');} chunks.push(p.value); }
  const bytes=new Uint8Array(total); let offset=0;
  for(const chunk of chunks) {bytes.set(chunk,offset);offset+=chunk.byteLength;}
  return bytes;
}
async function readJSON(request) {try{return JSON.parse(new TextDecoder().decode(await limited(request,65000)));}catch(e){if(e instanceof FormError)throw e;throw new FormError(400,'The request could not be read.');}}
async function hash(value) {const digest=await crypto.subtle.digest('SHA-256',typeof value==='string'?new TextEncoder().encode(value):value);return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');}
async function signature(params, secret) {const text=Object.keys(params).sort().map(k=>`${k}=${params[k]}`).join('&')+secret;
  const digest=await crypto.subtle.digest('SHA-1',new TextEncoder().encode(text)); return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');}
function timed(url, options, ms=20000) {return fetch(url,{...options,signal:AbortSignal.timeout(ms)});}
function short(value,max,required=false) {if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw new FormError(400,'Please check the required fields and shorten any very long entries.');return value.trim();}
export function expiry(createdAt, files) {
  const months=files.some(f=>f.size>5_000_000)?3:6;
  const d=new Date(createdAt), day=d.getUTCDate(); d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+months);
  const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,last));
  return d.toISOString();
}
export function dailyAlarm(iso) {return Math.ceil((Date.parse(iso)-6*3600000)/DAY)*DAY+6*3600000;}
function validatePayload(data, origin) {
  if(!data||!['contact','quote'].includes(data.type))throw new FormError(400,'Unknown enquiry form.');
  const fields=data.fields;
  const allowed=data.type==='contact'?['Name','Email','Message']:['Name','Email','Deadline','Quantity','Material','Delivery option','Phone','Colour','Description','File link'];
  if(!fields||typeof fields!=='object'||Array.isArray(fields)||Object.keys(fields).some(k=>!allowed.includes(k)))throw new FormError(400,'Please use the website enquiry form.');
  const clean={}; for(const name of allowed)clean[name]=short(fields[name]??'',name==='Message'||name==='Description'?10000:1000);
  if(!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(clean.Email)||clean.Email.length>254)throw new FormError(400,'Please enter a valid email address.');
  if(data.type==='quote'&&!clean.Name)throw new FormError(400,'Please enter your name.');
  if(!(clean.Message||clean.Description))throw new FormError(400,'Please describe what you need.');
  if(clean['File link']){try{const u=new URL(clean['File link']);if(!['https:','http:'].includes(u.protocol))throw 0;}catch{throw new FormError(400,'Please enter a complete http or https file link.');}}
  if(!Array.isArray(data.files)||data.files.length>(data.type==='quote'?3:0))throw new FormError(400,'Please select no more than three files for a quote.');
  const files=data.files.map(f=>{
    if(!f||typeof f!=='object')throw new FormError(400,'Please check the selected files.');
    const name=short(f.name,200,true); const ext=name.split('.').pop().toLowerCase();
    if(/[\x00-\x1f\\/]/.test(name)||!EXTENSIONS.includes(ext)||/\.(exe|com|bat|cmd|ps1|js|vbs|scr|msi|html?|svg)(\.|$)/i.test(name))throw new FormError(400,'One of the file formats is not supported. Please use a supported model, drawing, archive, image or PDF.');
    if(!Number.isInteger(f.size)||f.size<=0||f.size>MAX_FILE)throw new FormError(413,'Each file must be non-empty and 10 MB or smaller.');
    return {name,size:f.size,ext};
  });
  // Only canonical form paths are stored, never query strings or tracking identifiers.
  return {type:data.type,fields:clean,files,page:origin+(data.type==='quote'?'/quote/':'/contact/')};
}
export function checkBytes(bytes,ext) {
  const text=new TextDecoder().decode(bytes.slice(0,4096));const starts=(s)=>text.startsWith(s);
  const magic=(a)=>a.every((v,i)=>bytes[i]===v);
  if(magic([77,90])||/^\s*(?:<!doctype html|<html|<script)/i.test(text))throw new FormError(400,'This file does not appear to match its selected format.');
  let valid=true;
  if(['zip','3mf','fcstd','f3d'].includes(ext))valid=magic([80,75,3,4])||magic([80,75,5,6]);
  else if(ext==='7z')valid=magic([55,122,188,175,39,28]);
  else if(ext==='rar')valid=magic([82,97,114,33,26,7]);
  else if(ext==='pdf')valid=starts('%PDF-');
  else if(['jpg','jpeg'].includes(ext))valid=magic([255,216,255]);
  else if(ext==='png')valid=magic([137,80,78,71,13,10,26,10]);
  else if(ext==='webp')valid=starts('RIFF')&&text.slice(8,12)==='WEBP';
  else if(['heic','heif'].includes(ext))valid=text.slice(4,8)==='ftyp';
  else if(['step','stp'].includes(ext))valid=/ISO-10303-21\s*;/i.test(text);
  else if(ext==='ply')valid=/^ply\r?\n/.test(text);
  else if(ext==='blend')valid=starts('BLENDER');
  else if(ext==='dwg')valid=/^AC10\d\d/.test(text);
  else if(['sldprt','sldasm'].includes(ext))valid=magic([208,207,17,224,161,177,26,225]);
  else if(ext==='dxf')valid=/SECTION|AutoCAD Binary DXF/.test(text);
  else if(ext==='stl')valid=/^\s*solid\b/i.test(text)||(bytes.length>=84&&new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength).getUint32(80,true)*50+84===bytes.length);
  else if(ext==='obj')valid=/(?:^|\n)\s*(?:#|v |vn |vt |o |g |mtllib |f )/.test(text);
  else if(['igs','iges'].includes(ext))valid=/[SGDT] *\d+\s*(?:\r?\n|$)/m.test(text);
  if(!valid)throw new FormError(400,'This file does not appear to match its selected format.');
}
async function verify(data,request,env,origin) {
  if(data.honeypot)throw new FormError(400,'The request could not be accepted.');
  if(typeof data.captcha!=='string'||!data.captcha||data.captcha.length>2048)throw new FormError(400,'Please complete the security verification.');
  const body=new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:data.captcha});
  const ip=request.headers.get('CF-Connecting-IP');if(ip)body.set('remoteip',ip);
  const response=await timed('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body});const result=await response.json();
  if(!response.ok||!result.success||result.hostname!==new URL(origin).hostname||result.action!=='bondar_enquiry')throw new FormError(400,'Security verification expired or failed. Please complete it again.');
}
async function upload(bytes,file,env,session,index,expiresAt) {
  const params={public_id:`bondar-labs/enquiries/${session}/${index}.${file.ext}`,timestamp:String(Math.floor(Date.now()/1000)),overwrite:'true',context:`owner=bondar-labs|expires_at=${expiresAt}`,tags:'bondar-labs-enquiry'};
  const body=new FormData();for(const [k,v]of Object.entries(params))body.set(k,v);
  body.set('api_key',env.CLOUDINARY_API_KEY);body.set('signature',await signature(params,env.CLOUDINARY_API_SECRET));body.set('file',new Blob([bytes]),file.name);
  const response=await timed(`https://api.cloudinary.com/v1_1/${encodeURIComponent(env.CLOUDINARY_CLOUD_NAME)}/raw/upload`,{method:'POST',body},60000);
  const result=await response.json().catch(()=>({}));
  const prefix=`https://res.cloudinary.com/${env.CLOUDINARY_CLOUD_NAME}/raw/upload/`;
  if(!response.ok||!result.secure_url?.startsWith(prefix)||result.public_id!==params.public_id||result.bytes!==file.size)throw new FormError(502,'The file could not be saved. Your form has been kept. Please retry the upload.');
  return {publicId:result.public_id,url:result.secure_url,digest:await hash(bytes)};
}
async function destroy(publicId,env) {
  if(!/^bondar-labs\/enquiries\/[a-f0-9-]{36}\/[0-2]\.[a-z0-9]+$/.test(publicId))throw new Error('Refused out-of-scope deletion');
  const params={public_id:publicId,timestamp:String(Math.floor(Date.now()/1000)),invalidate:'true'};
  const body=new URLSearchParams(params);body.set('api_key',env.CLOUDINARY_API_KEY);body.set('signature',await signature(params,env.CLOUDINARY_API_SECRET));
  const response=await timed(`https://api.cloudinary.com/v1_1/${encodeURIComponent(env.CLOUDINARY_CLOUD_NAME)}/raw/destroy`,{method:'POST',body});const result=await response.json();
  if(!response.ok||!['ok','not found'].includes(result.result))throw new Error('Retention deletion failed');
}

// One SQLite-backed Durable Object per request: resumes individual uploads and
// remembers an accepted submission, so a lost browser response cannot duplicate it.
export class EnquirySession {
  constructor(ctx,env){this.ctx=ctx;this.env=env;this.tail=Promise.resolve();}
  fetch(request){const task=this.tail.then(()=>this.handle(request));this.tail=task.catch(()=>{});return task;}
  async handle(request){try{
    const url=new URL(request.url),[, ,id,action,index]=url.pathname.split('/');
    // Consume small control bodies before responding to a forwarded request.
    // Otherwise workerd may still be piping the body after the DO has replied.
    if(action!=='file'&&action!=='prepare'&&request.body)await limited(request,1024);
    const auth=request.headers.get('Authorization')||'';
    if(!/^Bearer [a-f0-9]{64}$/.test(auth))throw new FormError(401,'Please start a new enquiry.');
    const key=await hash(auth);let session=await this.ctx.storage.get('session');
    if(session&&session.key!==key)throw new FormError(403,'This enquiry could not be verified.');
    if(action==='prepare'){
      const data=await readJSON(request);const payload=validatePayload(data,request.headers.get('Origin'));
      const fingerprint=await hash(JSON.stringify(payload));
      if(session){if(session.fingerprint!==fingerprint)throw new FormError(409,'The enquiry changed. Please start a new request.');return json(200,this.status(session));}
      await verify(data,request,this.env,request.headers.get('Origin'));
      const createdAt=new Date().toISOString();session={id,key,fingerprint,payload,createdAt,expiresAt:expiry(createdAt,payload.files),uploads:[],state:'draft'};
      await this.ctx.storage.put('session',session);await this.ctx.storage.setAlarm(Date.now()+DAY);
      return json(200,this.status(session));
    }
    if(!session)throw new FormError(410,'This upload session has expired. Your form has been kept. Please send it again.');
    if(action==='status')return json(200,this.status(session));
    if(action==='file'){
      if(session.state!=='draft')throw new FormError(409,'This enquiry has already been submitted.');
      const i=Number(index),file=session.payload.files[i];if(!Number.isInteger(i)||!file)throw new FormError(400,'Unknown file.');
      const bytes=await limited(request,MAX_FILE);if(bytes.byteLength!==file.size)throw new FormError(400,'The upload was incomplete. Please retry.');checkBytes(bytes,file.ext);
      const digest=await hash(bytes);
      if(session.uploads[i]&&session.uploads[i].digest!==digest)throw new FormError(409,'The selected file changed. Please start a new request.');
      if(!session.uploads[i])session.uploads[i]=await upload(bytes,file,this.env,id,i,session.expiresAt);
      await this.ctx.storage.put('session',session);return json(200,{success:true,stored:true,index:i});
    }
    if(action!=='submit')throw new FormError(404,'Not found.');
    if(session.state==='accepted')return json(200,this.status(session));
    if(session.state==='uncertain'||session.state==='sending')throw new FormError(409,AMBIGUOUS+' Reference: BL-'+id);
    if(session.payload.files.some((f,i)=>!session.uploads[i]))throw new FormError(400,'Please finish uploading all selected files.');
    const p=session.payload;
    const submission={name:p.fields.Name||'Website visitor',email:p.fields.Email,subject:`Bondar Labs ${p.type==='quote'?'quote request':'contact enquiry'}`,
      Form:p.type,'Page URL':p.page,'Submission ID':'BL-'+id,'Submitted at':session.createdAt,message:Object.entries(p.fields).filter(([,v])=>v).map(([k,v])=>`${k}: ${v}`).join('\n\n')};
    p.files.forEach((file,i)=>{submission[`File ${i+1} name`]=file.name;submission[`File ${i+1} URL`]=session.uploads[i].url;});
    if(p.files.length)submission['Files available until']=session.expiresAt;
    session.state='sending';delete session.payload;await this.ctx.storage.put('session',session);
    let response;
    try {const formId=this.env[p.type==='quote'?'FORMSPARK_QUOTE_FORM_ID':'FORMSPARK_CONTACT_FORM_ID']||this.env.FORMSPARK_FORM_ID;
      response=await timed(`https://submit-form.com/${formId}`,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(submission)},25000);}
    catch {session.state='uncertain';await this.ctx.storage.put('session',session);throw new FormError(502,AMBIGUOUS+' Reference: BL-'+id);}
    const responseText=await response.text(); const result=(()=>{try{return JSON.parse(responseText)}catch{return null}})();
    if(!response.ok||!result||result.error){
      // Only explicit client/quota rejections are safely retryable. Other outcomes
      // may have reached Formspark; don't silently spend a second submission.
      session.state=([400,401,403,404,413,422,429].includes(response.status))?'draft':'uncertain';
      if(session.state==='draft')session.payload=p;
      await this.ctx.storage.put('session',session);
      const spam=response.status===403&&responseText.trim()==='Rejected by spam protection';
      const rejection=new FormError(spam?422:502,session.state==='draft'?(spam?'Your message was flagged by the email service\'s spam filter. Your details have been kept. Please revise the message or contact us by email.':'The enquiry service could not accept this request. Your details and uploads have been kept. Please contact us or try again later. Support code: F'+response.status+'.'):AMBIGUOUS+' Reference: BL-'+id);
      rejection.retryable=session.state==='draft';throw rejection;
    }
    session.state='accepted';delete session.payload;await this.ctx.storage.put('session',session);
    await this.ctx.storage.setAlarm(session.uploads.length?dailyAlarm(session.expiresAt):Date.now()+DAY);
    return json(200,this.status(session));
  }catch(error){return fail(error);}finally{if(request.body&&!request.bodyUsed)await request.body.cancel().catch(()=>{});}}
  status(s){return {success:true,id:'BL-'+s.id,state:s.state,uploaded:s.uploads.map((v,i)=>v?i:null).filter(v=>v!==null),expiresAt:s.expiresAt};}
  alarm(){const task=this.tail.then(()=>this.clean());this.tail=task.catch(()=>{});return task;}
  async clean(){
    const s=await this.ctx.storage.get('session');if(!s)return;
    const keepUntilExpiry=['accepted','sending','uncertain'].includes(s.state)&&s.uploads.length;
    const due=keepUntilExpiry?Date.parse(s.expiresAt):Date.parse(s.createdAt)+DAY;
    if(keepUntilExpiry&&Date.now()<due){await this.ctx.storage.setAlarm(dailyAlarm(s.expiresAt));return;}
    try{
      // A timeout during upload can have left an object before we saved its URL.
      const count=s.payload?.files.length??s.uploads.length;
      for(let i=0;i<count;i++){const publicId=s.uploads[i]?.publicId||(s.payload?`bondar-labs/enquiries/${s.id}/${i}.${s.payload.files[i].ext}`:null);if(publicId)await destroy(publicId,this.env);}
      await this.ctx.storage.deleteAll();
    }catch{await this.ctx.storage.setAlarm(Date.now()+DAY);console.error('Bondar Labs retention cleanup will retry.');}
  }
}
export default {async fetch(request,env){
  const origin=request.headers.get('Origin')||'';
  if(!ORIGINS.includes(origin))return new Response('Forbidden',{status:403});
  const cors={'Access-Control-Allow-Origin':origin,'Vary':'Origin','Cache-Control':'no-store'};
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...cors,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Max-Age':'600'}});
  let response;
  try{
    if(request.method!=='POST')throw new FormError(405,'Please use the website form.');
    if(!/^\/session\/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}\/(prepare|submit|status|file\/[0-2])$/.test(new URL(request.url).pathname))throw new FormError(404,'Not found.');
    for(const key of ['TURNSTILE_SECRET_KEY','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET','SESSIONS'])if(!env[key])throw new FormError(503,'The enquiry service is not ready. Please contact us by email or WhatsApp.');
    for(const key of ['FORMSPARK_CONTACT_FORM_ID','FORMSPARK_QUOTE_FORM_ID'])if(!/^[a-zA-Z0-9_-]+$/.test(env[key]||env.FORMSPARK_FORM_ID||''))throw new FormError(503,'The enquiry service is not ready.');
    const id=new URL(request.url).pathname.split('/')[2];response=await env.SESSIONS.get(env.SESSIONS.idFromName(id)).fetch(request);
  }catch(error){response=fail(error);}
  const headers=new Headers(response.headers);for(const [k,v]of Object.entries(cors))headers.set(k,v);
  return new Response(response.body,{status:response.status,headers});
}};
