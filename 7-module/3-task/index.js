import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  steps = 0;
  value = 0;

  constructor({ steps, value = 0 }) {
    this.steps = steps - 1;
    this.value = value;

    this.elem = this.#render();
  }

  #render() {
    this.elem = createElement(this.#template());

    this.#preparationSlider();

    this.elem.addEventListener('click', this.#onClickSlider);

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
    let leftPercents = valuePercents;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    sliderValue.textContent = value;

    const customEvent = new CustomEvent('slider-change', {
      detail: value, 
      bubbles: true 
    });

    this.#updateActiveStep(value);

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
    let segments = this.steps;
    let value = Math.round(this.value);
    let valuePercents = value / segments * 100;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let leftPercents = valuePercents;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
  }
}
