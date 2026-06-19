/* ============================================================================
   CRUELLA — app.js  (lógica partilhada; normalmente não precisas de mexer aqui)
   ============================================================================ */

/* Taxonomia fixa da loja. Só mexe aqui se quiseres novas categorias/marcas. */
const CATEGORIES = {
  footwear: ["Boots","Heels","Kitten Heels","Ballet Flats","Mules","Platforms","Loafers","Sandals","Sneakers"],
  clothing: ["Jackets & Coats","Tops","Dresses","Skirts","Trousers","Denim"],
};
const BRANDS = ["Miu Miu","Prada","Gucci","Diesel","Miss Sixty","Vintage under €30"];

const euro = n => "€" + n;
const $ = s => document.querySelector(s);

/* ---------------- icons ---------------- */
const IG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`;
const VINTED = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6l8 13 8-13"/><path d="M4 6h16"/></svg>`;

/* ---------------- mobile menu ---------------- */
(function(){
  const burger = $("#hburger"), menu = $("#mobileMenu"), close = $("#mClose");
  if(!burger || !menu) return;
  const open = v => { menu.classList.toggle("open", v); document.body.style.overflow = v?"hidden":""; };
  burger.addEventListener("click", ()=>open(true));
  close && close.addEventListener("click", ()=>open(false));
  menu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>open(false)));
})();

/* ---------------- year ---------------- */
document.querySelectorAll("[data-year]").forEach(el=> el.textContent = new Date().getFullYear());

/* ---------------- product card ---------------- */
function cardHTML(p){
  const alt = p.photos[1] ? `<img class="alt" src="${p.photos[1]}" alt="" aria-hidden="true">` : "";
  const tag = p.sold ? `<span class="pcard__tag">Sold</span>` : "";
  const price = p.sold ? `<span class="sold-txt">Sold</span>` : euro(p.price);
  return `<button class="pcard${p.sold?' sold':''}" data-ref="${p.ref}" aria-label="${p.name}">
    <span class="pcard__media">
      <img class="main" src="${p.photos[0]}" alt="${p.name}" loading="lazy">${alt}${tag}
    </span>
    <span class="pcard__info">
      <span class="pcard__brand">${p.brand}</span>
      <span class="pcard__name">${p.name}</span>
      <span class="pcard__price">${price}</span>
    </span>
  </button>`;
}
function sortPieces(list){ return [...list].sort((a,b)=>(a.sold?1:0)-(b.sold?1:0)); }

/* ---------------- home: new in ---------------- */
(function(){
  const grid = $("#newGrid"); if(!grid || typeof ARTIGOS==="undefined") return;
  grid.innerHTML = sortPieces(ARTIGOS).slice(0,4).map(cardHTML).join("");
})();

/* ---------------- shop: filters + grid ---------------- */
(function(){
  const grid = $("#shopGrid"); if(!grid || typeof ARTIGOS==="undefined") return;
  const state = { category:"all", sub:"all", brand:"all" };
  const catRow = $("#catRow"), subRow = $("#subRow"), brandRow = $("#brandRow");
  const count = $("#resultCount");

  const chip = (label,val,group,pressed,extra="") =>
    `<button class="chip ${extra}" data-group="${group}" data-val="${val}" aria-pressed="${pressed}">${label}</button>`;

  function buildCat(){
    catRow.querySelectorAll(".chip").forEach(c=>c.remove());
    catRow.insertAdjacentHTML("beforeend",
      chip("All","all","category",state.category==="all") +
      chip("Footwear","footwear","category",state.category==="footwear") +
      chip("Clothing","clothing","category",state.category==="clothing"));
  }
  function buildSub(){
    subRow.querySelectorAll(".chip").forEach(c=>c.remove());
    if(state.category==="all"){ subRow.hidden = true; return; }
    subRow.hidden = false;
    let h = chip("All","all","sub",state.sub==="all","chip--sub");
    CATEGORIES[state.category].forEach(s=> h += chip(s,s,"sub",state.sub===s,"chip--sub"));
    subRow.insertAdjacentHTML("beforeend",h);
  }
  function buildBrand(){
    brandRow.querySelectorAll(".chip").forEach(c=>c.remove());
    let h = chip("All","all","brand",state.brand==="all");
    BRANDS.forEach(b=> h += chip(b,b,"brand",state.brand===b));
    brandRow.insertAdjacentHTML("beforeend",h);
  }
  function render(){
    const list = sortPieces(ARTIGOS.filter(p=>
      (state.category==="all"||p.category===state.category) &&
      (state.sub==="all"||p.subcategory===state.sub) &&
      (state.brand==="all"||p.brand===state.brand)));
    grid.innerHTML = list.length
      ? list.map(cardHTML).join("")
      : `<p class="empty">Nothing here yet in this combination — try another filter.</p>`;
    const n = list.length;
    count.textContent = `${n} piece${n===1?"":"s"}` +
      (state.category!=="all"?` · ${state.category[0].toUpperCase()+state.category.slice(1)}`:"") +
      (state.sub!=="all"?` · ${state.sub}`:"") +
      (state.brand!=="all"?` · ${state.brand}`:"");
  }
  $("#filters").addEventListener("click", e=>{
    const c = e.target.closest(".chip"); if(!c) return;
    const g=c.dataset.group, v=c.dataset.val;
    if(g==="category"){ state.category=v; state.sub="all"; buildCat(); buildSub(); }
    else if(g==="sub"){ state.sub=v; buildSub(); }
    else if(g==="brand"){ state.brand=v; buildBrand(); }
    render();
  });

  // deep link e.g. shop.html#footwear or #footwear/Boots
  const hash = decodeURIComponent(location.hash.replace("#",""));
  if(hash){
    const [cat,sub] = hash.split("/");
    if(CATEGORIES[cat]){ state.category=cat; if(sub && CATEGORIES[cat].includes(sub)) state.sub=sub; }
  }
  buildCat(); buildSub(); buildBrand(); render();
})();

/* ---------------- quick view modal (qualquer página com cards) ---------------- */
(function(){
  const modal = $("#modal"); if(!modal || typeof ARTIGOS==="undefined") return;
  let gal = { photos:[], i:0 };
  const mImg=$("#mImg"), mDots=$("#mDots");

  function renderGal(){
    mImg.src = gal.photos[gal.i];
    mDots.innerHTML = gal.photos.length>1
      ? gal.photos.map((_,k)=>`<span class="${k===gal.i?'on':''}"></span>`).join("") : "";
  }
  function open(ref){
    const p = ARTIGOS.find(x=>x.ref===ref); if(!p) return;
    gal = { photos:p.photos, i:0 };
    $("#mBrand").textContent = p.brand;
    $("#mName").textContent = p.name;
    $("#mPrice").innerHTML = p.sold
      ? `<span class="sold-txt">Sold — this one found a home</span>` : euro(p.price);
    $("#mSpec").innerHTML =
      `<dt>Type</dt><dd>${p.subcategory}</dd>
       <dt>Size</dt><dd>${p.size}</dd>
       <dt>Condition</dt><dd>${p.condition}</dd>`;
    $("#mDesc").textContent = p.description;
    $("#mRef").textContent = p.ref;
    const cta = $("#mCta"); if(cta) cta.style.display = p.sold ? "none" : "inline-flex";
    $("#mMedia").classList.toggle("many", p.photos.length>1);
    renderGal();
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  }
  function close(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true");
    document.body.style.overflow=""; }

  document.addEventListener("click", e=>{
    const card = e.target.closest(".pcard"); if(card){ open(card.dataset.ref); return; }
    if(e.target.hasAttribute("data-close")) close();
  });
  $("#mPrev").addEventListener("click",()=>{ gal.i=(gal.i-1+gal.photos.length)%gal.photos.length; renderGal(); });
  $("#mNext").addEventListener("click",()=>{ gal.i=(gal.i+1)%gal.photos.length; renderGal(); });
  document.addEventListener("keydown", e=>{
    if(!modal.classList.contains("open")) return;
    if(e.key==="Escape") close();
    if(e.key==="ArrowLeft") $("#mPrev").click();
    if(e.key==="ArrowRight") $("#mNext").click();
  });
})();

/* ---------------- reviews wall ---------------- */
(function(){
  const wall = $("#revWall"); if(!wall || typeof REVIEWS==="undefined") return;
  wall.innerHTML = REVIEWS.map(r=>{
    if(r.image){
      return `<figure class="rev-shot"><img src="${r.image}" alt="Customer review screenshot" loading="lazy"></figure>`;
    }
    const srcIcon = r.source==="Instagram" ? IG : VINTED;
    const av = r.avatar
      ? `<img src="${r.avatar}" alt="">`
      : (r.name||"?").trim().charAt(0).toUpperCase();
    const stars = "★".repeat(r.stars||5);
    return `<article class="rev-card">
      <div class="rev-card__top">
        <span class="rev-av">${av}</span>
        <span class="rev-id">
          <span class="rev-name">${r.name||""}</span>
          ${r.handle?`<span class="rev-handle">${r.handle}</span>`:""}
        </span>
        <span class="rev-src">${srcIcon}${r.source||""}</span>
      </div>
      <div class="rev-stars" aria-label="${r.stars||5} out of 5">${stars}</div>
      <p class="rev-text">${r.text||""}</p>
      ${r.date?`<span class="rev-date">${r.date}</span>`:""}
    </article>`;
  }).join("");
})();
