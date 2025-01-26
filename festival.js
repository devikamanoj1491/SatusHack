// Select all carousel containers
const carousels = document.querySelectorAll('.carousel-container');

// To track which carousel is currently active
let activeCarouselIndex = 0;

function setActiveCarousel(index) {
  carousels.forEach((carouselContainer, i) => {
    if (i === index) {
      carouselContainer.classList.add('active-carousel');
    } else {
      carouselContainer.classList.remove('active-carousel');
    }
  });
  activeCarouselIndex = index;
}

// Initialize all carousels
carousels.forEach((carouselContainer, carouselIndex) => {
  const carousel = carouselContainer.querySelector('.carousel');
  const items = carouselContainer.querySelectorAll('.carousel-item');
  const prevButton = carouselContainer.querySelector('.prev');
  const nextButton = carouselContainer.querySelector('.next');
  let currentIndex = 0;
  const totalItems = items.length;

  // Function to update the carousel position and enlarge the selected item
  function updateCarousel() {
    const offset = -currentIndex * (100 / totalItems); // Calculate flex-based percentage offset
    carousel.style.transform = `translateX(${offset}%)`;
    carousel.style.transition = 'transform 0.5s ease-in-out';

    // Enlarge the selected carousel item
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Function to handle navigation
  function navigateCarousel(direction) {
    if (direction === 'next') {
      currentIndex = (currentIndex + 1) % totalItems; // Loop to the start
    } else if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Loop to the end
    }
    updateCarousel();
  }

  // Event listeners for navigation buttons
  nextButton.addEventListener('click', (event) => {
    event.stopPropagation();
    setActiveCarousel(carouselIndex); // Set this carousel as active
    navigateCarousel('next');
  });

  prevButton.addEventListener('click', (event) => {
    event.stopPropagation();
    setActiveCarousel(carouselIndex); // Set this carousel as active
    navigateCarousel('prev');
  });

  // Keyboard navigation
  carouselContainer.addEventListener('keydown', (event) => {
    if (carouselIndex === activeCarouselIndex) {
      if (event.key === 'ArrowRight') {
        navigateCarousel('next');
      } else if (event.key === 'ArrowLeft') {
        navigateCarousel('prev');
      }
    }
  });

  // Initialize the carousel
  updateCarousel();

  // Add focus to make keyboard navigation work
  carouselContainer.setAttribute('tabindex', '0');

  // Focus event to make the carousel active
  carouselContainer.addEventListener('focus', () => setActiveCarousel(carouselIndex));
});

// Set the first carousel as active by default
setActiveCarousel(0);
