import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.elem = createElement(this.#template());
  }

  open() {
    document.body.classList.add('is-modal-open');

    this.elem.querySelector('.modal__close').addEventListener('click', this.#onCloseModal);
    document.body.addEventListener('keydown', this.#onCloseModalEsc);

    return document.body.append(this.elem);
  }

  #template() {
    return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
    </div>`;
  }

  setTitle(title) {
    return this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(content) {
    return this.elem.querySelector('.modal__body').append(content);
  }

  close() {
    this.#onCloseModal();
  }

  #onCloseModal = () => {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    document.body.removeEventListener('keydown', this.#onCloseModalEsc);
  }

  #onCloseModalEsc = (event) => {
    if (event.code === 'Escape') {
      this.#onCloseModal();
    }
  }
}
