import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  slides = [];

  constructor(slides) {
    this.slides = slides;

    this.elem = this.#render();
  }

  #template() { 
    return `<div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
      ${this.slides.map(slide => `<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`)
    .join('')}
    </div>`;
  }

  #render() {
    this.elem = createElement(this.#template());

    const carouselButtons = Array.from(this.elem.querySelectorAll('.carousel__button'));
    carouselButtons.map(button => button.addEventListener('click', this.#onPlusClick));

    this.#initCarousel();

    return this.elem;
  }

  #onPlusClick = (event) => {
    const slide = event.currentTarget.closest('.carousel__slide').dataset;

    const customEvent = new CustomEvent('product-add', { 
      detail: slide.id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

  #initCarousel() {
    const carousel = this.elem.querySelector('.carousel__inner');
    const carouselCountSlides = this.elem.querySelectorAll('.carousel__slide');
    const currentCountSlides = Array.from(carouselCountSlides).length - 1;
    const carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    const carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselSumWidth = carousel.offsetWidth;
    let slide = 1;

    carouselArrowLeft.style.display = 'none';

    carouselArrowRight.addEventListener('click', () => {
      carouselSumWidth = carousel.offsetWidth * slide;
      carousel.style.transform = `translateX(${-carouselSumWidth}px)`;
      slide++;

      if (slide > currentCountSlides) {
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
}
