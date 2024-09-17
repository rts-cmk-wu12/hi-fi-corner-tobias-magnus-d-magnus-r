const prevButton = document.querySelector('.carousel__button--previous');
const nextButton = document.querySelector('.carousel__button--next');
const carouselTrack = document.querySelector('.carousel__track');
const carouselSlides = Array.from(carouselTrack.children);

const trackWidth = carouselTrack.offsetWidth;
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
