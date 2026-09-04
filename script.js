/* ═══════════════════════════════
   SIVAMANI PORTFOLIO — script v2
═══════════════════════════════ */

/* ── LOADER ── */
(function initLoader(){
  const loader = document.getElementById('loader');
  window.portfolioReady = false;

  const signalReady = () => {
    window.portfolioReady = true;
    window.dispatchEvent(new CustomEvent('portfolio:ready'));
  };

  if (!loader) {
    signalReady();
    return;
  }

  document.documentElement.classList.add('is-loading');
  const prefersReducedLoaderMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  let safetyTimer;

  const finishLoader = () => {
    if (finished) return;
    finished = true;
    clearTimeout(safetyTimer);
    loader.setAttribute('aria-hidden', 'true');
    loader.style.display = 'none';
    document.documentElement.classList.remove('is-loading');
    signalReady();
  };

  safetyTimer = setTimeout(() => {
    loader.classList.add('is-finished');
    setTimeout(finishLoader, 220);
  }, 2800);

  if (prefersReducedLoaderMotion) {
    loader.classList.add('is-finished');
    setTimeout(finishLoader, 180);
    return;
  }

  if (!window.gsap) {
    setTimeout(() => loader.classList.add('is-finished'), 420);
    setTimeout(finishLoader, 680);
    return;
  }

  const progress = { value: 0 };
  const percent = document.getElementById('loaderPercent');
  const progressBar = document.getElementById('loaderProgressBar');
  const letters = loader.querySelectorAll('.loader-letter');
  const brackets = loader.querySelectorAll('.loader-bracket');

  gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left center' });
  gsap.set('.loader-scan', { scaleX: 0, autoAlpha: 0, transformOrigin: 'left center' });

  gsap.timeline({ onComplete: finishLoader })
    .from('.loader-kicker', { autoAlpha: 0, y: 12, duration: .2, ease: 'power2.out' }, .04)
    .from(brackets, { autoAlpha: 0, x: index => index ? -18 : 18, duration: .3, ease: 'power3.out' }, .08)
    .from(letters, {
      autoAlpha: 0,
      y: 34,
      rotateX: 78,
      duration: .34,
      stagger: .05,
      ease: 'back.out(1.7)'
    }, .1)
    .from('.loader-slash', { autoAlpha: 0, scale: .4, duration: .2, ease: 'back.out(2)' }, .38)
    .to(progressBar, { scaleX: 1, duration: .62, ease: 'power2.inOut' }, .42)
    .to(progress, {
      value: 100,
      duration: .62,
      ease: 'power2.inOut',
      onUpdate: () => { percent.textContent = `${Math.round(progress.value)}%`; }
    }, .42)
    .from('.loader-meta', { autoAlpha: 0, y: 8, duration: .2, ease: 'power2.out' }, .44)
    .to('.loader-scan', { scaleX: 1, autoAlpha: 1, duration: .18, ease: 'power3.in' }, 1.04)
    .to('.loader-scan', { autoAlpha: 0, duration: .12 }, 1.2)
    .to('.loader-content', { autoAlpha: 0, y: -12, duration: .16, ease: 'power2.in' }, 1.18)
    .to('.loader-grid', { autoAlpha: 0, duration: .12 }, 1.2)
    .to('.loader-panel-left', { xPercent: -100, duration: .48, ease: 'power4.inOut' }, 1.25)
    .to('.loader-panel-right', { xPercent: 100, duration: .48, ease: 'power4.inOut' }, 1.25);
})();

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
let typingStarted = false;
function typeLoop(){
  const cur=phrases[pi];
  typedEl.textContent = del ? cur.slice(0,--ci) : cur.slice(0,++ci);
  if(!del && ci===cur.length){ del=true; setTimeout(typeLoop,2000); return; }
  if(del && ci===0){ del=false; pi=(pi+1)%phrases.length; setTimeout(typeLoop,400); return; }
  setTimeout(typeLoop, del?42:85);
}
function startTyping(){
  if (typingStarted) return;
  typingStarted = true;
  typeLoop();
}
if (window.portfolioReady) startTyping();
else window.addEventListener('portfolio:ready', startTyping, { once: true });
setTimeout(startTyping, 3000);

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
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = [...document.querySelectorAll('.reveal')];
const canUseGsap = !prefersReducedMotion && window.gsap && window.ScrollTrigger;

if (canUseGsap) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap-ready');
  revealElements.forEach(el => el.classList.add('visible'));

  const motion = gsap.matchMedia();
  motion.add({
    desktop: '(min-width: 769px)',
    mobile: '(max-width: 768px)'
  }, context => {
    const distance = context.conditions.mobile ? 26 : 48;
    const duration = context.conditions.mobile ? .65 : .85;
    const ease = 'power3.out';

    document.querySelectorAll('section:not(#home)').forEach(section => {
      const intro = [...section.querySelectorAll(':scope > .stag, :scope > .sh')];
      const line = section.querySelector('.hl');
      const timeline = gsap.timeline({
        defaults: { duration, ease },
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true
        }
      });

      if (intro.length) {
        timeline.fromTo(intro,
          { autoAlpha: 0, y: distance },
          { autoAlpha: 1, y: 0, stagger: .12, clearProps: 'opacity,visibility,transform' }
        );
      }

      if (line) {
        timeline.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: .65, clearProps: 'transform' },
          '<.12'
        );
      }

      let content = [];
      if (section.id === 'about') content = [...section.querySelectorAll('.aimg-col, .ainfo')];
      if (section.id === 'experience') content = [...section.querySelectorAll('.exp-item, .exp-stats')];
      if (section.id === 'education') content = [...section.querySelectorAll('.edu-col')];
      if (section.id === 'skills') content = [...section.querySelectorAll('.skc')];
      if (section.id === 'projects') content = [...section.querySelectorAll('.pcard')];
      if (section.id === 'contact') content = [...section.querySelectorAll('.cinfo, .cform-wrap')];

      const useSideMotion = ['about', 'education', 'contact'].includes(section.id);
      if (useSideMotion) {
        content.forEach((element, index) => {
          timeline.fromTo(element,
            { autoAlpha: 0, x: index % 2 ? distance : -distance, y: 10 },
            { autoAlpha: 1, x: 0, y: 0, clearProps: 'opacity,visibility,transform' },
            intro.length ? '<.12' : 0
          );
        });
      } else if (content.length) {
        timeline.fromTo(content,
          { autoAlpha: 0, y: distance, scale: .97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: context.conditions.mobile ? .06 : .1,
            clearProps: 'opacity,visibility,transform'
          },
          intro.length ? '-=.35' : 0
        );
      }
    });

    gsap.utils.toArray('.pimg img').forEach(image => {
      gsap.fromTo(image,
        { objectPosition: '50% 42%' },
        {
          objectPosition: '50% 58%',
          ease: 'none',
          scrollTrigger: {
            trigger: image.closest('.pcard'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: context.conditions.mobile ? .35 : .7
          }
        }
      );
    });

    gsap.to('.pwrap', {
      y: context.conditions.mobile ? -16 : -34,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: .8
      }
    });

    gsap.fromTo('.fin > *',
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: .7,
        stagger: .1,
        ease,
        clearProps: 'opacity,visibility,transform',
        scrollTrigger: { trigger: '.footer', start: 'top 92%', once: true }
      }
    );
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
} else if (prefersReducedMotion) {
  revealElements.forEach(el => el.classList.add('visible'));
} else {
  const ro = new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), i*70); ro.unobserve(e.target); }});
  },{threshold:.08, rootMargin:'0px 0px -50px 0px'});
  revealElements.forEach(el=>ro.observe(el));
}

/* ── SKILL BARS ── */
const skillFills = document.querySelectorAll('.skfill');
if (prefersReducedMotion) {
  skillFills.forEach(fill => { fill.style.width = fill.dataset.w + '%'; });
} else {
  const sbo = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.style.width=e.target.dataset.w+'%'; sbo.unobserve(e.target); }});
  },{threshold:.3});
  skillFills.forEach(f=>sbo.observe(f));
}

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
const counters = document.querySelectorAll('.snum,.es-num');
if (prefersReducedMotion) {
  counters.forEach(counter => {
    counter.textContent = counter.dataset.t + (counter.classList.contains('pct') ? '%' : '+');
  });
} else {
  const cno = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ animCount(e.target); cno.unobserve(e.target); }});
  },{threshold:.5});
  counters.forEach(n=>cno.observe(n));
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{ const t=document.querySelector(a.getAttribute('href')); if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }});
});

/* ── CONTACT FORM ── */
document.getElementById('cForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const form = e.currentTarget;
  const btn=e.target.querySelector('button[type="submit"]');
  const orig=btn.innerHTML;
  const status = document.getElementById('formStatus');
  const data = new FormData(form);
  const message = [
    'Hello Sivamani, I would like to contact you.',
    '',
    '*Contact Details*',
    `Name: ${data.get('fullName')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not specified'}`,
    '',
    '*Message*',
    data.get('message')
  ].join('\n');

  btn.disabled = true;
  btn.innerHTML='<span>Opening WhatsApp...</span> <i class="fa-brands fa-whatsapp"></i>';
  btn.style.background='linear-gradient(135deg,#22c55e,#16a34a)';
  btn.style.boxShadow='0 0 25px rgba(34,197,94,.5)';
  if (status) status.textContent = 'Your message is ready to send in WhatsApp.';
  window.open(`https://wa.me/919360452496?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

  setTimeout(()=>{
    btn.disabled = false;
    btn.innerHTML=orig;
    btn.style.background='';
    btn.style.boxShadow='';
  },1800);
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
