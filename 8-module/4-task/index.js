import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    this.layoutCart = createElement(`<div></div>`);
    this.cartItems.forEach(elem => this.layoutCart.append(this.renderProduct(elem.product, elem.count)));
    this.layoutCart.append(this.renderOrderForm());
    this.modal.setBody(this.layoutCart);
    this.modal.open();

    let cartProducts = this.modal.modal.querySelectorAll('.cart-product');

    cartProducts.forEach(elem => elem.addEventListener('click', (event) => {

      if (event.target.closest('.cart-counter__button_minus')) {
        this.updateProductCount(event.currentTarget.dataset.productId, -1);
      }

      if (event.target.closest('.cart-counter__button_plus')) {
        console.log('lol')
        this.updateProductCount(event.currentTarget.dataset.productId, +1);
      }
    }));

    this.cartForm = this.modal.modal.querySelector('.cart-form');

    this.cartForm.addEventListener('submit', (event) => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = this.modal.modal;
      let productId = cartItem.product.id;
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count > 0) {
        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      }

      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault()
    this.modal.modal.querySelector('[type="submit"]').classList.add('is-loading');

    let formData = new FormData(this.cartForm);

    await fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST',
    });

    this.modal.setTitle('Success!');
    this.modal.setBody(createElement(this.modalFormSended()));
    this.cartItems = [];
    this.cartIcon.update(this);
  }

  modalFormSended() {
    return `
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}