/* Bali Belly Recovery CMS API. No OpenAI integration or AI API key is used. */
const ORIGIN='https://balibellyrecovery.com';
/* Shared site chrome for generated blog pages — keep identical to the static pages (top bar + footer + shared CSS). */
const SITE_TOPBAR=`<div class="bbr-promo-banner">Bali Belly Doctor &amp; Nurse Home Visit Service</div><header class="bbr-site-header"><a class="bbr-brand" href="../index.html"><span>Bali Belly</span><span>Recovery</span></a><nav aria-label="Main" class="bbr-main-nav"><a class="nav" href="../index.html">Home</a><a class="nav" href="../packages.html">Packages</a><a class="nav" href="../doctor-home-visit.html">Doctor Home Visit</a><a class="nav" href="../covered-areas.html">Covered Areas</a><a aria-current="page" class="nav on" href="../blog/">Blog</a><a class="nav" href="../about.html">About</a></nav><a class="btn bbr-header-booking" href="../appointment.html">Book an Appointment</a></header>`;
const SITE_FOOTER=`<footer style="background:#fff;border-top:1px solid #E6E1D5"><div style="max-width:1200px;margin:0 auto;padding:40px 32px;box-sizing:border-box;display:flex;flex-direction:column;gap:20px;font-size:14px;color:#55606a"><div style="font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:20px;color:#133E3D">Recover • Rehydrate • Revive</div><div><b style="color:#111418">Bali Belly treatment across Bali</b> · <a href="../bali-belly-near-me.html" style="text-decoration:underline">Bali Belly near me</a> · <a href="../appointment.html" style="text-decoration:underline">Book an appointment</a></div><div style="display:flex;flex-wrap:wrap;gap:8px 20px;line-height:1.8"><a href="../bali-belly-treatment-canggu.html" style="text-decoration:underline">Canggu</a><a href="../bali-belly-treatment-kerobokan-umalas.html" style="text-decoration:underline">Kerobokan &amp; Umalas</a><a href="../bali-belly-treatment-seminyak.html" style="text-decoration:underline">Seminyak</a><a href="../bali-belly-treatment-legian.html" style="text-decoration:underline">Legian</a><a href="../bali-belly-treatment-kuta.html" style="text-decoration:underline">Kuta</a><a href="../bali-belly-treatment-uluwatu-pecatu.html" style="text-decoration:underline">Uluwatu &amp; Pecatu</a><a href="../bali-belly-treatment-jimbaran.html" style="text-decoration:underline">Jimbaran</a><a href="../bali-belly-treatment-nusa-dua-benoa.html" style="text-decoration:underline">Nusa Dua &amp; Benoa</a><a href="../bali-belly-treatment-sanur.html" style="text-decoration:underline">Sanur</a><a href="../bali-belly-treatment-denpasar.html" style="text-decoration:underline">Denpasar</a><a href="../bali-belly-treatment-ubud.html" style="text-decoration:underline">Ubud</a><a href="../bali-belly-treatment-tabanan.html" style="text-decoration:underline">Tabanan</a><a href="../bali-belly-treatment-kedungu-tanah-lot.html" style="text-decoration:underline">Kedungu &amp; Tanah Lot</a><a href="../covered-areas.html" style="text-decoration:underline;font-weight:700">All covered areas</a></div>
<nav aria-label="Footer" class="bbr-footer-links"><a href="../packages.html">Packages</a><a href="../doctor-home-visit.html">Doctor Home Visit</a><a href="../treatment.html">Treatment</a><a href="../symptoms.html">Symptoms</a><a href="../covered-areas.html">Covered Areas</a><a href="../blog/">Blog</a><a href="../about.html">About</a><a href="../privacy.html">Privacy</a><a href="../terms.html">Terms</a></nav>
<div aria-label="Accepted payment methods" class="bbr-accepted-payment" style="border-top:1px solid #D9E0DF;padding-top:24px;margin-top:8px">
<div style="font-size:12px;font-weight:700;letter-spacing:.14em;color:#133E3D;margin-bottom:14px">ACCEPTED PAYMENT</div>
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
<span aria-label="Wise" style="width:68px;height:42px;border:1px solid #E4E9E8;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;background:#fff;color:#9ACD32;font-weight:800;font-size:14px;letter-spacing:-.04em">wise</span>
<span aria-label="Mastercard" style="width:68px;height:42px;border:1px solid #E4E9E8;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;background:#fff">
<svg aria-label="Mastercard" height="22" role="img" viewbox="0 0 34 22" width="34"><circle cx="13" cy="11" fill="#EB001B" r="9"></circle><circle cx="21" cy="11" fill="#F79E1B" r="9"></circle><path d="M17 4.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13" fill="#FF5F00"></path></svg>
</span>
<span aria-label="Visa" style="width:68px;height:42px;border:1px solid #E4E9E8;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;background:#fff;color:#1434A4;font-size:15px;font-weight:800;font-style:italic">VISA</span>
</div>
</div>
<div aria-label="Contact and social links" class="bbr-footer-contact">
<a href="https://wa.me/6282221614966">WhatsApp +62 822 2161 4966</a>
<span aria-hidden="true" class="bbr-footer-separator">·</span>
<a href="mailto:dripwellbali@gmail.com">dripwellbali@gmail.com</a>
<span aria-hidden="true" class="bbr-footer-separator">·</span>
<a href="https://instagram.com/dripwellbali" rel="noopener noreferrer" target="_blank">Instagram</a>
</div>
<div class="bbr-footer-bottom">
<span>© 2026 DRIPWELL BALI</span>
<span class="bbr-footer-domain">Bali Belly Recovery <span aria-hidden="true">·</span> balibellyrecovery.com</span>
<span class="bbr-footer-credit">By <a href="https://www.dripwellbali.com/" rel="noopener noreferrer" target="_blank">DripWell Bali</a></span>
</div></div></footer>`;
const SITE_HEAD=`<meta name="theme-color" content="#133E3D"><link as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="preload" onload="this.onload=null;this.rel='stylesheet'"/><noscript><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&display=swap" rel="stylesheet"/></noscript><link rel="stylesheet" href="../assets/css/site-consistency.css">`;
const SITE_SCRIPT=`<script src="../assets/js/promo-sync.js" defer></script>`;
const cors={'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Credentials':'true','Vary':'Origin'};
const enc=new TextEncoder();
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8',...cors,'Cache-Control':'no-store'}})}

function b64u(s){return s.replace(/-/g,'+').replace(/_/g,'/').padEnd(Math.ceil(s.length/4)*4,'=')}
function toB64Url(bytes){let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}
function fromB64Url(s){return Uint8Array.from(atob(b64u(s)),c=>c.charCodeAt(0))}
function cookieValue(req,name){const raw=req.headers.get('Cookie')||'';for(const part of raw.split(';')){const i=part.indexOf('=');if(i>0&&part.slice(0,i).trim()===name)return part.slice(i+1).trim()}return ''}
function cookieHeader(value,maxAge){return `bbr_admin_session=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
function safeEqual(a,b){a=String(a||'');b=String(b||'');let diff=a.length^b.length;const n=Math.max(a.length,b.length);for(let i=0;i<n;i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0}
async function hmacKey(env){if(!env.SESSION_SECRET||env.SESSION_SECRET.length<32)throw new Error('SESSION_SECRET belum dikonfigurasi dengan minimal 32 karakter.');return crypto.subtle.importKey('raw',enc.encode(env.SESSION_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
async function makeSession(env){const payload={sub:'admin',exp:Math.floor(Date.now()/1000)+86400,nonce:toB64Url(crypto.getRandomValues(new Uint8Array(16)))};const data=toB64Url(enc.encode(JSON.stringify(payload)));const key=await hmacKey(env);const sig=await crypto.subtle.sign('HMAC',key,enc.encode(data));return data+'.'+toB64Url(new Uint8Array(sig))}
async function verifySession(req,env){const token=cookieValue(req,'bbr_admin_session');if(!token)throw new Error('Sesi admin tidak ditemukan. Silakan login kembali.');const parts=token.split('.');if(parts.length!==2)throw new Error('Sesi admin tidak valid.');const key=await hmacKey(env);const valid=await crypto.subtle.verify('HMAC',key,fromB64Url(parts[1]),enc.encode(parts[0]));if(!valid)throw new Error('Sesi admin tidak valid.');let p;try{p=JSON.parse(new TextDecoder().decode(fromB64Url(parts[0])))}catch{throw new Error('Sesi admin tidak valid.')}if(p.sub!=='admin'||!p.exp||p.exp*1000<Date.now())throw new Error('Sesi admin sudah kedaluwarsa.');}
function requireSameOrigin(req){const origin=req.headers.get('Origin');if(origin!==ORIGIN)throw new Error('Permintaan ditolak: origin tidak diizinkan.');}
async function login(req,env){
 requireSameOrigin(req);
 if(env.LOGIN_LIMITER){const ip=req.headers.get('CF-Connecting-IP')||'unknown';const result=await env.LOGIN_LIMITER.limit({key:ip});if(!result.success)return json({error:'Terlalu banyak percobaan login. Coba lagi dalam satu menit.'},429);}
 if(!env.ADMIN_EMAIL||!env.ADMIN_PASSWORD)throw new Error('ADMIN_EMAIL dan ADMIN_PASSWORD belum dikonfigurasi sebagai Secret.');
 const body=await req.json();const email=String(body.email||'').trim().toLowerCase();const password=String(body.password||'');
 if(!safeEqual(email,env.ADMIN_EMAIL.trim().toLowerCase())||!safeEqual(password,env.ADMIN_PASSWORD))return json({error:'Email atau password tidak sesuai.'},401);
 const token=await makeSession(env);
 return new Response(JSON.stringify({ok:true}),{status:200,headers:{'Content-Type':'application/json; charset=utf-8',...cors,'Cache-Control':'no-store','Set-Cookie':cookieHeader(token,86400)}});
}
function b64urlBytes(bytes){let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')}
function pemBytes(pem) {
  const normalized = String(pem || '').replace(/\\n/g, '\n').replace(/\r/g, '');

  // GitHub App keys may be PKCS#8 or traditional PKCS#1 RSA PEM.
  const pkcs8Match = normalized.match(/-----BEGIN PRIVATE KEY-----([\s\S]*?)-----END PRIVATE KEY-----/);
  const pkcs1Match = normalized.match(/-----BEGIN RSA PRIVATE KEY-----([\s\S]*?)-----END RSA PRIVATE KEY-----/);
  const match = pkcs8Match || pkcs1Match;
  if (!match) {
    throw new Error('GH_APP_PRIVATE_KEY harus berupa PRIVATE KEY atau RSA PRIVATE KEY PEM.');
  }

  const base64 = match[1].replace(/\s/g, '');
  if (!base64 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.length % 4 === 1) {
    throw new Error('Isi GH_APP_PRIVATE_KEY bukan Base64 PEM yang valid.');
  }

  let raw;
  try {
    const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
    raw = Uint8Array.from(binary, c => c.charCodeAt(0));
  } catch {
    throw new Error('GH_APP_PRIVATE_KEY gagal didekode. Periksa Secret PEM di Cloudflare.');
  }

  // Web Crypto importKey('pkcs8') requires PKCS#8. Wrap PKCS#1 RSA DER if needed.
  if (pkcs8Match) return raw;

  function derLength(length) {
    if (length < 128) return [length];
    const bytes = [];
    while (length > 0) {
      bytes.unshift(length & 255);
      length = Math.floor(length / 256);
    }
    return [0x80 | bytes.length, ...bytes];
  }
  function concat(parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) {
      out.set(part, offset);
      offset += part.length;
    }
    return out;
  }

  const algorithmIdentifier = new Uint8Array([
    0x30, 0x0d, 0x06, 0x09,
    0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01,
    0x05, 0x00
  ]);
  const privateKeyOctetString = concat([
    new Uint8Array([0x04]),
    new Uint8Array(derLength(raw.length)),
    raw
  ]);
  const body = concat([
    new Uint8Array([0x02, 0x01, 0x00]),
    algorithmIdentifier,
    privateKeyOctetString
  ]);
  return concat([
    new Uint8Array([0x30]),
    new Uint8Array(derLength(body.length)),
    body
  ]);
}
async function githubToken(env){const now=Math.floor(Date.now()/1000),head=b64urlBytes(enc.encode(JSON.stringify({alg:'RS256',typ:'JWT'}))),body=b64urlBytes(enc.encode(JSON.stringify({iat:now-30,exp:now+540,iss:env.GH_APP_ID}))),unsigned=head+'.'+body;const key=await crypto.subtle.importKey('pkcs8',pemBytes(env.GH_APP_PRIVATE_KEY),{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['sign']);const sig=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',key,enc.encode(unsigned));const jwt=unsigned+'.'+b64urlBytes(new Uint8Array(sig));const r=await fetch(`https://api.github.com/app/installations/${env.GH_INSTALLATION_ID}/access_tokens`,{method:'POST',headers:{Authorization:`Bearer ${jwt}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'BaliBellyRecovery-CMS'},body:'{}'});if(!r.ok)throw new Error('GitHub App token gagal dibuat: '+await r.text());return(await r.json()).token}
async function gh(env,path,method='GET',body){const token=await githubToken(env);const r=await fetch(`https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/${path}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'BaliBellyRecovery-CMS','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});if(!r.ok)throw new Error(`GitHub API ${r.status}: ${await r.text()}`);return r.status===204?null:r.json()}
async function readText(env, path) {
  const f = await gh(env, path);
  if (!f || typeof f.content !== 'string') {
    throw new Error(`Konten GitHub tidak tersedia atau terlalu besar: ${path}`);
  }
  if (f.encoding && f.encoding !== 'base64') {
    throw new Error(`Encoding GitHub tidak didukung untuk ${path}: ${f.encoding}`);
  }
  const base64 = f.content.replace(/\s/g, '');
  if (!base64 || base64.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
    throw new Error(`Data Base64 GitHub tidak valid untuk file: ${path}`);
  }
  let binary;
  try {
    binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
  } catch {
    throw new Error(`Gagal membaca Base64 GitHub untuk file: ${path}`);
  }
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}
async function putText(env,path,content,message){let sha;try{sha=(await gh(env,path)).sha}catch(e){if(!String(e).includes('404'))throw e}const encoded=btoa(unescape(encodeURIComponent(content)));return gh(env,path,'PUT',{message,content:encoded,branch:env.GH_BRANCH||'main',...(sha?{sha}:{})})}
async function putBase64(env,path,content,message){let sha;try{sha=(await gh(env,path)).sha}catch(e){if(!String(e).includes('404'))throw e}return gh(env,path,'PUT',{message,content,branch:env.GH_BRANCH||'main',...(sha?{sha}:{})})}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function md(src){let s=esc(src||'');s=s.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/^[-*] (.+)$/gm,'<li>$1</li>').replace(/(?:<li>.*<\/li>\n?)+/gs,m=>'<ul>'+m+'</ul>').replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>');return s.split(/\n\s*\n/).map(x=>/^<(h[1-6]|ul|ol|blockquote)/.test(x)?x:'<p>'+x.replace(/\n/g,'<br>')+'</p>').join('\n')}
function articleHtml(a){const url=`${ORIGIN}/blog/${a.slug}.html`,date=(a.publishedAt||new Date().toISOString()).slice(0,10);return `<!doctype html><html lang="${a.language==='id'?'id':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(a.seoTitle||a.title)}</title><meta name="description" content="${esc(a.metaDescription||a.excerpt)}"><link rel="canonical" href="${url}"><meta name="robots" content="index,follow,max-image-preview:large"><meta property="og:type" content="article"><meta property="og:title" content="${esc(a.title)}"><meta property="og:description" content="${esc(a.excerpt)}"><meta property="og:url" content="${url}">${a.image?`<meta property="og:image" content="${esc(a.image)}">`:''}<style>body{margin:0;background:#f5f6f2;color:#20312e;font:17px/1.8 Arial,sans-serif}.wrap{max-width:850px;margin:auto;padding:35px 20px}article{background:white;border:1px solid #e2e8e3;border-radius:16px;padding:clamp(22px,5vw,48px)}h1,h2,h3{font-family:Georgia,serif;line-height:1.2}h1{font-size:clamp(32px,5vw,46px)}h2{margin-top:1.7em}a{color:#176b5a}.hero{width:100%;height:auto;border-radius:12px}.cta{display:inline-block;background:#174b45;color:white;padding:12px 20px;border-radius:25px;text-decoration:none;font-weight:bold}small{color:#71807b}</style>${SITE_HEAD}</head><body>${SITE_TOPBAR}<main class="wrap"><article><small>${esc(a.category||'Bali Belly Guide')} · ${date}</small><h1>${esc(a.title)}</h1><p>${esc(a.excerpt)}</p>${a.image?`<img class="hero" src="${esc(a.image)}" alt="${esc(a.imageAlt)}">`:''}<div>${md(a.content)}</div><p><small>By ${esc(a.author||'Bali Belly Recovery')}${a.reviewer?` · Reviewed by ${esc(a.reviewer)}`:''}</small></p><p><a class="cta" href="${ORIGIN}/appointment.html">Request a doctor visit</a></p></article></main>${SITE_FOOTER}<script type="application/ld+json">${JSON.stringify([{'@context':'https://schema.org','@type':'Article','headline':a.title,'description':a.metaDescription||a.excerpt,'image':a.image?[a.image]:undefined,'author':{'@type':'Organization','name':a.author||'Bali Belly Recovery'},'publisher':{'@id':ORIGIN+'/#business'},'reviewedBy':(a.medicalReviewed&&a.reviewer)?{'@type':'Physician','name':a.reviewer}:undefined,'datePublished':date,'dateModified':(a.updatedAt||new Date().toISOString()).slice(0,10),'mainEntityOfPage':url},{'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':ORIGIN+'/'},{'@type':'ListItem','position':2,'name':'Blog','item':ORIGIN+'/blog/'},{'@type':'ListItem','position':3,'name':a.title,'item':url}]}])}</script>${SITE_SCRIPT}</body></html>`}
async function listArticles(env){try{return JSON.parse(await readText(env,'content/blog/index.json'))}catch(e){if(String(e).includes('404'))return[];throw e}}
async function updateBlog(env,articles){const published=articles.filter(a=>a.status==='published').sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));const featured=published[0];const cards=published.map(a=>`<article class="card">${a.image?`<img src="${esc(a.image)}" alt="${esc(a.imageAlt)}">`:`<div class="card-art">Bali Belly Recovery</div>`}<div class="card-copy"><span class="category">${esc(a.category||'Bali Belly Guide')}</span><h3><a href="${esc(a.slug)}.html">${esc(a.title)}</a></h3><p>${esc(a.excerpt)}</p><a class="read" href="${esc(a.slug)}.html">Read article →</a></div></article>`).join('');const hero=featured?`<section class="featured">${featured.image?`<img class="featured-img" src="${esc(featured.image)}" alt="${esc(featured.imageAlt)}">`:`<div class="featured-art">Bali Belly Recovery Journal</div>`}<div class="featured-copy"><span class="category">FEATURED · ${esc(featured.category||'Bali Belly Guide')}</span><h2>${esc(featured.title)}</h2><p>${esc(featured.excerpt)}</p><a class="read" href="${esc(featured.slug)}.html">Read featured article →</a></div></section>`:`<section class="featured"><div class="featured-art">Bali Belly Recovery Journal</div><div class="featured-copy"><span class="category">FEATURED GUIDE</span><h2>Bali Belly in Bali: Symptoms, Causes and When to Seek Medical Care</h2><p>Learn about common symptoms, possible causes, supportive care and warning signs that mean you should seek medical assessment.</p><span class="read">New articles coming soon</span></div></section>`;const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bali Belly Recovery Journal | Medical Guides & Travel Advice</title><meta name="description" content="Medically reviewed Bali Belly guides, symptoms, treatment and recovery advice, and practical travel tips for visitors to Bali."><link rel="canonical" href="${ORIGIN}/blog/"><meta name="robots" content="index,follow,max-image-preview:large"><link as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="preload" onload="this.onload=null;this.rel='stylesheet'"/><noscript><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet"/></noscript><style>:root{--green:#133e3d;--ink:#202b29;--muted:#68736e;--paper:#f8f6f0;--line:#e7e1d5;--gold:#b58a4a}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.65 'DM Sans',Arial,sans-serif}a{color:inherit;text-decoration:none}.wrap{max-width:1200px;margin:auto;padding:52px 32px 85px}.eyebrow,.category{color:var(--gold);font-size:10px;letter-spacing:1.5px;font-weight:800;text-transform:uppercase}.intro{max-width:730px;margin-bottom:30px}.intro h1{font:600 clamp(38px,5vw,56px)/1.08 'Playfair Display',Georgia;margin:12px 0}.intro p,.featured p,.card p{color:var(--muted)}.featured{display:grid;grid-template-columns:1fr 1fr;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;margin:30px 0 48px}.featured-art{min-height:300px;background:linear-gradient(140deg,#173f3a,#718b79);display:grid;place-items:center;color:#f7edda;font:italic 28px Georgia;text-align:center;padding:25px}.featured-img{width:100%;height:100%;min-height:300px;object-fit:cover}.featured-copy{padding:38px;display:flex;flex-direction:column;justify-content:center}.featured h2{font:600 34px/1.15 'Playfair Display',Georgia;margin:12px 0}.section-title{font:600 29px 'Playfair Display',Georgia}.categories{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:40px}.chip{border:1px solid #dcd5c8;border-radius:30px;padding:8px 14px;background:#fff;font-size:12px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{background:#fff;border:1px solid var(--line);border-radius:15px;overflow:hidden}.card img,.card-art{width:100%;aspect-ratio:16/9;object-fit:cover}.card-art{display:grid;place-items:center;background:linear-gradient(135deg,#d9dfd4,#8da497);color:#31524a}.card-copy{padding:20px}.card h3{font:600 22px/1.2 'Playfair Display',Georgia;margin:10px 0}.read{font-size:13px;color:var(--green);font-weight:800}@media(max-width:800px){.featured{grid-template-columns:1fr}.featured-art,.featured-img{min-height:220px}.grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.grid{grid-template-columns:1fr}}</style>${SITE_HEAD}</head><body>${SITE_TOPBAR}<main class="wrap"><section class="intro"><span class="eyebrow">BALI BELLY RECOVERY JOURNAL</span><h1>Understand Bali Belly.<br>Travel with confidence.</h1><p>Medical guidance, practical travel advice and recovery information for visitors to Bali.</p></section>${hero}<section><h2 class="section-title">Explore our guides</h2><div class="categories"><span class="chip">Bali Belly Basics</span><span class="chip">Symptoms &amp; Causes</span><span class="chip">Treatment &amp; Recovery</span><span class="chip">Prevention &amp; Travel Tips</span><span class="chip">Medical Care in Bali</span></div></section><section><h2 class="section-title">Latest articles</h2><div class="grid">${cards||'<p>No articles published yet. Please check back soon.</p>'}</div></section></main>${SITE_FOOTER}<script type="application/ld+json">${JSON.stringify([{'@context':'https://schema.org','@type':'Blog','@id':ORIGIN+'/blog/#blog','name':'Bali Belly Recovery Journal','url':ORIGIN+'/blog/','description':'Bali Belly guides, symptoms, treatment and recovery advice, and practical travel tips for visitors to Bali.','publisher':{'@id':ORIGIN+'/#business'},'inLanguage':'en','blogPost':published.map(a=>({'@type':'BlogPosting','headline':a.title,'url':ORIGIN+'/blog/'+a.slug+'.html','datePublished':(a.publishedAt||'').slice(0,10)||undefined,'dateModified':(a.updatedAt||'').slice(0,10)||undefined}))},{'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':ORIGIN+'/'},{'@type':'ListItem','position':2,'name':'Blog','item':ORIGIN+'/blog/'}]}])}</script>${SITE_SCRIPT}</body></html>`;await putText(env,'blog/index.html',html,'Update Bali Belly Recovery editorial blog listing')}
async function updateSitemap(env,articles){let xml=await readText(env,'sitemap.xml');const closing=xml.match(/<\/((?:[A-Za-z0-9_-]+:)?)urlset>/);if(!closing)throw new Error('sitemap.xml tidak valid: tag penutup urlset tidak ditemukan.');const pf=closing[1],today=new Date().toISOString().slice(0,10);let changed=false;for(const a of articles.filter(x=>x.status==='published')){const loc=`${ORIGIN}/blog/${a.slug}.html`;if(xml.includes(`>${loc}<`))continue;xml=xml.replace(closing[0],()=>`  <${pf}url><${pf}loc>${loc}</${pf}loc><${pf}lastmod>${today}</${pf}lastmod></${pf}url>\n</${pf}urlset>`);changed=true}if(changed)await putText(env,'sitemap.xml',xml,'Update sitemap for blog articles')}
async function saveArticle(env,a){if(!a.title||!a.slug||!a.content)throw new Error('Judul, slug dan isi artikel wajib diisi.');if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug))throw new Error('Format URL slug tidak valid.');if(a.status==='published'&&/(medical|treatment|symptom|medicine|medication|IV therapy|bali belly)/i.test(a.title+' '+a.content)&&(!a.medicalReviewed||!a.reviewer))throw new Error('Konten medis memerlukan nama reviewer dan persetujuan pemeriksaan.');const all=await listArticles(env),old=all.find(x=>x.slug===a.originalSlug)||all.find(x=>x.slug===a.slug);const item={...a,updatedAt:new Date().toISOString(),publishedAt:a.status==='published'?(old?.publishedAt||new Date().toISOString()):old?.publishedAt};const next=[...all.filter(x=>x.slug!==a.slug&&x.slug!==a.originalSlug),item];await putText(env,`content/blog/${a.slug}.json`,JSON.stringify(item,null,2),'Save blog article '+a.slug);await putText(env,'content/blog/index.json',JSON.stringify(next,null,2),'Update blog content index');if(a.status==='published'){await putText(env,`blog/${a.slug}.html`,articleHtml(item),'Publish blog article '+a.slug)}await updateBlog(env,next);await updateSitemap(env,next);return{ok:true,slug:a.slug,status:a.status,url:`${ORIGIN}/blog/${a.slug}.html`}}
async function readSettings(env){try{return JSON.parse(await readText(env,'content/site-settings.json'))}catch(e){if(String(e).includes('404'))return{};throw e}}

async function saveHomepageImages(env,payload){
 // hero = dipasang ke index.html lewat penanda; bcomplex & multivitamin = disimpan di site-settings.json
 // lalu dipasang otomatis ke setiap kartu paket oleh assets/js/promo-sync.js (1 paket = 1 gambar sesuai vitamin).
 const slots=['hero','bcomplex','multivitamin'];
 const incoming=payload.homepageImages||{};
 const settings=await readSettings(env);
 const saved={...(settings.homepageImages||{})};
 // Slot lama (essential/tablet/complete) digantikan; pindahkan nilainya bila slot baru belum terisi.
 if(!saved.bcomplex&&saved.essential)saved.bcomplex=saved.essential;
 if(!saved.multivitamin&&saved.complete)saved.multivitamin=saved.complete;
 delete saved.essential;delete saved.tablet;delete saved.complete;
 let html=await readText(env,'index.html');
 const heroMarker='<!-- BBR_HERO_IMAGE -->';
 const base=ORIGIN+'/assets/uploads/';
 for(const slot of slots){
  const item=incoming[slot]||saved[slot]||{};
  const url=String(item.url||'').trim();
  const alt=String(item.alt||'').trim().slice(0,180);
  if(url && !(url.startsWith(base) && /^[a-z0-9-]+\.(jpg|jpeg|png|webp|gif)$/i.test(url.slice(base.length))))throw new Error('URL gambar '+slot+' tidak valid. Gunakan gambar yang diunggah melalui Media Library.');
  saved[slot]={url,alt};
  if(slot!=='hero')continue;
  if(!html.includes(heroMarker)){
   if(!url) continue;
   throw new Error('Penanda slot gambar hero tidak ditemukan di index.html.');
  }
  // Hapus gambar hero hasil CMS sebelumnya agar tidak menumpuk.
  html=html.replace(new RegExp('<img class="bbr-home-image"[^>]*>\\s*(?='+heroMarker+')'),'');
  const markup=url?`<img class="bbr-home-image" src="${esc(url)}" alt="${esc(alt||'Bali Belly Recovery medical care in Bali')}" loading="eager" fetchpriority="high" decoding="async">\n`:'';
  html=html.replace(heroMarker,markup+heroMarker);
 }
 await putText(env,'index.html',html,'Update homepage hero image from CMS');
 await putText(env,'content/site-settings.json',JSON.stringify({...settings,homepageImages:saved},null,2),'Save homepage and package vitamin images');
 return{ok:true,homepageImages:saved,note:'Images saved. Package images follow the vitamin type automatically. Wait for GitHub Pages deployment.'};
}


async function readPackages(env){
 try{
  const data=JSON.parse(await readText(env,'content/packages.json'));
  return Array.isArray(data.packages)?data.packages:[];
 }catch(e){if(String(e).includes('404'))return[];throw e}
}
function cleanPackage(p,index){
 const lines=(v,max=30)=>Array.isArray(v)?v.map(x=>String(x||'').trim().slice(0,240)).filter(Boolean).slice(0,max):[];
 const id=String(p.id||'').trim();
 if(!/^package-[a-z0-9-]{2,40}$/.test(id))throw new Error('ID paket tidak valid.');
 const name=String(p.name||'').trim().slice(0,100);
 const category=String(p.category||'').trim().slice(0,100);
 const basePrice=Math.round(Number(p.basePrice));
 if(!name||!category||!Number.isFinite(basePrice)||basePrice<1||basePrice>100000000)throw new Error('Nama, kategori, dan harga normal paket wajib valid.');
 return {
  id,name,category,basePrice,
  description:String(p.description||'').trim().slice(0,500),
  composition:lines(p.composition),
  vitaminBoosters:lines(p.vitaminBoosters),
  additionalComponents:lines(p.additionalComponents),
  serviceIncludes:lines(p.serviceIncludes),
  image:(()=>{const u=String(p.image||'').trim();if(u&&!u.startsWith(ORIGIN+'/assets/uploads/'))throw new Error('Gambar paket harus diunggah melalui Media Library.');return u.slice(0,500)})(),
  imageAlt:String(p.imageAlt||'').trim().slice(0,180),
  vitaminType:['bcomplex','multivitamin'].includes(p.vitaminType)?p.vitaminType:'',
  active:p.active!==false,
  sortOrder:Math.max(1,Math.round(Number(p.sortOrder)||index+1))
 };
}
async function savePackages(env,payload){
 if(!Array.isArray(payload.packages)||payload.packages.length<1||payload.packages.length>40)throw new Error('Katalog harus berisi 1 sampai 40 paket.');
 const packages=payload.packages.map(cleanPackage);
 const ids=new Set(),names=new Set();
 for(const p of packages){
  if(ids.has(p.id))throw new Error('ID paket duplikat: '+p.id);ids.add(p.id);
  const key=p.name.toLowerCase();if(names.has(key))throw new Error('Nama paket tidak boleh duplikat: '+p.name);names.add(key);
 }
 packages.sort((a,b)=>a.sortOrder-b.sortOrder);
 const output={source:'admin-managed-canonical-catalogue',count:packages.length,updatedAt:new Date().toISOString(),packages};
 await putText(env,'content/packages.json',JSON.stringify(output,null,2),'Manage Bali Belly package catalogue');
 return{ok:true,count:packages.length,packages,note:'Package catalogue saved to GitHub. Public pages will sync package details and prices from this catalogue.'};
}

async function publicHomepageData(env){const settings=await readSettings(env);const all=await listArticles(env);const packages=await readPackages(env);return{promo:settings.promo||{},packages:packages.filter(p=>p.active!==false).sort((a,b)=>a.sortOrder-b.sortOrder),homepageImages:settings.homepageImages||{},gallery:settings.gallery||[],articles:all.filter(a=>a.status==='published').sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||'')).slice(0,12)};}
async function saveHomepageGallery(env,payload){
 const gallery=Array.isArray(payload.gallery)?payload.gallery.slice(0,8):[];
 const clean=gallery.map(x=>{const url=String(x.url||'').trim(),caption=String(x.caption||'').trim().slice(0,180),alt=String(x.alt||'').trim().slice(0,180);if(!url.startsWith(ORIGIN+'/assets/uploads/'))throw new Error('URL foto galeri tidak valid. Unggah melalui Media Library.');return{url,caption,alt};});
 let html=await readText(env,'index.html');const start='<!-- BBR_TREATMENT_GALLERY_START -->',end='<!-- BBR_TREATMENT_GALLERY_END -->';const i=html.indexOf(start),j=html.indexOf(end,i+start.length);if(i<0||j<0)throw new Error('Penanda galeri tidak ditemukan di homepage.');
 const cards=clean.map(x=>`<figure class="bbr-treatment-gallery-item"><img src="${esc(x.url)}" alt="${esc(x.alt||x.caption||'Bali Belly Recovery care in Bali')}" loading="lazy"><figcaption>${esc(x.caption)}</figcaption></figure>`).join('');
 const empty=clean.length?'':'<!-- BBR_TREATMENT_GALLERY_EMPTY -->';html=html.slice(0,i+start.length)+'\n  '+empty+cards+'\n  '+html.slice(j);
 await putText(env,'index.html',html,'Update homepage treatment gallery from CMS');const settings=await readSettings(env);await putText(env,'content/site-settings.json',JSON.stringify({...settings,gallery:clean},null,2),'Save homepage treatment gallery');return{ok:true,count:clean.length,note:'Gallery saved. Wait for GitHub Pages deployment.'};
}

async function handler(req,env){
 const u=new URL(req.url);
 if(req.method==='OPTIONS'){
  const origin=req.headers.get('Origin');
  if(origin!==ORIGIN)return new Response(null,{status:403});
  return new Response(null,{headers:cors});
 }
 if(req.method==='GET'&&u.pathname==='/api/health')return json({ok:true,service:'Bali Belly Recovery CMS'});
 if(req.method==='GET'&&u.pathname==='/api/public/homepage')return json(await publicHomepageData(env));
 if(req.method==='POST'&&u.pathname==='/api/auth/login')return login(req,env);
 if(req.method==='POST'&&u.pathname==='/api/auth/logout'){
  requireSameOrigin(req);
  return new Response(JSON.stringify({ok:true}),{status:200,headers:{'Content-Type':'application/json; charset=utf-8',...cors,'Cache-Control':'no-store','Set-Cookie':cookieHeader('',0)}});
 }
 if(req.method==='GET'&&u.pathname==='/api/auth/session'){
  try{await verifySession(req,env);return json({ok:true})}catch(e){return json({ok:false,error:e.message},401)}
 }
 requireSameOrigin(req);
 await verifySession(req,env);
 if(req.method==='GET'&&u.pathname==='/api/articles')return json({articles:await listArticles(env)});
 if(req.method==='GET'&&u.pathname==='/api/packages')return json({packages:await readPackages(env)});
 if(req.method==='POST'&&u.pathname==='/api/packages/save'){const payload=await req.json();return json(await savePackages(env,payload));}
 if(req.method==='GET'&&u.pathname==='/api/settings')return json({settings:await readSettings(env)});
 if(req.method==='POST'&&u.pathname==='/api/settings/save'){const s=await req.json();await putText(env,'content/site-settings.json',JSON.stringify(s,null,2),'Update CMS-managed site settings');return json({ok:true,settings:s,note:'Settings saved to repository. Public page components must read this JSON to reflect changes.'})}
 if(req.method==='POST'&&u.pathname==='/api/homepage/images/save'){const payload=await req.json();return json(await saveHomepageImages(env,payload))}
 if(req.method==='POST'&&u.pathname==='/api/homepage/gallery/save'){const payload=await req.json();return json(await saveHomepageGallery(env,payload))}
 if(req.method==='POST'&&u.pathname==='/api/articles/save'){const a=await req.json();return json(await saveArticle(env,a))}
 if(req.method==='POST'&&u.pathname==='/api/media/upload'){const b=await req.json();if(!b.name||!b.data||!/^image\/(jpeg|png|webp|gif)$/.test(b.mime||''))return json({error:'Data gambar atau tipe file tidak valid.'},400);if(b.data.length>5_600_000)return json({error:'File terlalu besar. Maksimum sekitar 4 MB.'},413);if(!/^[a-z0-9][a-z0-9-]*\.(jpg|jpeg|png|webp|gif)$/.test(b.name))return json({error:'Nama file tidak valid.'},400);const path='assets/uploads/'+b.name;await putBase64(env,path,b.data,'Upload CMS image '+b.name);return json({ok:true,path,url:`${ORIGIN}/${path}`})}
 return json({error:'Endpoint tidak ditemukan.'},404);
}
export default{async fetch(req,env){try{return await handler(req,env)}catch(e){const msg=e?.message||'Internal server error';return json({error:msg},/Sesi admin|origin tidak diizinkan/i.test(msg)?401:500)}}};
