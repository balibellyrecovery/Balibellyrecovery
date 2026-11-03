/* Bali Belly Recovery — central package catalogue + promotion synchronization. */
(async function () {
  'use strict';
  const API='https://api.balibellyrecovery.com/api/public/homepage';
  const CATALOG=location.pathname.includes('/blog/')?'../content/packages.json':'content/packages.json';
  const SETTINGS=CATALOG.replace('packages.json','site-settings.json');
  const FALLBACK='Bali Belly Doctor & Nurse Home Visit Service';
  const money=n=>'Rp '+Math.round(Number(n)||0).toLocaleString('id-ID');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function day(value,end){if(!value)return null;const a=String(value).split('-').map(Number);if(a.length!==3||a.some(n=>!Number.isFinite(n)))return null;return new Date(a[0],a[1]-1,a[2],end?23:0,end?59:0,end?59:0);}
  function activePromo(p){if(!p||p.enabled!==true)return false;const d=Number(p.discount);if(!Number.isFinite(d)||d<=0||d>90)return false;const now=new Date(),start=day(p.start,false),end=day(p.end,true);return(!start||now>=start)&&(!end||now<=end);}
  function setList(ul,items){
    if(!ul)return;
    ul.replaceChildren(...(items||[]).map(value=>{const li=document.createElement('li');li.textContent=value;return li;}));
  }
  function setSubsection(panel,title,items){
    let sub=[...panel.querySelectorAll('.bbr-subsection')].find(x=>x.querySelector('.bbr-subtitle')?.textContent.trim().toLowerCase()===title.toLowerCase());
    if(!items?.length){sub?.remove();return;}
    if(!sub){sub=document.createElement('div');sub.className='bbr-subsection';const h=document.createElement('div');h.className='bbr-subtitle';h.textContent=title;const ul=document.createElement('ul');ul.className='bbr-list bbr-component-list';sub.append(h,ul);panel.append(sub);}
    setList(sub.querySelector('ul'),items);
  }
  /* Gambar paket mengikuti vitamin: 1 paket = 1 gambar (B-Complex atau Multivitamin), diatur dari Admin > Media / Gambar. */
  let vitaminImages={};
  function vitaminKey(p){
    if(p&&(p.vitaminType==='bcomplex'||p.vitaminType==='multivitamin'))return p.vitaminType;
    const text=((p&&p.category)||'')+' '+((p&&p.name)||'');
    return /multivitamin/i.test(text)?'multivitamin':'bcomplex';
  }
  function setVitaminImages(imgs){
    if(!imgs||typeof imgs!=='object')return;
    const pick=(a,b)=>(a&&a.url)?a:((b&&b.url)?b:null);
    vitaminImages={bcomplex:pick(imgs.bcomplex,imgs.essential),multivitamin:pick(imgs.multivitamin,imgs.complete)};
  }
  function packageImage(p){
    if(p.image)return{url:p.image,alt:p.imageAlt||p.name};
    const v=vitaminImages[vitaminKey(p)];
    return v&&v.url?{url:v.url,alt:v.alt||p.name}:null;
  }
  function updateCard(card,p){
    card.dataset.packageId=p.id;card.dataset.packageActive=String(p.active!==false);
    const kicker=card.querySelector('.bbr-package-kicker');if(kicker)kicker.textContent=p.category||'Bali Belly Package';
    const title=card.querySelector('h4');if(title)title.textContent=p.name||'Bali Belly Package';
    const desc=card.querySelector('.bbr-package-sub');if(desc)desc.textContent=p.description||'Doctor and nurse home visit with package components, following a doctor’s assessment.';
    let packageImg=card.querySelector('.bbr-admin-package-image');
    const pic=packageImage(p);
    if(pic){
      if(!packageImg){packageImg=document.createElement('img');packageImg.className='bbr-admin-package-image';const top=card.querySelector('.bbr-package-top');if(top)card.insertBefore(packageImg,top);}
      if(packageImg.getAttribute('src')!==pic.url)packageImg.src=pic.url;
      packageImg.alt=pic.alt||p.name||'Bali Belly Recovery package';packageImg.loading='lazy';
    }else packageImg?.remove();
    const price=card.querySelector('.bbr-new');if(price){price.dataset.basePrice=String(p.basePrice||0);price.textContent=money(p.basePrice);}
    const panels=card.querySelectorAll('.bbr-package-columns .bbr-panel');
    if(panels[0]){
      let ul=panels[0].querySelector(':scope > ul');if(!ul){ul=document.createElement('ul');ul.className='bbr-list bbr-component-list';panels[0].append(ul);}
      setList(ul,p.composition||[]);
      setSubsection(panels[0],'Vitamin Boosters',p.vitaminBoosters||[]);
      setSubsection(panels[0],'Additional Components',p.additionalComponents||[]);
    }
    if(panels[1])setList(panels[1].querySelector('ul'),p.serviceIncludes||[]);
    const bookingLink=card.querySelector('.bbr-book');
    if(bookingLink)bookingLink.href='appointment.html?package='+encodeURIComponent(p.id);
    card.hidden=p.active===false;
  }
  function makeCard(p){
    const card=document.createElement('article');card.className='bbr-package';card.dataset.packageId=p.id;card.dataset.packageActive=String(p.active!==false);
    card.innerHTML=`<div class="bbr-package-top"><div><div class="bbr-package-kicker"></div><h4></h4><p class="bbr-package-sub"></p></div><div class="bbr-price"><div class="bbr-new" data-base-price=""></div><span class="bbr-promo" hidden>PROMO PRICE</span></div></div><div class="bbr-package-columns"><div class="bbr-panel"><div class="bbr-panel-title">Package Composition</div><ul class="bbr-list bbr-component-list"></ul></div><div class="bbr-panel"><div class="bbr-panel-title">Service Includes</div><ul class="bbr-list"></ul><a class="bbr-book" href="appointment.html?package=${encodeURIComponent(p.id)}">BOOK THIS PACKAGE →</a></div></div>`;
    updateCard(card,p);return card;
  }
  function applyPackages(items){
    if(!Array.isArray(items))return;
    const section=document.querySelector('.bbr-packages#packages')||document.querySelector('#packages');
    if(!section)return;
    const map=new Map(items.map(p=>[p.id,p]));
    const existing=[...section.querySelectorAll('.bbr-package[data-package-id]')];
    existing.forEach(card=>{const p=map.get(card.dataset.packageId);if(p)updateCard(card,p);else{card.dataset.packageActive='false';card.hidden=true;}});
    const present=new Set(existing.map(c=>c.dataset.packageId));
    const missing=items.filter(p=>!present.has(p.id));
    missing.forEach(p=>section.appendChild(makeCard(p)));
    document.dispatchEvent(new CustomEvent('bbr:packages-updated',{detail:{packages:items}}));
  }
  function applyPromo(p){
    const active=activePromo(p),discount=active?Number(p.discount):0,code=active?String(p.code||'').trim():'',name=active?String(p.name||'Special Offer').trim():'';
    document.querySelectorAll('.bbr-package').forEach(card=>{
      const price=card.querySelector('.bbr-new');if(!price)return;
      const base=Number(price.dataset.basePrice||0);if(!base)return;
      let old=card.querySelector('.bbr-old-price');if(!old){old=document.createElement('span');old.className='bbr-old-price';price.parentNode.insertBefore(old,price);}
      const badge=card.querySelector('.bbr-promo');
      if(active){old.textContent=money(base);old.hidden=false;price.textContent=money(base*(1-discount/100));if(badge){badge.hidden=false;badge.textContent='PROMO PRICE · '+discount+'% OFF';}}
      else{old.hidden=true;price.textContent=money(base);if(badge)badge.hidden=true;}
    });
    document.querySelectorAll('.bbr-promo-banner').forEach(el=>{el.textContent=active?name+': '+discount+'% off Bali Belly packages'+(code?' with code '+code:''):FALLBACK;el.dataset.promoActive=String(active);});
    document.querySelectorAll('.bbr-hero-promo-label').forEach(el=>{el.textContent=active?discount+'% package discount':'';el.hidden=!active;});
    document.querySelectorAll('.bbr-promo-note').forEach(el=>{el.innerHTML=active?'<strong>'+esc(name)+':</strong> '+discount+'% off'+(code?' · Use code <strong>'+esc(code)+'</strong>':'')+'. '+esc(p.note||'Offer applies to the package prices displayed on this page.'):'<strong>Package pricing:</strong> Prices shown are the standard package prices. Any additional items will be discussed before being provided.';});
    document.documentElement.dataset.bbrPromoActive=String(active);document.documentElement.dataset.bbrPromoCode=code;document.documentElement.dataset.bbrPromoDiscount=String(discount);
    return{active,discount,code,name};
  }
  async function json(url,live){const r=await fetch(url,{headers:{Accept:'application/json'},cache:live?'no-store':'no-cache'});if(!r.ok)throw Error('Request failed: '+url);return r.json();}
  function fillAppointment(items,promo){
    const form=document.getElementById('appt'),select=form&&form.elements&&form.elements.pkg;if(!select||!Array.isArray(items))return;
    const urlPackage=new URLSearchParams(location.search).get('package');
    const legacy={'essential-recovery':'package-01','recovery-plus':'package-03','complete-recovery':'package-07','bali-belly':'package-01'};
    const active=items.filter(item=>item.active!==false).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));
    const makeOption=item=>{const amount=promo.active?item.basePrice*(1-promo.discount/100):item.basePrice;const option=document.createElement('option');option.value=item.id;option.textContent=item.name+' — '+money(amount)+(promo.active?' ('+promo.discount+'% off'+(promo.code?', code '+promo.code:'')+')':'');option.dataset.packageName=item.name;option.dataset.currentPrice=String(Math.round(amount));return option;};
    const chosen=urlPackage?active.find(item=>item.id===(legacy[urlPackage]||urlPackage)):null;
    let note=document.getElementById('bbr-selected-package-note');
    if(chosen){
      /* Patient arrived from "BOOK THIS PACKAGE": show only the chosen package, no re-selection needed. */
      select.replaceChildren(makeOption(chosen));
      select.value=chosen.id;
      select.dataset.lockedPackage='true';
      /* Long package names do not fit inside a <select> on phones: show a wrapped card and keep the select hidden (it still submits the value). */
      select.style.display='none';
      let card=document.getElementById('bbr-selected-package-card');
      if(!card){card=document.createElement('div');card.id='bbr-selected-package-card';card.style.cssText='margin-top:6px;padding:14px 16px;border:1px solid #133E3D;border-radius:12px;background:#EAF0EC;color:#133E3D;line-height:1.4';select.parentNode.insertBefore(card,select.nextSibling);}
      const label=select.options[0].textContent.split(' — ');
      card.innerHTML='';
      const nm=document.createElement('strong');nm.style.cssText='display:block;font-size:16px;font-weight:700';nm.textContent=chosen.name;card.appendChild(nm);
      const pr=document.createElement('span');pr.style.cssText='display:block;margin-top:2px;font-size:14px;font-weight:400;color:#334B43';pr.textContent=label.slice(1).join(' — ');card.appendChild(pr);
      if(!note){note=document.createElement('small');note.id='bbr-selected-package-note';note.style.cssText='display:block;margin-top:6px;font-size:12px;line-height:1.5;color:#52615c;font-weight:400';select.parentNode.appendChild(note);}
      note.innerHTML='Package selected from our package list. <a href="packages.html" style="text-decoration:underline;font-weight:700;color:#133E3D">Change package</a>';
      return;
    }
    /* Direct visit (no package chosen): show the full list. */
    if(note)note.remove();
    select.dataset.lockedPackage='';select.style.display='';document.getElementById('bbr-selected-package-card')?.remove();
    const frag=document.createDocumentFragment(),blank=document.createElement('option');blank.value='';blank.textContent='Select a recovery package';frag.appendChild(blank);
    active.forEach(item=>frag.appendChild(makeOption(item)));
    const unsure=document.createElement('option');unsure.value='not-sure';unsure.textContent="I'm not sure — please advise";frag.appendChild(unsure);
    const keep=select.value;select.replaceChildren(frag);
    if([...select.options].some(o=>o.value===keep))select.value=keep;
  }
  try{
    /* Ketiga permintaan dimulai bersamaan (sebelumnya berurutan = 3x menunggu jaringan). */
    const settingsReq=json(SETTINGS).catch(e=>{console.warn('[Bali Belly Recovery] site-settings unavailable:',e);return null;});
    const catalogueReq=json(CATALOG);
    const apiReq=json(API,true);apiReq.catch(()=>{});
    const st=await settingsReq;if(st)setVitaminImages(st.homepageImages);
    let catalogue=await catalogueReq;
    let packages=Array.isArray(catalogue.packages)?catalogue.packages:[];
    /* Promo dari site-settings.json langsung dipakai, jadi harga benar sejak tampilan pertama (API hanya menyegarkan). */
    applyPackages(packages);                       /* kartu dulu (menulis harga dasar)... */
    let promo=applyPromo((st&&st.promo)||{});      /* ...baru promo (harga coret + harga diskon) */
    fillAppointment(packages,promo);
    const form=document.getElementById('appt');
    if(form&&!form.dataset.bbrSubmitSync){form.dataset.bbrSubmitSync='1';form.addEventListener('submit',function(){const sel=form.elements.pkg,option=sel&&sel.selectedOptions&&sel.selectedOptions[0];if(option&&option.dataset.packageName){const code=document.documentElement.dataset.bbrPromoCode||'',discount=Number(document.documentElement.dataset.bbrPromoDiscount||0);option.value=option.dataset.packageName+' — '+money(option.dataset.currentPrice)+(discount?' | Promo: '+discount+'%'+(code?' | Code: '+code:''):' | No active promotion');}},true);}
    try{
      const data=await apiReq;
      if(data.homepageImages)setVitaminImages(data.homepageImages);
      if(Array.isArray(data.packages)&&data.packages.length)packages=data.packages;
      applyPackages(packages);
      promo=applyPromo(data.promo||{});
      fillAppointment(packages,promo);
    }catch(apiError){
      console.warn('[Bali Belly Recovery] CMS package/promo API unavailable; local catalogue is shown:',apiError);
    }
  }catch(e){console.warn('[Bali Belly Recovery] Package catalogue unavailable:',e);}
})();
