/* Bali Belly Recovery: paket + filter di bagian ATAS semua halaman.
 * - Halaman yang sudah punya #packages lengkap (index, packages) tidak diubah oleh script ini.
 * - Halaman lain: script membuat bagian #packages di paling atas <main>. Kartu paket dibuat
 *   oleh promo-sync.js dari content/packages.json (harga & promo selalu sama dengan beranda).
 * - Urutan tampilan: kartu paket -> catatan harga -> filter pencarian paket.
 * Script ini HARUS dimuat sebelum promo-sync.js. */
(function(){
  'use strict';
  if(document.getElementById('bbr-package-finder'))return;
  const main=document.getElementById('main')||document.querySelector('main');
  if(!main)return;
  const me=document.currentScript;
  const base=me&&me.src?new URL('../',me.src).href:'/assets/';
  const FINDER="<div aria-labelledby=\"bbr-finder-title\" class=\"bbr-finder\" id=\"bbr-package-finder\">\n<div class=\"bbr-finder-head\">\n<span class=\"bbr-package-kicker\">SIMPLE PACKAGE GUIDE</span>\n<h3 id=\"bbr-finder-title\">Find a package that suits your preferences</h3>\n<p>Start by choosing a vitamin support option. You can narrow the list further by selecting additional components.</p>\n</div>\n<div class=\"bbr-finder-step\">\n<div class=\"bbr-finder-step-title\"><span>1</span><div><strong>Choose vitamin support</strong><small>Essential Recovery is shown by default. Choose a vitamin category to see another recommendation.</small></div></div>\n<div aria-label=\"Vitamin support\" class=\"bbr-finder-options\" role=\"group\">\n<button aria-pressed=\"false\" class=\"bbr-finder-choice\" data-vitamin=\"bcomplex\" type=\"button\"><strong>B-Complex</strong><small>Vitamin B1, B6 and B12</small></button>\n<button aria-pressed=\"false\" class=\"bbr-finder-choice\" data-vitamin=\"multi\" type=\"button\"><strong>Multivitamin</strong><small>9 vitamins: B1, B2, B3, B5, B6, B9, B12, C and Biotin</small></button>\n</div>\n</div>\n<div class=\"bbr-finder-step\">\n<div class=\"bbr-finder-step-title\"><span>2</span><div><strong>Refine by additional components <em>(optional)</em></strong><small>Choose additional components to update the recommended package. The doctor will determine whether each component is appropriate for your condition.</small></div></div>\n<div class=\"bbr-finder-checks\">\n<label class=\"bbr-extra-card\">\n<input data-extra=\"\" type=\"checkbox\" value=\"hydration\"/>\n<span class=\"bbr-extra-copy\"><strong>Hydration support</strong><small>Additional Electrolyte Solution, bringing the total to 1,000 ml.</small></span>\n</label>\n<label class=\"bbr-extra-card\">\n<input data-extra=\"\" type=\"checkbox\" value=\"paracetamol\"/>\n<span class=\"bbr-extra-copy\"><strong>Fever reducer</strong><small>Antipyretic medication for fever, if clinically appropriate and prescribed by the doctor.</small></span>\n</label>\n<label class=\"bbr-extra-card bbr-extra-card-oral\">\n<input data-extra=\"\" type=\"checkbox\" value=\"oral\"/>\n<span class=\"bbr-extra-copy\">\n<strong>Oral medication</strong><small>Selected oral medicines for symptom management, when clinically appropriate.</small>\n<span class=\"bbr-oral-inclusions-panel\">\n<strong>May include:</strong>\n<span class=\"bbr-oral-inclusion-list\">\n<span>Anti-Diarrhea Medication</span>\n<span>Anti-Nausea/Vomiting Medication</span>\n<span>Stomach Cramp Medication</span>\n<span>Antibiotics \u2014 only when clinically indicated and prescribed by the doctor</span>\n</span>\n</span>\n</span>\n</label>\n</div>\n</div>\n<div aria-live=\"polite\" class=\"bbr-finder-results\">\n<div class=\"bbr-finder-placeholder\">Showing Essential Recovery. Choose a vitamin category or optional components to explore other packages.</div>\n<div class=\"bbr-finder-result-count\" hidden=\"\"></div>\n<button class=\"bbr-finder-reset\" hidden=\"\" type=\"button\">Clear filters</button>\n</div>\n<div class=\"bbr-finder-note\">\n<p class=\"bbr-ask-doctor\">Need help choosing? Ask our doctor before booking.</p>\n<a class=\"bbr-ask-doctor-link\" href=\"https://wa.me/6289670098140?text=Hello%20Bali%20Belly%20Recovery%2C%20I%20am%20unsure%20which%20package%20to%20choose.%20Could%20I%20consult%20the%20doctor%3F\" rel=\"noopener\" target=\"_blank\">Ask the Doctor</a>\n</div>\n</div>";

  if(!document.querySelector('link[href*="package-catalogue.css"]')){
    const l=document.createElement('link');l.rel='stylesheet';l.href=base+'css/package-catalogue.css';document.head.appendChild(l);
  }
  const st=document.createElement('style');st.id='bbr-top-packages-style';
  st.textContent='#packages:not(.bbr-finder-ready) article.bbr-package:not([data-package-id="package-01"]){display:none!important}#packages:not(.bbr-finder-ready) .bbr-category~.bbr-category{display:none!important}#bbr-package-finder [hidden],#packages .bbr-package[hidden],#packages .bbr-category[hidden]{display:none!important}.bbr-top-packages{padding:20px 16px 8px!important;max-width:1200px;margin:0 auto;box-sizing:border-box}';
  document.head.appendChild(st);

  const section=document.createElement('section');
  section.className='bbr-packages bbr-top-packages';section.id='packages';
  section.setAttribute('aria-label','Bali Belly recovery packages');
  section.innerHTML='<div class="bbr-promo-note"></div>'+FINDER;
  main.insertBefore(section,main.firstChild);

  /* package-finder.js dimuat setelah kerangka ada; ia mendengarkan event bbr:packages-updated. */
  const f=document.createElement('script');f.src=base+'js/package-finder.js';f.defer=true;document.body.appendChild(f);
})();
