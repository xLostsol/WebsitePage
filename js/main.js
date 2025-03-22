document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.overlay');
  const currentYearElements = document.querySelectorAll('#current-year');

  function updateYear() {
      const year = new Date().getFullYear();
      currentYearElements.forEach(element => {
          element.textContent = year;
      });
  }

  function handleScroll() {
      if (window.scrollY > 50) {
          navbar.style.padding = '1rem 0';
          navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      } else {
          navbar.style.padding = '1.5rem 0';
          navbar.style.boxShadow = 'none';
      }
  }

  function openMobileMenu() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
  }

  function initAnimations() {
      const animatableElements = document.querySelectorAll('.portfolio-card, .contact-card');
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.1
      });
      
      animatableElements.forEach(element => {
          observer.observe(element);
      });
  }

  updateYear();
  window.addEventListener('scroll', handleScroll);
  mobileMenuBtn.addEventListener('click', openMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  overlay.addEventListener('click', closeMobileMenu);
  
  initAnimations();
});