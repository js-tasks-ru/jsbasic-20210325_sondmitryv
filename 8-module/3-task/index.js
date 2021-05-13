export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    const goods = {
      product: {},
      count: 1
    };

    const inCart = this.cartItems.find(item => item.product.id == product.id);

    if (!inCart) {
      Object.assign(goods.product, product);
      this.cartItems.push(goods);
    }
    else {
      inCart.count++;
    }

    this.onProductUpdate(inCart);
  }

  updateProductCount(productId, amount) {
    const inCart = this.cartItems.find(item => item.product.id == productId);
    const index = this.cartItems.findIndex(item => item.product.id == productId);

    inCart.count += amount;

    if (inCart.count == 0) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(inCart);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach(elem => totalCount += elem.count);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(elem => totalPrice += (elem.product.price * elem.count));
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}