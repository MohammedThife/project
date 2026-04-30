/* =========================================
   main.js
   Shared JS: scroll-reveal animations,
   testimonials carousel, smooth scrolling.
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initTestimonialsSlider();
  initSmoothScroll();
});

/* ─────────────────────────────────────────
   SCROLL REVEAL
   Adds 'visible' class to .reveal elements
   when they enter the viewport.
───────────────────────────────────────── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: stop observing after reveal
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   TESTIMONIALS SLIDER
   Auto-advances every 5 seconds.
   Supports prev/next arrows and dot navigation.
───────────────────────────────────────── */
function initTestimonialsSlider() {
  const track    = document.querySelector('.testimonials-track');
  const dots     = document.querySelectorAll('.slider-dot');
  const prevBtn  = document.querySelector('.slider-btn.prev');
  const nextBtn  = document.querySelector('.slider-btn.next');
  const slides   = document.querySelectorAll('.testimonial-slide');

  if (!track || !slides.length) return;

  let current = 0;
  let autoTimer = null;

  /** Move to slide index i */
  function goTo(i) {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  }

  /** Start/restart the auto-play timer */
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  // Dot click
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goTo(idx);
      startAuto(); // reset timer on manual interaction
    });
  });

  // Prev / Next buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goTo(current + 1) : goTo(current - 1);
      startAuto();
    }
  });

  // Pause auto-play when user hovers slider
  track.closest('.testimonials-slider-wrapper')?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track.closest('.testimonials-slider-wrapper')?.addEventListener('mouseleave', startAuto);

  // Boot
  goTo(0);
  startAuto();
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL
   Handles all anchor links starting with #
───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
