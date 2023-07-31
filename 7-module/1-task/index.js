import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;
  categories = [];
  currentActiveCategory = null;

  constructor(categories) {
    this.categories = categories;
    this.currentActiveCategory = null;

    this.elem = this.#render();
  }

  #template() { 
    return `<div class='ribbon'>
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class='ribbon__inner'>
        ${this.categories.map(({ id, name }) => `
          <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
        `)  
        .join('')}
      </nav>
    </div>`;
  }

  #render() {
    this.elem = createElement(this.#template());

    const ribbonItems = Array.from(this.elem.querySelectorAll('.ribbon__item'));
    ribbonItems.map(category => category.addEventListener('click', this.#onSelectCategory));

    this.#initScroll();

    return this.elem;
  }

  #initScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonArrowRight.addEventListener('click', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
    
      ribbonInner.scrollBy(350, 0);

      ribbonArrowLeft.classList.add('ribbon__arrow_visible');

      scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollRight <= 0) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } 
    });

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);

      let scrollLeft = ribbonInner.scrollLeft;

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  #onSelectCategory = (event) => {
    event.preventDefault();
    const categoryTarget = event.target;
    const category = categoryTarget.dataset;

    if (this.currentActiveCategory) {
      this.currentActiveCategory.classList.remove('ribbon__item_active');
    }
    
    categoryTarget.classList.add('ribbon__item_active');
    this.currentActiveCategory = categoryTarget;

    const customEvent = new CustomEvent('ribbon-select', { 
      detail: category.id,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);
  }
}
