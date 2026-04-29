document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // Mobile Navigation Toggle
  // ==============================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      navToggle?.classList.remove('active');
    });
  });


  // ==============================
  // Smooth Scroll
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          const offsetTop =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            80;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });


  // ==============================
  // Navbar Scroll Effect
  // ==============================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (!navbar) return;

    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });


  // ==============================
  // Skill Bar Animation
  // ==============================
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('skills');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute('data-level');
      if (level) {
        bar.style.width = level + '%';
      }
    });
  }

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsSection);
  }


  // ==============================
  // Contact Form
  // ==============================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      console.log({ name, email, message });

      alert('Thank you! Your message has been sent.');
      contactForm.reset();
    });
  }


  // ==============================
  // Typing Effect (Hero)
  // ==============================
  const heroTitle = document.querySelector('.hero-title');

  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;

    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    window.addEventListener('load', () => {
      setTimeout(typeWriter, 800);
    });
  }


  // ==============================
  // Section Fade In Animation
  // ==============================
  const sections = document.querySelectorAll('.section');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
  });


  // ==============================
  // Footer Year Update
  // ==============================
  const yearElement = document.querySelector('footer p');

  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent =
      yearElement.textContent.replace('2025', currentYear);
  }

});