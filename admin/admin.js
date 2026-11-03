const $=id=>document.getElementById(id);let articles=[];let settings={};const APIKEY='bbrCmsApi';const DEFAULT_API='https://api.balibellyrecovery.com';
function api(){return(localStorage.getItem(APIKEY)||$('api-url')?.value||DEFAULT_API).replace(/\/$/,'')}
function note(s,error=false){const n=$('notice');n.hidden=false;n.textContent=s;n.className='notice'+(error?' error':'');window.scrollTo({top:0,behavior:'smooth'})}
function show(v){document.querySelectorAll('.view').forEach(x=>x.classList.toggle('active',x.id==='view-'+v));document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x.dataset.view===v));$('page-title').textContent=({dashboard:'Dashboard',packages:'Manajemen Paket',articles:'Artikel Blog',editor:'Tulis Artikel',media:'Media / Gambar',promotions:'Pengaturan Promo',settings:'Pengaturan'})[v]||v}
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>show(b.dataset.view));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{if(b.dataset.go==='editor')clearEditor();show(b.dataset.go)});
function slugify(s){return(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function markdown(s){let x=esc(s);x=x.replace(/^### (.*)$/gm,'<h3>$1</h3>').replace(/^## (.*)$/gm,'<h2>$1</h2>').replace(/^# (.*)$/gm,'<h1>$1</h1>').replace(/\*\*(.*?)\*\*/g,'<b>$1</b>').replace(/^[-*] (.*)$/gm,'• $1').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');return '<p>'+x+'</p>'}
function preview(){const title=$('title').value||'Preview artikel';const cat=$('category').value||'Bali Belly Guide';const img=$('image').value.trim();$('preview').innerHTML=(img?'<img class="preview-image" src="'+esc(img)+'" alt="'+esc($('imageAlt').value)+'">':'<div class="preview-cover">Bali Belly Recovery Journal</div>')+'<div class="preview-body"><span class="preview-category">'+esc(cat.toUpperCase())+' · 6 MIN READ</span><h2>'+esc(title)+'</h2><p class="preview-excerpt">'+esc($('excerpt').value)+'</p><div class="preview-content">'+markdown($('content').value)+'</div></div>';const ip=$('image-preview');if(ip)ip.innerHTML=img?'<img src="'+esc(img)+'" alt="">':'Belum ada gambar dipilih'}
function clearEditor(){['original-slug','title','slug','excerpt','content','seoTitle','keyword','meta','category','reviewer','image','imageAlt'].forEach(id=>$(id).value='');$('language').value='en';$('author').value='Bali Belly Recovery';$('medical').checked=false;$('editor-title').textContent='Tulis Artikel Baru';preview()}
function editArticle(slug){const a=articles.find(x=>x.slug===slug);if(!a)return;show('editor');$('editor-title').textContent='Edit Artikel';$('original-slug').value=a.slug||'';$('title').value=a.title||'';$('slug').value=a.slug||'';$('excerpt').value=a.excerpt||'';$('content').value=a.content||'';$('seoTitle').value=a.seoTitle||'';$('keyword').value=a.focusKeyword||'';$('meta').value=a.metaDescription||'';$('category').value=a.category||'';$('language').value=a.language||'en';$('author').value=a.author||'';$('reviewer').value=a.reviewer||'';$('image').value=a.image||'';$('imageAlt').value=a.imageAlt||'';$('medical').checked=!!a.medicalReviewed;preview()}
$('title').addEventListener('input',()=>{if(!$('slug').dataset.edited)$('slug').value=slugify($('title').value);if(!$('seoTitle').value)$('seoTitle').value=$('title').value;preview()});$('slug').addEventListener('input',()=>$('slug').dataset.edited='1');['content','excerpt','image','imageAlt','category'].forEach(id=>$(id).addEventListener('input',preview));
function data(status){return{title:$('title').value.trim(),slug:slugify($('slug').value||$('title').value),excerpt:$('excerpt').value.trim(),content:$('content').value,seoTitle:$('seoTitle').value.trim()||$('title').value.trim(),focusKeyword:$('keyword').value.trim(),metaDescription:$('meta').value.trim(),category:$('category').value.trim(),language:$('language').value,author:$('author').value.trim(),reviewer:$('reviewer').value.trim(),image:$('image').value.trim(),imageAlt:$('imageAlt').value.trim(),medicalReviewed:$('medical').checked,status,originalSlug:$('original-slug').value}}
async function request(path,opts={}){if(!api())throw Error('Masukkan URL Worker API di Pengaturan.');const r=await fetch(api()+path,{...opts,credentials:'include',headers:{'Content-Type':'application/json',...(opts.headers||{})}});let d={};try{d=await r.json()}catch{}if(!r.ok)throw Error(d.error||'Permintaan gagal ('+r.status+')');return d}
async function save(status){const a=data(status);if(!a.title||!a.content||!a.slug)return note('Judul, URL slug, dan isi artikel wajib diisi.',true);if(status==='published'&&/bali belly|medical|treatment|symptom|medicine|medication|doctor|IV/i.test(a.title+' '+a.content)&&(!a.medicalReviewed||!a.reviewer))return note('Konten medis wajib memiliki nama reviewer dan persetujuan pemeriksaan sebelum diterbitkan.',true);try{await request('/api/articles/save',{method:'POST',body:JSON.stringify(a)});note(status==='published'?'Artikel diterbitkan. Tunggu deployment GitHub Pages selesai.':'Draft artikel berhasil disimpan.');await loadArticles()}catch(e){note(e.message,true)}}
$('save-draft').onclick=()=>save('draft');$('publish').onclick=()=>save('published');
async function loadArticles(){try{const d=await request('/api/articles');articles=d.articles||[];$('total').textContent=articles.length;$('published').textContent=articles.filter(a=>a.status==='published').length;$('drafts').textContent=articles.filter(a=>a.status==='draft').length;const html=articles.sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||'')).map(a=>`<div class="rowitem"><div><b>${esc(a.title)}</b><small>${esc(a.slug)} · ${esc((a.status||'draft').toUpperCase())}</small></div><button class="secondary" data-edit="${esc(a.slug)}">Edit</button></div>`).join('')||'<p class="muted">Belum ada artikel.</p>';$('article-list').innerHTML=html;$('recent').innerHTML=html;document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>editArticle(b.dataset.edit))}catch(e){$('recent').textContent=e.message;$('article-list').textContent=e.message}}
$('save-settings').onclick=()=>{const v=$('api-url').value.trim();if(!/^https:\/\//.test(v))return note('Masukkan URL HTTPS Worker API yang benar.',true);localStorage.setItem(APIKEY,v);note('URL koneksi disimpan di browser.');loadArticles()};$('test-connection').onclick=async()=>{try{await request('/api/health');note('Koneksi CMS berhasil.')}catch(e){note(e.message,true)}};
$('upload-media').onclick=async()=>{const f=$('media-file').files[0];if(!f)return note('Pilih gambar terlebih dahulu.',true);if(f.size>4*1024*1024)return note('Ukuran gambar maksimal 4 MB.',true);if(!/^image\/(jpeg|png|webp|gif)$/.test(f.type))return note('Format gambar tidak didukung.',true);const name=slugify(($('media-name').value||f.name).replace(/\.[^.]+$/,''))+'.'+(f.name.split('.').pop()||'jpg').toLowerCase();const btn=$('upload-media');btn.disabled=true;try{const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(f)});const d=await request('/api/media/upload',{method:'POST',body:JSON.stringify({name,mime:f.type,data:b64})});$('upload-result').innerHTML=`<p>Berhasil: <a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.url)}</a></p><button class="secondary" id="copy-image">Salin URL gambar</button>`;$('image').value=d.url;$('copy-image').onclick=()=>navigator.clipboard.writeText(d.url);note('Gambar berhasil diunggah ke repository.')}catch(e){note(e.message,true)}finally{btn.disabled=false}};

async function uploadHomeImage(slot){
 const file=document.querySelector(`[data-home-upload="${slot}"]`).files[0];
 if(!file)return note('Pilih gambar untuk posisi '+slot+' terlebih dahulu.',true);
 if(file.size>4*1024*1024)return note('Ukuran gambar maksimal 4 MB.',true);
 if(!/^image\/(jpeg|png|webp|gif)$/.test(file.type))return note('Format gambar tidak didukung.',true);
 const ext=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'})[file.type];
 const name=slugify(slot+'-'+file.name.replace(/\.[^.]+$/,''))+'-'+Date.now()+'.'+ext;
 const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(file)});
 const d=await request('/api/media/upload',{method:'POST',body:JSON.stringify({name,mime:file.type,data:b64})});
 document.querySelector(`[data-home-url="${slot}"]`).value=d.url;
 const preview=document.querySelector(`[data-home-preview="${slot}"]`);
 preview.innerHTML='<img src="'+esc(d.url)+'" alt="">';
 note('Gambar '+slot+' berhasil diunggah. Klik Simpan Gambar Homepage untuk menerapkannya.');
}
document.querySelectorAll('[data-home-upload]').forEach(input=>input.addEventListener('change',async()=>{try{await uploadHomeImage(input.dataset.homeUpload)}catch(e){note(e.message,true)}}));
document.querySelectorAll('[data-home-clear]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.homeClear;document.querySelector(`[data-home-url="${k}"]`).value='';document.querySelector(`[data-home-upload="${k}"]`).value='';document.querySelector(`[data-home-preview="${k}"]`).textContent='Gambar akan dihapus dari homepage setelah disimpan.'});
$('save-homepage-images').onclick=async()=>{
 const homepageImages={};
 ['hero','bcomplex','multivitamin'].forEach(k=>{homepageImages[k]={url:document.querySelector(`[data-home-url="${k}"]`).value.trim(),alt:document.querySelector(`[data-home-alt="${k}"]`).value.trim()}});
 const btn=$('save-homepage-images');btn.disabled=true;
 try{const d=await request('/api/homepage/images/save',{method:'POST',body:JSON.stringify({homepageImages})});settings.homepageImages=homepageImages;note('Gambar homepage berhasil disimpan ke GitHub. Tunggu deployment GitHub Pages selesai.')}
 catch(e){note(e.message,true)}finally{btn.disabled=false}
};
async function getSettings(){try{settings=(await request('/api/settings')).settings||{};const imgs=settings.homepageImages||{};['hero','bcomplex','multivitamin'].forEach(k=>{const legacy={bcomplex:imgs.essential,multivitamin:imgs.complete};const v=imgs[k]||legacy[k]||{};const url=document.querySelector(`[data-home-url="${k}"]`);const alt=document.querySelector(`[data-home-alt="${k}"]`);const prev=document.querySelector(`[data-home-preview="${k}"]`);if(url)url.value=v.url||'';if(alt)alt.value=v.alt||'';if(prev)prev.innerHTML=v.url?'<img src="'+esc(v.url)+'" alt="">':'Belum ada gambar'});const p=settings.promo||{};$('promo-enabled').checked=!!p.enabled;$('promo-name').value=p.name||'';$('promo-discount').value=p.discount||'';$('promo-code').value=p.code||'';$('promo-start').value=p.start||'';$('promo-end').value=p.end||'';$('promo-note').value=p.note||'';}catch(e){note('Pengaturan belum dapat dimuat: '+e.message,true)}}
async function saveSettings(){try{await request('/api/settings/save',{method:'POST',body:JSON.stringify(settings)});note('Pengaturan berhasil disimpan ke GitHub.')}catch(e){note(e.message,true)}}
$('save-promo').onclick=()=>{const enabled=$('promo-enabled').checked,discount=Number($('promo-discount').value||0);if(!Number.isFinite(discount)||discount<0||discount>90)return note('Masukkan diskon antara 0 sampai 90%.',true);if(enabled&&discount<=0)return note('Jika promo diaktifkan, diskon harus lebih dari 0%.',true);const start=$('promo-start').value,end=$('promo-end').value;if(start&&end&&end<start)return note('Tanggal berakhir tidak boleh lebih awal dari tanggal mulai.',true);settings.promo={enabled,name:$('promo-name').value.trim(),discount,code:$('promo-code').value.trim(),start,end,note:$('promo-note').value.trim()};saveSettings()};

$('api-url').value=localStorage.getItem(APIKEY)||DEFAULT_API;
async function showLogin(message=''){
 document.body.classList.remove('admin-authenticated');
 $('bbr-login').style.display='flex';
 $('bbr-login-error').textContent=message;
}
async function enterAdmin(){
 document.body.classList.add('admin-authenticated');
 $('bbr-login').style.display='none';
 await loadArticles();
 await loadPackages();
 await getSettings();
}
$('bbr-login-form').addEventListener('submit',async e=>{
 e.preventDefault();
 const btn=$('bbr-login-submit');btn.disabled=true;btn.textContent='Memeriksa...';
 $('bbr-login-error').textContent='';
 try{
  const r=await fetch(api()+'/api/auth/login',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:$('bbr-login-email').value,password:$('bbr-login-password').value})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw Error(d.error||'Login gagal.');
  $('bbr-login-password').value='';
  await enterAdmin();
 }catch(err){$('bbr-login-error').textContent=err.message}
 finally{btn.disabled=false;btn.textContent='Login ke Dashboard'}
});
$('logout-btn').onclick=async()=>{
 try{await fetch(api()+'/api/auth/logout',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'}})}catch{}
 await showLogin('Anda sudah keluar dari dashboard.');
};
(async()=>{
 try{
  const r=await fetch(api()+'/api/auth/session',{credentials:'include',cache:'no-store'});
  if(r.ok)await enterAdmin();else await showLogin();
 }catch(e){await showLogin('API belum dapat dihubungi. Pastikan subdomain API sudah aktif.')}
})();



// Treatment Gallery Manager (maximum 8 images)
let bbrGallery=[];
function renderBbrGallery(){const host=$('bbr-gallery-items');if(!host)return;host.innerHTML=Array.from({length:8},(_,i)=>{const x=bbrGallery[i]||{};return `<div class="home-image-card" data-gallery-card="${i}"><h4>Gallery Image ${i+1}</h4><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-gallery-file="${i}"><label>Caption<input data-gallery-caption="${i}" value="${esc(x.caption||'')}" placeholder="Short photo caption"></label><label>ALT Text<input data-gallery-alt="${i}" value="${esc(x.alt||'')}" placeholder="Describe the photo accurately"></label><input type="hidden" data-gallery-url="${i}" value="${esc(x.url||'')}"><div class="home-image-preview" data-gallery-preview="${i}">${x.url?`<img src="${esc(x.url)}" alt="">`:'No image selected'}</div><button type="button" class="secondary" data-gallery-remove="${i}">Remove photo</button></div>`}).join('');host.querySelectorAll('[data-gallery-file]').forEach(el=>el.addEventListener('change',async()=>{const i=Number(el.dataset.galleryFile),f=el.files[0];if(!f)return;if(f.size>4*1024*1024)return note('Ukuran gambar maksimal 4 MB.',true);if(!/^image\/(jpeg|png|webp|gif)$/.test(f.type))return note('Format gambar tidak didukung.',true);try{const ext=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'})[f.type];const name='gallery-'+Date.now()+'-'+i+'.'+ext;const data=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(f)});const d=await request('/api/media/upload',{method:'POST',body:JSON.stringify({name,mime:f.type,data})});bbrGallery[i]={...(bbrGallery[i]||{}),url:d.url};renderBbrGallery();note('Foto galeri diunggah. Klik Simpan Galeri untuk menampilkannya di homepage.')}catch(e){note(e.message,true)}}));host.querySelectorAll('[data-gallery-remove]').forEach(el=>el.onclick=()=>{bbrGallery[Number(el.dataset.galleryRemove)]={};renderBbrGallery()});}
async function loadBbrGallery(){try{const d=await request('/api/settings');bbrGallery=(d.settings?.gallery||[]).slice(0,8);renderBbrGallery()}catch(e){note('Galeri belum dapat dimuat: '+e.message,true)}}
$('bbr-save-gallery')?.addEventListener('click',async()=>{const items=[];for(let i=0;i<8;i++){const url=document.querySelector(`[data-gallery-url="${i}"]`)?.value.trim()||'';const caption=document.querySelector(`[data-gallery-caption="${i}"]`)?.value.trim()||'';const alt=document.querySelector(`[data-gallery-alt="${i}"]`)?.value.trim()||'';if(url)items.push({url,caption,alt})}try{await request('/api/homepage/gallery/save',{method:'POST',body:JSON.stringify({gallery:items})});bbrGallery=items;note('Treatment Gallery tersimpan. Homepage akan diperbarui setelah GitHub Pages selesai deployment.')}catch(e){note(e.message,true)}});
const bbrOriginalGetSettings=getSettings;
getSettings=async function(){await bbrOriginalGetSettings();await loadBbrGallery()};


// Central package catalogue CRUD — stored in content/packages.json through the CMS Worker.
let packageItems=[];
let editingPackageId='';
const packageFields={
 id:'package-id',name:'package-name',category:'package-category',basePrice:'package-price',
 sortOrder:'package-order',vitaminType:'package-vitamin-type',description:'package-description',image:'package-image',imageAlt:'package-image-alt'
};
function packageLines(id){return $(id).value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean)}
function resetPackageForm(){
 editingPackageId='';
 Object.values(packageFields).forEach(id=>$(id).value='');
 ['package-composition','package-vitamins','package-additional','package-service'].forEach(id=>$(id).value='');
 $('package-active').checked=true;
 $('package-order').value=String(packageItems.length+1);
 $('package-form-title').textContent='Tambah Paket Baru';
 $('package-save').textContent='Simpan Paket';
 document.querySelectorAll('.package-list-item').forEach(x=>x.classList.remove('selected'));
}
function renderPackageList(){
 const host=$('package-list');if(!host)return;
 const sorted=[...packageItems].sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));
 $('package-count').textContent=sorted.length+' paket dalam katalog · '+sorted.filter(p=>p.active!==false).length+' aktif';
 host.innerHTML=sorted.map(p=>`<div class="package-list-item ${p.id===editingPackageId?'selected':''}" data-package-row="${esc(p.id)}"><div class="package-list-main"><strong>${esc(p.name)}</strong><small>${esc(p.category)} · ${money(p.basePrice)}</small><span class="package-status ${p.active===false?'off':''}">${p.active===false?'NONAKTIF':'AKTIF'}</span></div><div class="package-list-actions"><button class="secondary" type="button" data-package-edit="${esc(p.id)}">Edit</button><button class="secondary" type="button" data-package-delete="${esc(p.id)}">Hapus</button></div></div>`).join('')||'<p class="muted">Belum ada paket. Klik Tambah Paket untuk membuat paket pertama.</p>';
 host.querySelectorAll('[data-package-edit]').forEach(b=>b.onclick=()=>editPackage(b.dataset.packageEdit));
 host.querySelectorAll('[data-package-delete]').forEach(b=>b.onclick=()=>deletePackage(b.dataset.packageDelete));
}
function money(n){return 'Rp '+Math.round(Number(n)||0).toLocaleString('id-ID')}
function editPackage(id){
 const p=packageItems.find(x=>x.id===id);if(!p)return;
 editingPackageId=id;
 Object.entries(packageFields).forEach(([key,field])=>$(field).value=p[key]??'');
 $('package-composition').value=(p.composition||[]).join('\n');
 $('package-vitamins').value=(p.vitaminBoosters||[]).join('\n');
 $('package-additional').value=(p.additionalComponents||[]).join('\n');
 $('package-service').value=(p.serviceIncludes||[]).join('\n');
 $('package-active').checked=p.active!==false;
 $('package-form-title').textContent='Edit Paket';
 $('package-save').textContent='Simpan Perubahan';
 renderPackageList();
 $('package-editor-title')?.scrollIntoView({behavior:'smooth',block:'start'});
}
async function loadPackages(){
 try{
  const d=await request('/api/packages');packageItems=Array.isArray(d.packages)?d.packages:[];
  renderPackageList();if(!$('package-id').value)resetPackageForm();
 }catch(e){if($('package-list'))$('package-list').innerHTML='<p class="muted">'+esc(e.message)+'</p>'}
}
function packagePayload(){
 const name=$('package-name').value.trim(),category=$('package-category').value.trim(),basePrice=Number($('package-price').value),sortOrder=Number($('package-order').value||packageItems.length+1);
 if(!name||!category||!Number.isFinite(basePrice)||basePrice<1)return null;
 const id=editingPackageId||('package-'+Date.now().toString(36));
 return{id,name,category,basePrice,sortOrder,description:$('package-description').value.trim(),
  composition:packageLines('package-composition'),vitaminBoosters:packageLines('package-vitamins'),
  additionalComponents:packageLines('package-additional'),serviceIncludes:packageLines('package-service'),
  vitaminType:$('package-vitamin-type').value,image:$('package-image').value.trim(),imageAlt:$('package-image-alt').value.trim(),active:$('package-active').checked};
}
async function savePackage(){
 const p=packagePayload();if(!p)return note('Nama, kategori dan harga normal wajib diisi dengan benar.',true);
 const duplicate=packageItems.find(x=>x.id!==p.id&&x.name.trim().toLowerCase()===p.name.toLowerCase());
 if(duplicate)return note('Nama paket sudah digunakan. Gunakan nama yang berbeda.',true);
 const next=packageItems.filter(x=>x.id!==p.id).concat(p).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));
 const btn=$('package-save');btn.disabled=true;btn.textContent='Menyimpan...';
 try{
  const d=await request('/api/packages/save',{method:'POST',body:JSON.stringify({packages:next})});
  packageItems=d.packages||next;resetPackageForm();renderPackageList();
  note('Katalog paket berhasil disimpan. Perubahan akan tampil di seluruh halaman setelah deployment GitHub Pages selesai.');
 }catch(e){note(e.message,true)}
 finally{btn.disabled=false;btn.textContent=editingPackageId?'Simpan Perubahan':'Simpan Paket'}
}
async function deletePackage(id){
 const p=packageItems.find(x=>x.id===id);if(!p)return;
 if(!window.confirm('Hapus paket "'+p.name+'" dari katalog website? Paket tidak akan muncul pada halaman atau formulir booking.'))return;
 const next=packageItems.filter(x=>x.id!==id);
 try{
  const d=await request('/api/packages/save',{method:'POST',body:JSON.stringify({packages:next})});
  packageItems=d.packages||next;if(editingPackageId===id)resetPackageForm();renderPackageList();
  note('Paket berhasil dihapus dari katalog aktif.');
 }catch(e){note(e.message,true)}
}
$('package-new')?.addEventListener('click',resetPackageForm);
$('package-reset')?.addEventListener('click',resetPackageForm);
$('package-save')?.addEventListener('click',savePackage);
$('package-reload')?.addEventListener('click',loadPackages);
