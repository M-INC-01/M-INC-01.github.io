document.addEventListener('DOMContentLoaded', () => {
  // Anno nel footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Menu mobile
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  let isMenuOpen = false;

  menuToggle && menuToggle.addEventListener('click', () => {
    if(!nav) return;
    isMenuOpen = !isMenuOpen;
    
    nav.style.display = isMenuOpen ? 'flex' : 'none';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '18px';
    nav.style.top = '66px';
    nav.style.background = 'rgba(2,6,23,0.95)';
    nav.style.padding = '15px';
    nav.style.borderRadius = '12px';
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.animation = isMenuOpen ? 'slideIn 0.3s ease' : 'slideOut 0.3s ease';
  });

  // Chiudi menu al click fuori
  document.addEventListener('click', (e) => {
    if(isMenuOpen && nav && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
      nav.style.display = 'none';
      isMenuOpen = false;
    }
  });

  // Smooth scroll per link interni
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if(target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Chiudi menu mobile se aperto
          if(isMenuOpen && window.innerWidth <= 768) {
            nav.style.display = 'none';
            isMenuOpen = false;
          }
        }
      }
    });
  });

  // Reveal on scroll con delay progressivo
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if(entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 150); // Delay progressivo
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px'
  });

  // Osserva elementi per animazioni
  document.querySelectorAll('.card-large, .card, .section-title, .lead').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Effetto parallax sullo sfondo
  document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    document.body.style.backgroundPosition = `${moveX}px ${moveY}px`;
  });

  // Animazione glow per cards
  document.querySelectorAll('.glow').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
});
