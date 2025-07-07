const popularPlaces = {
  Georgia: [
    { name: 'Vardzia', img: 'imgs/vardzia.jpeg' },
    { name: 'Rabati Castle', img: 'imgs/Rabati.jpg' },
    { name: 'Stepantsminda', img: 'imgs/stepantsminda.jpg' }
  ],
  France: [
    { name: 'Eiffel Tower', img: 'imgs/Eiffel.webp' },
    { name: 'Louvre Museum', img: 'imgs/Louvre.jpg' },
    { name: 'Mont Saint-Michel', img: 'imgs/Mont-Saint-Michel.jpg' }
  ],
  Italy: [
    { name: 'Colosseum', img: 'imgs/Colosseum.jpg' },
    { name: 'Venice Canals', img: 'imgs/Venice Canals.webp' },
    { name: 'Leaning Tower of Pisa', img: 'imgs/Pisa.webp' }
  ],
  Mexico: [
    { name: 'Chichen Itza', img: 'imgs/chichen itza.avif' },
    { name: 'Cancun Beaches', img: 'imgs/Cancun Beaches.avif' },
    { name: 'Teotihuacan', img: 'imgs/Teotihuacan.jpg' }
  ],
  Spain: [
    { name: 'Sagrada Familia', img: 'imgs/Sagrada.webp' },
    { name: 'Alhambra', img: 'imgs/alhambra.jpg' },
    { name: 'Park Güell', img: 'imgs/Guell.webp' }
  ],
  Switzerland: [
    { name: 'Matterhorn', img: 'imgs/Matterhorn.webp' },
    { name: 'Lake Geneva', img: 'imgs/Lake geneva.jpg' },
    { name: 'Jungfraujoch', img: 'imgs/Jungfraujoch.avif' }
  ],
  Thailand: [
    { name: 'Phi Phi Islands', img: 'imgs/phi Phi islands.jpg' },
    { name: 'Grand Palace', img: 'imgs/grand palace.jpg' },
    { name: 'Chiang Mai Old City', img: 'imgs/Chiang Mai old City.jpg' }
  ],
  Brazil: [
    { name: 'Christ the Redeemer', img: 'imgs/Christ.jpg' },
    { name: 'Iguazu Falls', img: 'imgs/Iguazu Falls.jpg' },
    { name: 'Copacabana Beach', img: 'imgs/Copacabana.jpg' }
  ]
};

const popularCountries = [
  'France',
  'Georgia',
  'Italy',
  'Mexico',
  'Spain',
  'Switzerland',
  'Thailand',
  'Brazil'
];

// Load countries and display cards
async function loadCountries() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags');
    const countries = await res.json();

    const filtered = countries.filter(c =>
      popularCountries.includes(c.name.common)
    );

    const container = document.querySelector('.destinations-container');
    container.innerHTML = '';

    filtered.forEach(country => {
      const card = document.createElement('div');
      card.classList.add('country-card');

      card.innerHTML = `
        <img src="${country.flags?.png}" alt="${country.name.common} flag" class="country-flag" />
        <div class="country-name">${country.name.common}</div>
        <div class="country-capital">Capital: ${country.capital?.[0] || 'N/A'}</div>
        <div class="tourist-places" style="display: none;"></div>
      `;

      const placesBox = card.querySelector('.tourist-places');
      const places = popularPlaces[country.name.common] || [];

      card.addEventListener('click', () => {
        // Hide other open tourist places
        document.querySelectorAll('.tourist-places').forEach(box => {
          if (box !== placesBox) {
            box.style.display = 'none';
            box.innerHTML = '';
          }
        });

        if (placesBox.style.display === 'none') {
          placesBox.innerHTML = `
            <div class="places-gallery">
              ${places.map(place => `
                <div class="place-item">
                  <img src="${place.img}" alt="${place.name}" />
                  <p>${place.name}</p>
                </div>
              `).join('')}
            </div>
          `;
          placesBox.style.display = 'block';
        } else {
          placesBox.style.display = 'none';
          placesBox.innerHTML = '';
        }
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}

// Hero Section Carousel
const heroOverlay = document.querySelector('.hero-overlay');
const heroImages = [
  'imgs/boat.jpg',
  'imgs/travel.jpg',
  'imgs/travel1.avif',
  'imgs/travel2.jpg'
];

let currentIndex = 0;
let carouselInterval;

function updateHeroBackground() {
  heroOverlay.style.backgroundImage = `url(${heroImages[currentIndex]})`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % heroImages.length;
  updateHeroBackground();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + heroImages.length) % heroImages.length;
  updateHeroBackground();
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}

function resetCarouselTimer() {
  clearInterval(carouselInterval);
  startCarousel();
}

// Modal and Form Handling
function setupModalAndForm() {
  const modal = document.getElementById('tripModal');
  const openBtn = document.getElementById('openTripModal');
  const closeBtn = modal.querySelector('.close-btn');
  const form = document.getElementById('trip-form');
  const nameInput = form.name;
  const emailInput = form.email;
  const passwordInput = form.password;
  const destinationInput = form.destination;
  const messageInput = form.message;
  const formMessage = document.getElementById('form-message');
  const togglePasswordBtn = document.getElementById('toggle-password');

  let scrollPosition = 0;

  // Open modal
  openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // IMPORTANT if openBtn is a link

    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    modal.style.display = 'block';

    // Clear messages and reset form fields & password toggle
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');
    form.reset();
    togglePasswordBtn.textContent = 'Show';
    passwordInput.type = 'password';
  });

  // Close modal function
  function closeModal() {
    modal.style.display = 'none';

    // Remove fixed positioning and restore scroll position
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Toggle password visibility
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.textContent = 'Show';
    }
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    formMessage.textContent = '';
    formMessage.classList.remove('success', 'error');

    const errors = [];

    if (!nameInput.value.trim()) {
      errors.push('Please enter your full name.');
    }

    if (!emailRegex.test(emailInput.value.trim())) {
      errors.push('Please enter a valid email address.');
    }

    if (passwordInput.value.length < 6) {
      errors.push('Password must be at least 6 characters.');
    }

    if (!destinationInput.value.trim()) {
      errors.push('Please enter your destination.');
    }

    if (errors.length > 0) {
      formMessage.textContent = errors.join(' ');
      formMessage.classList.add('error');
      return;
    }

    // Success
    formMessage.textContent = 'Thank you! Your trip plan has been submitted.';
    formMessage.classList.add('success');

    // Reset form and password toggle button
    form.reset();
    togglePasswordBtn.textContent = 'Show';
    passwordInput.type = 'password';
  });
}

// Navbar scroll shadow and active link highlighting
function setupNavbarBehavior() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    // Navbar shadow
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    }

    // Active link highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

// Back to top button
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadCountries();
  setupModalAndForm();
  setupNavbarBehavior();
  setupBackToTop();

  updateHeroBackground();
  startCarousel();

  document.getElementById('nextHero').addEventListener('click', () => {
    nextSlide();
    resetCarouselTimer();
  });

  document.getElementById('prevHero').addEventListener('click', () => {
    prevSlide();
    resetCarouselTimer();
  });

  // Burger menu toggle
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');

  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // Close nav menu when clicking nav links
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });



// Cookie banner handling
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'flex';
  }

  acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
});


