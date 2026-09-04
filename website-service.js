const serviceForm = document.getElementById('serviceEnquiryForm');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.service-hero-content > *', {
    autoAlpha: 0,
    y: 30,
    duration: .8,
    stagger: .12,
    ease: 'power3.out'
  });

  gsap.utils.toArray('[data-reveal]').forEach(element => {
    gsap.from(element, {
      autoAlpha: 0,
      y: 36,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    });
  });
}

serviceForm?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  const original = button.innerHTML;
  const status = document.getElementById('serviceFormStatus');
  const message = [
    'Hello Sivamani, I need a website for my business.',
    '',
    '*Client Details*',
    `Name: ${data.get('fullName')}`,
    `Phone: ${data.get('phone')}`,
    `Email: ${data.get('email')}`,
    `Business / Brand: ${data.get('business')}`,
    '',
    '*Website Requirements*',
    `Website Type: ${data.get('websiteType')}`,
    `Domain Status: ${data.get('domainStatus')}`,
    `Estimated Budget: ${data.get('budget')}`,
    `Expected Timeline: ${data.get('timeline')}`,
    '',
    data.get('requirements')
  ].join('\n');

  button.disabled = true;
  button.innerHTML = 'Opening WhatsApp... <i class="fa-brands fa-whatsapp"></i>';
  if (status) status.textContent = 'Your website enquiry is ready to send.';
  window.open(`https://wa.me/919360452496?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = original;
  }, 1800);
});
