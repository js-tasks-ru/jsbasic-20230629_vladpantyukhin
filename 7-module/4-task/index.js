import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps - 1;
    this.value = value;
    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());
    this.#preparationSlider();
    this.elem.addEventListener('click', this.#onClickSlider);
    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', this.#onPointerDown);
    return this.elem;
  }

  #template() {
    return `
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        <span class="slider__step-active"></span>
        ${`<span></span>`.repeat(this.steps)}
      </div>
    </div>
    `;
  }

  #onClickSlider = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    sliderValue.textContent = value;

    this.#updateActiveStep(value);

    const customEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }

  #updateActiveStep(value) {
    const prevActiveStep = this.elem.querySelector('.slider__step-active');
    if (prevActiveStep) {
      prevActiveStep.classList.remove('slider__step-active');
    }

    const activeStep = this.elem.querySelector(`.slider__steps span:nth-child(${value + 1})`);
    if (activeStep) {
      activeStep.classList.add('slider__step-active');
    }
  }

  #preparationSlider() {
    let valuePercents = this.value / this.steps * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
  }

  #onPointerDown = (event) => {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    let thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;

    thumb.addEventListener('pointermove', this.#onPointerMove);
  }

  #onPointerMove = (event) => {
    event.preventDefault();
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let leftPercents = leftRelative * 100;
    let segments = this.steps;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    sliderValue.textContent = value;
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    thumb.addEventListener('pointerup', this.#onPointerUp);

    this.#updateActiveStep(value);
  }

  #onPointerUp = (event) => {
    event.preventDefault();
    this.elem.classList.remove('slider_dragging');

    let thumb = this.elem.querySelector('.slider__thumb');
    let sliderValue = this.elem.querySelector('.slider__value').textContent;
    let value = parseInt(sliderValue, 10) || 0;

    thumb.removeEventListener('pointermove', this.#onPointerMove);

    const customEvent = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }
}
