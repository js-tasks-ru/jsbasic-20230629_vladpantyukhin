import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;

  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.#render();
  }

  #render() {
    return createElement(this.#template());
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
          ${this.products
            .filter(product => this.#isMatchingFilters(product))
            .map(product => {
              const productCard = new ProductCard(product);
              return productCard.elem.outerHTML;
            })
            .join('')}
        </div>
      </div>
    `;
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };

    this.elem.querySelector('.products-grid__inner').innerHTML = this.products
      .filter(product => this.#isMatchingFilters(product))
      .map(product => {
        const productCard = new ProductCard(product);
        return productCard.elem.outerHTML;
      })
      .join('');
  }

  #isMatchingFilters(product) {
    if (this.filters.noNuts && product.nuts === true) {
      return;
    }

    if (this.filters.vegeterianOnly && !product.vegeterian) {
      return;
    }

    if (this.filters.maxSpiciness && (product.spiciness > this.filters.maxSpiciness)) {
      return;
    }

    if (this.filters.category && (this.filters.category !== product.category)) {
      return;
    }

    return true;
  }
}
