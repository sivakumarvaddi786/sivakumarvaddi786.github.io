// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'DevOps Lead Engineer',
  'AWS Cloud Architect',
  'CI/CD Specialist',
  'IaC Expert',
  'Kubernetes Engineer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewrite() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typewrite, delay);
}

typewrite();

// ===== Floating Particles =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
  particle.style.animationDelay = (Math.random() * 10) + 's';
  particle.style.width = particle.style.height = (Math.random() * 3 + 1) + 'px';
  particlesContainer.appendChild(particle);
}

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .timeline-item').forEach((el) => {
  observer.observe(el);
});

// ===== Counter Animation =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
