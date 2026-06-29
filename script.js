/* ═══════════════════════════════
   SIVAMANI PORTFOLIO — script v2
═══════════════════════════════ */

/* ── LOADER ── */
(function(){
  const loader = document.getElementById('loader');

  /* Loader matrix */
  const lc  = document.getElementById('loaderMatrix');
  const lctx = lc.getContext('2d');
  let lcols = 0;
  let ldrops = [];
  const lchars = '01SIVAMANI</>{}[]FULLSTACK';

  function sizeLoaderCanvas(){
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    lc.width = Math.floor(window.innerWidth * dpr);
    lc.height = Math.floor(window.innerHeight * dpr);
    lc.style.width = window.innerWidth + 'px';
    lc.style.height = window.innerHeight + 'px';
    lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lcols = Math.ceil(window.innerWidth / 18);
    ldrops = Array.from({ length: lcols }, () => Math.random() * window.innerHeight / 18);
  }
  function lMatrix(){
    lctx.fillStyle='rgba(3,3,10,.12)';
    lctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    lctx.font='13px Fira Code,monospace';
    ldrops.forEach((y,i)=>{
      const ch=lchars[Math.floor(Math.random()*lchars.length)];
      const isName = 'SIVAMANI'.includes(ch);
      lctx.fillStyle = isName ? 'rgba(6,182,212,.85)' : 'rgba(124,58,237,.42)';
      lctx.fillText(ch, i * 18, y * 18);
      if(y * 18 > window.innerHeight && Math.random() > .968) ldrops[i] = 0;
      ldrops[i] = y + .9;
    });
  }
  sizeLoaderCanvas();
  window.addEventListener('resize', sizeLoaderCanvas);
  const lInt = setInterval(lMatrix, 45);

  setTimeout(()=>{
    clearInterval(lInt);
    window.removeEventListener('resize', sizeLoaderCanvas);
    loader.classList.add('done');
  }, 2500);
  setTimeout(()=>{ loader.style.display = 'none'; }, 3450);
})();

/* ── CURSOR ── */
const cDot  = document.querySelector('.cursor-dot');
const cRing = document.querySelector('.cursor-ring');
if(cDot && cRing){
  let mx=0,my=0,ox=0,oy=0;
  document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; cDot.style.cssText=`left:${mx}px;top:${my}px`; });
  (function tick(){ ox+=(mx-ox)*.1; oy+=(my-oy)*.1; cRing.style.cssText=`left:${ox}px;top:${oy}px`; requestAnimationFrame(tick); })();
  document.querySelectorAll('a,button,.skc,.pcard,.sbox,.tlc,.cert-card,.exp-card,.ci,.sico')
    .forEach(el=>{ el.addEventListener('mouseenter',()=>cRing.classList.add('hov')); el.addEventListener('mouseleave',()=>cRing.classList.remove('hov')); });
}

/* ── HOME MATRIX CANVAS ── */
const hc  = document.getElementById('homeMatrix');
if(hc){
  const ctx = hc.getContext('2d');
  hc.width=window.innerWidth; hc.height=window.innerHeight;
  const cols = Math.floor(hc.width/18);
  const drops = Array(cols).fill(1);
  const chars = '01アイウエオSIVAMANI</>{}[];FullStack';
  function draw(){
    ctx.fillStyle='rgba(5,5,15,.05)'; ctx.fillRect(0,0,hc.width,hc.height);
    ctx.fillStyle='#7c3aed'; ctx.font='13px Fira Code,monospace';
    drops.forEach((y,i)=>{ const ch=chars[Math.floor(Math.random()*chars.length)]; ctx.fillText(ch,i*18,y*18); if(y*18>hc.height&&Math.random()>.975)drops[i]=0; drops[i]++; });
  }
  setInterval(draw,60);
  window.addEventListener('resize',()=>{ hc.width=window.innerWidth; hc.height=window.innerHeight; });
}

/* ── TYPED TEXT ── */
const typedEl = document.getElementById('typed');
const phrases = ['Full Stack Developer','React + Django + Node','UI/UX Enthusiast','Problem Solver'];
let pi=0,ci=0,del=false;
function typeLoop(){
  const cur=phrases[pi];
  typedEl.textContent = del ? cur.slice(0,--ci) : cur.slice(0,++ci);
  if(!del && ci===cur.length){ del=true; setTimeout(typeLoop,2000); return; }
  if(del && ci===0){ del=false; pi=(pi+1)%phrases.length; setTimeout(typeLoop,400); return; }
  setTimeout(typeLoop, del?42:85);
}
setTimeout(typeLoop,3600); // after loader

/* ── HEADER SCROLL ── */
const header = document.getElementById('header');
window.addEventListener('scroll',()=>{ header.classList.toggle('scrolled', window.scrollY>50); });

/* ── MOBILE MENU ── */
const mbtn   = document.getElementById('mbtn');
const navbar = document.getElementById('navbar');
mbtn?.addEventListener('click',()=>{
  const open = navbar.classList.toggle('open');
  const sp   = mbtn.querySelectorAll('span');
  sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  sp[1].style.opacity   = open ? '0' : '1';
  sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.querySelectorAll('.nl').forEach(l=>l.addEventListener('click',()=>{
  navbar.classList.remove('open');
  const sp=mbtn?.querySelectorAll('span');
  if(sp){ sp[0].style.transform=''; sp[1].style.opacity='1'; sp[2].style.transform=''; }
}));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nl');
new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ navLinks.forEach(l=>l.classList.remove('active')); const a=document.querySelector(`.nl[href="#${e.target.id}"]`); if(a)a.classList.add('active'); }});
},{threshold:0.35}).observe && sections.forEach(s=> new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ navLinks.forEach(l=>l.classList.remove('active')); const a=document.querySelector(`.nl[href="#${e.target.id}"]`); if(a)a.classList.add('active'); }});
},{threshold:0.35}).observe(s));

/* ── REVEAL ── */
const ro = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), i*70); ro.unobserve(e.target); }});
},{threshold:.08, rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ── SKILL BARS ── */
const sbo = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width=e.target.dataset.w+'%'; sbo.unobserve(e.target); }});
},{threshold:.3});
document.querySelectorAll('.skfill').forEach(f=>sbo.observe(f));

/* ── COUNTERS ── */
function animCount(el){
  const target = +el.dataset.t;
  const isPct  = el.classList.contains('pct');
  let cur = 0;
  const step = Math.max(1, Math.ceil(target/60));
  const t = setInterval(()=>{
    cur = Math.min(cur+step, target);
    el.textContent = cur + (isPct?'%':'+');
    if(cur>=target) clearInterval(t);
  },28);
}
const cno = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ animCount(e.target); cno.unobserve(e.target); }});
},{threshold:.5});
document.querySelectorAll('.snum,.es-num').forEach(n=>cno.observe(n));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{ const t=document.querySelector(a.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }});
});

/* ── CONTACT FORM ── */
document.getElementById('cForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button[type="submit"]');
  const orig=btn.innerHTML;
  btn.innerHTML='<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
  btn.style.background='linear-gradient(135deg,#22c55e,#16a34a)';
  btn.style.boxShadow='0 0 25px rgba(34,197,94,.5)';
  setTimeout(()=>{ btn.innerHTML=orig; btn.style.background=''; btn.style.boxShadow=''; e.target.reset(); },3200);
});

/* ── 3D TILT on project cards ── */
document.querySelectorAll('.pcard').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-7px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});
