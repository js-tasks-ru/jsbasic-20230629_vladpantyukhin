export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find(item => item.product.id == product.id);

      if (cartItem) {
        cartItem.count += 1;
      } else {
        cartItem = {product, count: 1};
        this.cartItems.push(cartItem);
      }

      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);

    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count == 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id != productId);
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((startCount, product) => startCount + product.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((startTotalPrice, newProduct) =>
      startTotalPrice + (newProduct.product.price * newProduct.count), 0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

