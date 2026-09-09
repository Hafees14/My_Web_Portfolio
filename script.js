document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('open');
      }
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    '.card, .placeholder, .stats-row, .skill-card, .project-card'
  );
  revealElements.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form — Formspree
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          btn.style.background = '#2f6f4e';
          btn.style.borderColor = '#2f6f4e';
          form.reset();
        } else {
          btn.innerHTML = '<i class="fas fa-times"></i> Failed — Try Again';
          btn.style.background = '#b3432b';
          btn.style.borderColor = '#b3432b';
        }
      } catch {
        btn.innerHTML = '<i class="fas fa-times"></i> Network Error';
        btn.style.background = '#b3432b';
        btn.style.borderColor = '#b3432b';
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    });
  }

});
