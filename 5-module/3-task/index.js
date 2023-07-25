function initCarousel() {
  // ваш код...
  const carousel = document.querySelector('.carousel__inner');
  const carouselArrowRight = document.querySelector('.carousel__arrow_right');
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselSumWidth = carousel.offsetWidth;
  let slide = 1;

  carouselArrowLeft.style.display = 'none';

  carouselArrowRight.addEventListener('click', () => {
    carouselSumWidth = carousel.offsetWidth * slide;
    carousel.style.transform = `translateX(${-carouselSumWidth}px)`;
    slide++;

    if (slide > 3) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowRight.style.display = '';
      carouselArrowLeft.style.display = '';
    }
  });

  carouselArrowLeft.addEventListener('click', () => {
    carouselSumWidth = carouselSumWidth - carousel.offsetWidth;
    carousel.style.transform = `translateX(${-carouselSumWidth}px)`;
    slide--;

    if (slide === 1) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
  });
}
