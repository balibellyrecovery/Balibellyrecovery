
/* Bali Belly Recovery package finder */
(function(){
 const root=document.getElementById('bbr-package-finder');
 if(!root)return;
 const section=document.getElementById('packages');
 let articles=[...section.querySelectorAll('article.bbr-package')];
 let categories=[...section.querySelectorAll('.bbr-category')];
 const imageSlots=[...section.querySelectorAll('.bbr-image-slot,.bbr-tablet-slot')];
 const choices=[...root.querySelectorAll('[data-vitamin]')];
 const checks=[...root.querySelectorAll('[data-extra]')];
 const placeholder=root.querySelector('.bbr-finder-placeholder');
 const count=root.querySelector('.bbr-finder-result-count');
 const reset=root.querySelector('.bbr-finder-reset');
 let selected='bcomplex';
 let defaultEssentialOnly=true;
 articles.forEach((card)=>{
   const title=card.querySelector('h4')?.textContent.trim()||'Package';
   // Keep all package inclusions visible; no expand/collapse control.
   const cols=card.querySelector('.bbr-package-columns');
   if(cols) cols.hidden=false;
   card.querySelector('.bbr-package-detail-toggle')?.remove();
   card.dataset.packageTitle=title;
 });
 function refreshArticles(){articles=[...section.querySelectorAll('article.bbr-package')];categories=[...section.querySelectorAll('.bbr-category')];articles.forEach(card=>{const cols=card.querySelector('.bbr-package-columns');if(cols)cols.hidden=false;card.querySelector('.bbr-package-detail-toggle')?.remove();card.dataset.packageTitle=card.querySelector('h4')?.textContent.trim()||'Package';});}
 function apply(){
   refreshArticles();
   const extras=checks.filter(x=>x.checked).map(x=>x.value);
   let visible=0;
   articles.forEach(card=>{
     const text=card.textContent.toLowerCase();
     const vitamin=card.querySelector('.bbr-package-kicker')?.textContent.toLowerCase().includes('multivitamin')?'multi':'bcomplex';
     const has={
       hydration:/additional electrolyte solution\s*\(total\s*1,000 ml\)/.test(text),
       paracetamol:/fever reducer\s*\(antipyretic\)/.test(text),
       oral:/oral medication components/.test(text)
     };
     const matchesVitamin=!!selected && vitamin===selected;
     // Exact component matching: do not recommend a package containing
     // optional components the patient did not select.
     const matchesExtras=
       has.hydration===extras.includes('hydration') &&
       has.paracetamol===extras.includes('paracetamol') &&
       has.oral===extras.includes('oral');
     const active=card.dataset.packageActive!=='false';
     const match=active && (defaultEssentialOnly ? card===articles.find(x=>x.dataset.packageActive!=='false') : (matchesVitamin && matchesExtras));
     card.hidden=!match;
     card.classList.remove('bbr-package-recommended');
     card.querySelector('.bbr-recommendation-label')?.remove();
     if(match)visible++;
   });
   categories.forEach(cat=>{
     const isMulti=cat.textContent.toLowerCase().includes('multivitamin');
     cat.hidden=!selected || (selected==='multi')!==isMulti || visible===0;
   });
   imageSlots.forEach((slot,i)=>{
     const hasImage=!!slot.querySelector('img, picture, video');
     const belongsToSelection=selected==='multi' ? i===2 : i!==2;
     slot.hidden=!hasImage || !selected || !belongsToSelection;
   });
   placeholder.hidden=!!selected;
   count.hidden=!selected;reset.hidden=!selected;
   if(selected){
     if(!extras.length)count.textContent=visible+' packages available';
     else if(visible)count.textContent=visible+' package'+(visible===1?'':'s')+' matching your exact selection';
     else count.textContent='No package matches this exact combination. Please change an optional selection or ask our doctor for guidance.';
   }
 }
 choices.forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.vitamin===selected)));
 choices.forEach(btn=>btn.addEventListener('click',()=>{
   defaultEssentialOnly=false;
   selected=btn.dataset.vitamin;
   choices.forEach(c=>c.setAttribute('aria-pressed',String(c===btn)));
   apply();
   root.querySelector('.bbr-finder-results').scrollIntoView({behavior:'smooth',block:'nearest'});
 }));
 checks.forEach(c=>c.addEventListener('change',()=>{defaultEssentialOnly=false;apply()}));
 apply();
 document.addEventListener('bbr:packages-updated',apply);
 reset.addEventListener('click',()=>{
   defaultEssentialOnly=true;
   selected='bcomplex';
   choices.forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.vitamin==='bcomplex')));
   checks.forEach(c=>c.checked=false);
   apply();
 });
})();
