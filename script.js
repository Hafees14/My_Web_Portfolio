document.addEventListener("DOMContentLoaded", () => {

  // ============================================================
  // MOBILE NAV TOGGLE
  // ============================================================
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });

    navList.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('open');
      }
    });
  }

  // ============================================================
  // SMOOTH SCROLL (offset for fixed navbar)
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  // ============================================================
  // NAVBAR SCROLL SHADOW
  // ============================================================
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.style.boxShadow = window.scrollY > 80
      ? '0 2px 24px rgba(0,0,0,0.1)'
      : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', activateLink, { passive: true });
  activateLink();

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealElements = document.querySelectorAll(
    '.section-label, .section-heading, .about-grid, .timeline-card, .skill-card, .project-card, .vol-card, .contact-card, .contact-form-wrapper, .stat-item'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // SKILL BAR ANIMATION
  // ============================================================
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillSection = document.getElementById('skills');

  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        skillFills.forEach(fill => {
          const level = fill.getAttribute('data-level') || '0';
          fill.style.width = level + '%';
        });
        skillObserver.disconnect();
      }
    }, { threshold: 0.3 });
    skillObserver.observe(skillSection);
  }

  // ============================================================
  // CONTACT FORM — Formspree
  // ============================================================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = '#059669';
          form.reset();
        } else {
          btn.innerHTML = '<i class="fas fa-times"></i> Failed — Try Again';
          btn.style.background = '#dc2626';
        }
      } catch {
        btn.innerHTML = '<i class="fas fa-times"></i> Network Error';
        btn.style.background = '#dc2626';
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  }

  // ============================================================
  // FOOTER YEAR
  // ============================================================
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});