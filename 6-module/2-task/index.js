import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    let card = document.createElement('div');
    this.elem = card;

    card.classList.add('card');
    let cardTop = document.createElement('div');
    cardTop.classList.add('card__top');
    card.appendChild(cardTop);

    let cardImg = document.createElement('img');
    cardImg.src = `/assets/images/products/${product.image}`;
    cardImg.classList.add('card__image');
    cardTop.appendChild(cardImg);

    let productPrice = document.createElement('span');
    productPrice.classList.add('card__price');
    let fixedPrice = product.price.toFixed(2);
    productPrice.insertAdjacentHTML('beforeEnd', `€${fixedPrice}`);
    cardTop.appendChild(productPrice);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    card.appendChild(cardBody);

    let cardTitle = document.createElement('div');
    cardTitle.classList.add('card__title');
    cardTitle.insertAdjacentHTML('beforeEnd', `${product.name}`);

    let cardBtn = document.createElement('button');
    cardBtn.classList.add('card__button');
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBtn);

    let btnImg = document.createElement('img');
    btnImg.src = `/assets/images/icons/plus-icon.svg`;
    cardBtn.appendChild(btnImg);
    this.elem.addEventListener('click', function(event) {
      if (event.target.closest('.card__button')) {
        card.dispatchEvent(
          new CustomEvent("product-add", {
            detail: product.id,
            bubbles: true
          })
        );
      }
    });
  }
}


