// Global variables for state management
let currentFontSize = 1;

// Tour details data - Complete tour information with correct mappings
const tourDetails = {
  'Kerala': {
    title: 'God\'s Own Country - Kerala',
    duration: '6-8 Days',
    highlights: [
      'Backwater Cruise in Alleppey',
      'Munnar Tea Gardens & Hill Stations',
      'Thekkady Wildlife Sanctuary',
      'Fort Kochi Heritage Walk',
      'Ayurvedic Spa Experience',
      'Kovalam Beach Resort Stay'
    ],
    bestTime: 'October to March',
    description: 'Experience the serene backwaters, lush hill stations, and rich cultural heritage of Kerala. From houseboat stays to spice plantations, this tour offers the perfect blend of nature and culture.'
  },
  'Rajasthan': {
    title: 'Royal Rajasthan Heritage Tour',
    duration: '10-12 Days',
    highlights: [
      'Jaipur Pink City Palace Tour',
      'Udaipur City of Lakes',
      'Jaisalmer Desert Safari & Camel Ride',
      'Jodhpur Blue City & Mehrangarh Fort',
      'Pushkar Holy City & Camel Fair',
      'Ranthambore Wildlife Safari'
    ],
    bestTime: 'November to February',
    description: 'Discover the royal heritage of Rajasthan with magnificent palaces, desert landscapes, and vibrant culture. Experience camel safaris, folk dances, and authentic Rajasthani cuisine.'
  },
  'Kashi Chardham': {
    title: 'Spiritual Char Dham Yatra',
    duration: '12-15 Days',
    highlights: [
      'Badrinath Temple (Lord Vishnu)',
      'Kedarnath Temple (Lord Shiva)',
      'Gangotri Temple (River Ganga Source)',
      'Yamunotri Temple (River Yamuna Source)',
      'Haridwar Evening Ganga Aarti',
      'Rishikesh Yoga Capital Experience'
    ],
    bestTime: 'May to October',
    description: 'Embark on a sacred journey to the four holy shrines of Uttarakhand. This spiritual tour includes visits to ancient temples, holy rivers, and meditation centers in the Himalayas.'
  },
  'Kashmir, Himachal, Uttarakhand': {
    title: 'Himalayan Paradise Tour',
    duration: '10-14 Days',
    highlights: [
      'Srinagar Dal Lake Shikara Ride',
      'Gulmarg Ski Resort & Cable Car',
      'Pahalgam Valley of Shepherds',
      'Manali Rohtang Pass Adventure',
      'Shimla Mall Road & Ridge',
      'Rishikesh Adventure Sports'
    ],
    bestTime: 'April to October',
    description: 'Explore the breathtaking beauty of the Himalayas across three states. From Kashmir\'s pristine lakes to Himachal\'s snow-capped peaks and Uttarakhand\'s spiritual centers.'
  },
  'Dubai & Abu Dhabi': {
    title: 'Luxury Middle East Experience',
    duration: '5-7 Days',
    highlights: [
      'Burj Khalifa At The Top Sky Deck',
      'Dubai Mall & Gold Souk Shopping',
      'Desert Safari with BBQ Dinner',
      'Jumeirah Beach Resort Stay',
      'Sheikh Zayed Grand Mosque',
      'Ferrari World Abu Dhabi'
    ],
    bestTime: 'November to April',
    description: 'Experience the glamour and luxury of UAE with world-class shopping, architectural marvels, desert adventures, and pristine beaches. Perfect blend of modern city life and traditional culture.'
  },
  'Vietnam': {
    title: 'Exotic Vietnam Discovery',
    duration: '8-10 Days',
    highlights: [
      'Ha Long Bay UNESCO Cruise',
      'Ho Chi Minh City War Museums',
      'Mekong Delta Floating Markets',
      'Hanoi Old Quarter Food Tour',
      'Cu Chi Tunnels Historical Site',
      'Vietnamese Cooking Classes'
    ],
    bestTime: 'March to May, September to November',
    description: 'Explore the stunning landscapes, rich history, and delicious cuisine of Vietnam. From bustling cities to peaceful countryside, experience the best of Southeast Asia.'
  },
  'Andaman & Nicobar': {
    title: 'Tropical Paradise Islands',
    duration: '6-8 Days',
    highlights: [
      'Radhanagar Beach Havelock Island',
      'Scuba Diving & Snorkeling',
      'Cellular Jail Light & Sound Show',
      'Ross Island Heritage Tour',
      'Neil Island Glass Bottom Boat',
      'Limestone Caves Exploration'
    ],
    bestTime: 'October to May',
    description: 'Discover pristine beaches, crystal-clear waters, and rich marine life in India\'s tropical paradise. Perfect destination for water sports, relaxation, and nature exploration.'
  },
  'Odisha': {
    title: 'Temple State Heritage Tour',
    duration: '7-9 Days',
    highlights: [
      'Jagannath Temple Puri Darshan',
      'Konark Sun Temple UNESCO Site',
      'Lingaraj Temple Bhubaneswar',
      'Chilika Lake Asia\'s Largest Lagoon',
      'Udayagiri & Khandagiri Caves',
      'Golden Beach Puri Stay'
    ],
    bestTime: 'October to March',
    description: 'Explore Odisha\'s magnificent temples, pristine beaches, and rich cultural heritage. Visit ancient architectural marvels and enjoy the coastal beauty of the Bay of Bengal.'
  }
};

// India and Overseas tours data
const indiaTours = [
  'Kerala', 'Rajasthan', 'Kashi Chardham', 'Kashmir, Himachal, Uttarakhand',
  'Seven Sisters (Northeast)', 'Odisha', 'Narmada Parikrama', 'Pithapur',
  'Golden Triangle (Delhi-Agra-Jaipur)', 'Goa', 'Tamil Nadu Temple Tour', 'Karnataka Heritage Tour'
];

const overseasTours = [
  'Dubai & Abu Dhabi', 'Vietnam', 'Andaman & Nicobar', 'Singapore & Malaysia',
  'Thailand', 'Sri Lanka', 'Nepal & Bhutan', 'Europe Tour', 'Bali Indonesia', 'Maldives'
];

// Carousel state variables
let currentReviewSlide = 0;
let reviewsPerSlide = 1;
let totalReviewSlides = 0;
let reviewsAutoPlay = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize application
function initializeApp() {
  setupScrollProgress();
  setupSmoothScrolling();
  setupFormHandling();
  setupAnimations();
  setupMobileMenu();
  setupStickyHeader();
  setupReviewsCarousel();
}

// Scroll Progress Bar
function setupScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = Math.min(progress, 100) + '%';
  });
}

// Smooth Scrolling
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Show tour details in modal
function showTourDetails(tourName) {
  const tour = tourDetails[tourName];
  if (!tour) return;
  
  const tourDetailsContainer = document.getElementById('tour-details');
  tourDetailsContainer.innerHTML = `
    <h2 style="color: var(--color-primary); margin-bottom: 1rem;">${tour.title}</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 1.5rem;">
      <div>
        <h3 style="color: var(--color-text); margin-bottom: 0.5rem;">Duration</h3>
        <p style="color: var(--color-text-secondary);">${tour.duration}</p>
      </div>
      <div>
        <h3 style="color: var(--color-text); margin-bottom: 0.5rem;">Best Time to Visit</h3>
        <p style="color: var(--color-text-secondary);">${tour.bestTime}</p>
      </div>
    </div>
    <div style="margin-bottom: 1.5rem;">
      <h3 style="color: var(--color-text); margin-bottom: 0.75rem;">Key Highlights</h3>
      <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
        ${tour.highlights.map(highlight => `<li style="color: var(--color-text-secondary); padding: 0.25rem 0; position: relative; padding-left: 1.5rem;"><span style="position: absolute; left: 0; color: var(--color-primary);">✓</span>${highlight}</li>`).join('')}
      </ul>
    </div>
    <div style="margin-bottom: 1.5rem;">
      <h3 style="color: var(--color-text); margin-bottom: 0.75rem;">Description</h3>
      <p style="color: var(--color-text-secondary); line-height: 1.6;">${tour.description}</p>
    </div>
    <div style="text-align: center;">
      <button class="btn btn--primary btn--lg" onclick="contactForBooking('${tourName}')">Book Now</button>
    </div>
  `;
  
  showModal('tour-modal');
}

// Show all tours in modal
function showAllTours() {
  const allToursContainer = document.getElementById('all-tours-content');
  allToursContainer.innerHTML = `
    <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">All Our Tour Destinations</h2>
    
    <div style="margin-bottom: 2rem;">
      <h3 style="color: var(--color-text); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-primary);">India Tours</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.75rem;">
        ${indiaTours.map(tour => `
          <div style="padding: 0.75rem; background: var(--color-background); border-radius: var(--radius-base); border: 1px solid var(--color-border); transition: all 0.2s ease;" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';">
            <span style="color: var(--color-text-secondary); font-weight: 500;">${tour}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div>
      <h3 style="color: var(--color-text); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-secondary);">Overseas Tours</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.75rem;">
        ${overseasTours.map(tour => `
          <div style="padding: 0.75rem; background: var(--color-background); border-radius: var(--radius-base); border: 1px solid var(--color-border); transition: all 0.2s ease;" onmouseover="this.style.boxShadow='var(--shadow-md)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';">
            <span style="color: var(--color-text-secondary); font-weight: 500;">${tour}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border);">
      <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">Ready to plan your next adventure?</p>
      <button class="btn btn--primary btn--lg" onclick="contactForBooking('All Tours'); closeModal();">Contact Us for Custom Packages</button>
    </div>
  `;
  
  showModal('all-tours-modal');
}

// Contact for booking function
function contactForBooking(tourName) {
  const contactSection = document.getElementById('contact');
  const messageField = document.getElementById('message');
  
  closeModal();
  
  // Scroll to contact section
  const headerHeight = document.querySelector('.header').offsetHeight;
  window.scrollTo({
    top: contactSection.offsetTop - headerHeight - 20,
    behavior: 'smooth'
  });
  
  // Pre-fill message field
  setTimeout(() => {
    messageField.value = `Hi! I'm interested in the ${tourName} tour. Could you please provide me with more details about the itinerary and pricing? Thank you!`;
    messageField.focus();
  }, 1000);
}

// Form Handling
function setupFormHandling() {
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    if (validateForm()) {
      // Simulate form submission
      submitForm();
    }
  });
}

// Form validation
function validateForm() {
  const requiredFields = document.querySelectorAll('#contact-form [required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--color-error)';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  
  // Email validation
  const emailField = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailField.value && !emailRegex.test(emailField.value)) {
    emailField.style.borderColor = 'var(--color-error)';
    isValid = false;
  }
  
  // Phone validation (basic)
  const phoneField = document.getElementById('phone');
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  
  if (phoneField.value && !phoneRegex.test(phoneField.value)) {
    phoneField.style.borderColor = 'var(--color-error)';
    isValid = false;
  }
  
  return isValid;
}

// Submit form
function submitForm() {
  // Show loading state
  const submitBtn = document.querySelector('#contact-form button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  // Simulate API call
  setTimeout(() => {
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    
    // Show success modal
    showModal('success-modal');
  }, 2000);
}

// Modal functionality
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
  
  // Close on outside click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.querySelector('.modal.show');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Animation setup
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Add animation class to sections
  const sections = document.querySelectorAll('.why-choose, .popular-tours, .services, .reviews, .contact');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Add animation to cards
  const cards = document.querySelectorAll('.feature-card, .tour-card, .service-card, .review-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('fade-in');
    observer.observe(card);
  });
}

// Mobile Menu
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('mobile-open');
      this.classList.toggle('active');
    });
  }
}

// Sticky Header
function setupStickyHeader() {
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}



// Hero CTA interaction
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('hero__cta-primary')) {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    window.scrollTo({
      top: contactSection.offsetTop - headerHeight - 20,
      behavior: 'smooth'
    });
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  // Escape key to close modals
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Performance optimization - Lazy loading for images
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    const images = document.querySelectorAll('.tour-card__image');
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
});

// Accessibility enhancements
function setupAccessibility() {
  // Focus management
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  // Skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      mainContent.focus();
      mainContent.scrollIntoView();
    });
  }
  
  // Announce page changes for screen readers
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  
  // Announce language changes
  window.announceToScreenReader = function(message) {
    announcer.textContent = message;
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  };
}

// Initialize accessibility features
setupAccessibility();
setupLazyLoading();



// Service Worker registration (if needed)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Uncomment if you want to add a service worker
    // navigator.serviceWorker.register('/sw.js');
  });
}

// Analytics tracking simulation
function trackEvent(eventName, parameters) {
  // This would integrate with Google Analytics or other tracking services
  console.log('Event tracked:', eventName, parameters);
}

// Track form submissions
document.getElementById('contact-form').addEventListener('submit', function() {
  trackEvent('form_submission', {
    form_name: 'contact_form',
    language: currentLanguage
  });
});

// Track tour interactions
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('tour-card__cta')) {
    const tourCard = e.target.closest('.tour-card');
    const tourTitle = tourCard.querySelector('.tour-card__title').textContent;
    trackEvent('tour_explore', {
      tour_name: tourTitle
    });
  }
});

// Window resize handling with improved modal responsiveness
window.addEventListener('resize', function() {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function() {
    // Adjust modal positioning if open
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      const modalContent = openModal.querySelector('.modal__content');
      if (window.innerWidth < 768) {
        modalContent.style.margin = 'var(--space-16)';
        modalContent.style.maxHeight = '90vh';
      } else {
        modalContent.style.margin = '';
        modalContent.style.maxHeight = '80vh';
      }
    }
  }, 250);
});

// Add smooth animations for tour cards
function enhanceTourCards() {
  const tourCards = document.querySelectorAll('.tour-card');
  tourCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// Initialize enhanced tour cards
enhanceTourCards();

// Reviews Carousel Setup
function setupReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const dotsContainer = document.getElementById('reviewsDots');
  
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;
  
  const slides = track.querySelectorAll('.carousel-slide');
  totalReviewSlides = slides.length;
  
  // Determine reviews per slide based on screen size
  function updateReviewsPerSlide() {
    if (window.innerWidth >= 1024) {
      reviewsPerSlide = 3;
    } else if (window.innerWidth >= 768) {
      reviewsPerSlide = 2;
    } else {
      reviewsPerSlide = 1;
    }
  }
  
  updateReviewsPerSlide();
  
  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const maxSlides = Math.ceil(totalReviewSlides / reviewsPerSlide);
    
    for (let i = 0; i < maxSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  createDots();
  
  // Update carousel position
  function updateCarousel() {
    const slideWidth = 100 / reviewsPerSlide;
    const translateX = -currentReviewSlide * slideWidth;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentReviewSlide);
    });
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    const maxSlides = Math.ceil(totalReviewSlides / reviewsPerSlide);
    currentReviewSlide = Math.max(0, Math.min(slideIndex, maxSlides - 1));
    updateCarousel();
  }
  
  // Previous slide
  function prevSlide() {
    if (currentReviewSlide > 0) {
      currentReviewSlide--;
      updateCarousel();
    }
  }
  
  // Next slide
  function nextSlide() {
    const maxSlides = Math.ceil(totalReviewSlides / reviewsPerSlide);
    if (currentReviewSlide < maxSlides - 1) {
      currentReviewSlide++;
      updateCarousel();
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto-play functionality
  function startAutoPlay() {
    reviewsAutoPlay = setInterval(() => {
      const maxSlides = Math.ceil(totalReviewSlides / reviewsPerSlide);
      if (currentReviewSlide < maxSlides - 1) {
        nextSlide();
      } else {
        currentReviewSlide = 0;
        updateCarousel();
      }
    }, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoPlay() {
    if (reviewsAutoPlay) {
      clearInterval(reviewsAutoPlay);
      reviewsAutoPlay = null;
    }
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause auto-play on hover
  const carousel = document.querySelector('.reviews-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Handle resize
  window.addEventListener('resize', function() {
    clearTimeout(window.carouselResizeTimeout);
    window.carouselResizeTimeout = setTimeout(() => {
      updateReviewsPerSlide();
      createDots();
      currentReviewSlide = 0;
      updateCarousel();
    }, 250);
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let isDragging = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoPlay();
  });
  
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    isDragging = false;
    setTimeout(startAutoPlay, 1000); // Restart auto-play after 1 second
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('.reviews-carousel')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    }
  });
}

// Make functions globally available for onclick handlers
window.showTourDetails = showTourDetails;
window.showAllTours = showAllTours;
window.contactForBooking = contactForBooking;
window.closeModal = closeModal;

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showTourDetails,
    showAllTours,
    validateForm,
    contactForBooking
  };
}