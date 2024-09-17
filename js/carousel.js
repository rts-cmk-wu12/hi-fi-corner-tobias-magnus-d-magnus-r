const prevButton = document.querySelector('.carousel__button--previous');
const nextButton = document.querySelector('.carousel__button--next');
const carouselTrack = document.querySelector('.carousel__track');

// Fetch product data from the JSON server
fetch('http://localhost:3000/products')
  .then((response) => response.json())
  .then((products) => {
    // Select 3 random products
    const randomProducts = [];
    while (randomProducts.length < 3) {
      const randomIndex = Math.floor(Math.random() * products.length);
      if (!randomProducts.includes(products[randomIndex])) {
        randomProducts.push(products[randomIndex]);
      }
    }

    // Create carousel items
    randomProducts.forEach((product) => {
      const carouselItem = document.createElement('li');
      carouselItem.classList.add('carousel__item');

      const img = document.createElement('img');
      img.src = product.imageSrc;
      img.alt = product.name;
      img.classList.add('carousel__image');

      const textContainer = document.createElement('div');
      textContainer.classList.add('carousel__textcontainer');

      const title = document.createElement('h2');
      title.classList.add('carousel__product-title');
      title.textContent = product.name;

      textContainer.appendChild(title);
      carouselItem.appendChild(img);
      carouselItem.appendChild(textContainer);
      carouselTrack.appendChild(carouselItem);
    });

    // Initialize carousel
    const carouselSlides = Array.from(carouselTrack.children);
    const slideWidth = carouselSlides[0].offsetWidth;
    let currentSlide = 0;

    nextButton.addEventListener('click', () => {
      if (currentSlide < carouselSlides.length - 1) {
        currentSlide++;
        carouselTrack.style.transform = `translateX(-${
          slideWidth * currentSlide
        }px)`;
      }
    });

    prevButton.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        carouselTrack.style.transform = `translateX(-${
          slideWidth * currentSlide
        }px)`;
      }
    });
  })
  .catch((error) => console.error('Error fetching products:', error));
