/* Bali Belly Recovery package finder
 * Aturan:
 * 1. Saat website dibuka, hanya paket "Essential Recovery" (package-01) yang tampil.
 * 2. Setiap kombinasi filter (vitamin + hydration + fever reducer + oral medication)
 *    merekomendasikan TEPAT 1 paket.
 */
(function(){
 const root=document.getElementById('bbr-package-finder');
 if(!root)return;
 const section=document.getElementById('packages');
 if(!section)return;
 const DEFAULT_ID='package-01';            // Essential Recovery
 const choices=[...root.querySelectorAll('[data-vitamin]')];
 const checks=[...root.querySelectorAll('[data-extra]')];
 const placeholder=root.querySelector('.bbr-finder-placeholder');
 const count=root.querySelector('.bbr-finder-result-count');
 const reset=root.querySelector('.bbr-finder-reset');
 let articles=[],categories=[];
 let selected='bcomplex';
 let filtered=false;                        // false = tampilan awal (Essential Recovery)

 function profile(card){
   const text=card.textContent.toLowerCase();
   const kicker=(card.querySelector('.bbr-package-kicker')?.textContent||'').toLowerCase();
   return {
     vitamin:kicker.includes('multivitamin')?'multi':'bcomplex',
     hydration:/additional electrolyte solution\s*\(total\s*1,000 ml\)/.test(text),
     paracetamol:/fever reducer\s*\(antipyretic\)/.test(text),
     oral:/oral medication components/.test(text)
   };
 }
 function refresh(){
   articles=[...section.querySelectorAll('article.bbr-package')];
   categories=[...section.querySelectorAll('.bbr-category')];
   articles.forEach(card=>{
     const cols=card.querySelector('.bbr-package-columns');if(cols)cols.hidden=false;
     card.querySelector('.bbr-package-detail-toggle')?.remove();
     card.dataset.packageTitle=card.querySelector('h4')?.textContent.trim()||'Package';
   });
 }
 const isActive=c=>c.dataset.packageActive!=='false';

 // Pilih tepat satu paket untuk pilihan pasien.
 function pickOne(want){
   const pool=articles.filter(isActive);
   if(!pool.length)return {card:null,exact:false};
   const scored=pool.map((card,i)=>{
     const p=profile(card);
     let diff=0;
     if(p.vitamin!==want.vitamin)diff+=100;           // vitamin harus diprioritaskan
     if(p.hydration!==want.hydration)diff+=1;
     if(p.paracetamol!==want.paracetamol)diff+=1;
     if(p.oral!==want.oral)diff+=1;
     return {card,diff,i};
   }).sort((a,b)=>a.diff-b.diff||a.i-b.i);
   return {card:scored[0].card,exact:scored[0].diff===0};
 }

 function apply(){
   refresh();
   const extras=checks.filter(x=>x.checked).map(x=>x.value);
   let target,exact=true;
   if(!filtered){
     target=articles.find(c=>c.dataset.packageId===DEFAULT_ID&&isActive(c))||articles.find(isActive)||null;
   }else{
     const r=pickOne({
       vitamin:selected,
       hydration:extras.includes('hydration'),
       paracetamol:extras.includes('paracetamol'),
       oral:extras.includes('oral')
     });
     target=r.card;exact=r.exact;
   }
   articles.forEach(card=>{
     const match=card===target;
     card.hidden=!match;
     card.classList.remove('bbr-package-recommended');
     card.querySelector('.bbr-recommendation-label')?.remove();
     if(match&&filtered){
       card.classList.add('bbr-package-recommended');
       const top=card.querySelector('.bbr-package-kicker');
       if(top){
         const tag=document.createElement('div');
         tag.className='bbr-recommendation-label';
         tag.textContent='RECOMMENDED FOR YOUR SELECTION';
         tag.style.cssText='display:inline-block;margin:0 0 8px;padding:4px 9px;border-radius:7px;background:#133E3D;color:#fff;font-size:10px;font-weight:800;letter-spacing:.08em';
         top.parentNode.insertBefore(tag,top);
       }
     }
   });
   const targetVitamin=target?profile(target).vitamin:'bcomplex';
   categories.forEach(cat=>{
     const isMulti=cat.textContent.toLowerCase().includes('multivitamin');
     cat.hidden=!target||(targetVitamin==='multi')!==isMulti;
   });
   // Tampilkan tombol pilihan sesuai kondisi
   choices.forEach(btn=>btn.setAttribute('aria-pressed',String(filtered&&btn.dataset.vitamin===selected)));
   if(placeholder)placeholder.hidden=filtered;
   if(count){
     count.hidden=!filtered;
     if(filtered){
       count.textContent=target
         ?(exact?'1 package recommended for your selection':'1 closest package shown (no exact match available)')
         :'No package is available right now. Please ask our doctor for guidance.';
     }
   }
   if(reset)reset.hidden=!filtered;
   section.classList.add('bbr-finder-ready');
 }

 choices.forEach(btn=>btn.addEventListener('click',()=>{
   filtered=true;
   selected=btn.dataset.vitamin;
   apply();
   root.querySelector('.bbr-finder-results')?.scrollIntoView({behavior:'smooth',block:'nearest'});
 }));
 checks.forEach(c=>c.addEventListener('change',()=>{filtered=true;apply();}));
 if(reset)reset.addEventListener('click',()=>{
   filtered=false;selected='bcomplex';
   checks.forEach(c=>c.checked=false);
   apply();
 });
 document.addEventListener('bbr:packages-updated',apply);
 apply();
})();
