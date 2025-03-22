document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  
  if (contactForm) {
      contactForm.addEventListener('submit', handleSubmit);
  }
  
  function handleSubmit(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const formEntries = Object.fromEntries(formData.entries());
      
      const name = formEntries.name;
      const email = formEntries.email;
      const subject = formEntries.subject;
      const message = formEntries.message;
      
      if (!name || !email || !subject || !message) {
          showError('Please fill out all fields');
          return;
      }
      
      if (!isValidEmail(email)) {
          showError('Please enter a valid email address');
          return;
      }
      
      simulateFormSubmission(formEntries)
          .then(() => {
              contactForm.reset();
              contactForm.style.display = 'none';
              successMessage.classList.remove('hidden');
              
              setTimeout(() => {
                  successMessage.classList.add('hidden');
                  contactForm.style.display = 'block';
              }, 5000);
          })
          .catch(error => {
              showError('There was an error sending your message. Please try again.');
              console.error('Form submission error:', error);
          });
  }
  
  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
  function showError(message) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      contactForm.insertBefore(errorDiv, submitButton);
      
      setTimeout(() => {
          errorDiv.remove();
      }, 3000);
  }
  
  function simulateFormSubmission(formData) {
      return new Promise((resolve) => {
          setTimeout(() => {
              console.log('Form submitted with data:', formData);
              resolve();
          }, 1500);
      });
  }
  
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
      input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
          if (!input.value) {
              input.parentElement.classList.remove('focused');
          }
      });
  });
});