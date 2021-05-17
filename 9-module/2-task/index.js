import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.сartIcon = new CartIcon();

    document.querySelector("[data-carousel-holder]").append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.сartIcon.elem);

    this.products = await this.getProducts();
    this.productGrid = this.renderProductsGrid();

    this.productAdd(this.сartIcon);
    this.updateFilter(this.productGrid);
  }

  productAdd(сartIcon) {
    let cart = new Cart(сartIcon);
    document.body.addEventListener("product-add", ({detail: id}) => {
      let item = this.products.find(item => item.id == id);
      cart.addProduct(item);
    });
  }

  updateFilter(productGrid) {
    productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.stepSlider.elem.addEventListener("slider-change", ({detail: maxSpiciness}) => {
      productGrid.updateFilter({maxSpiciness: maxSpiciness});
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", ({detail: categoryId}) => {
      productGrid.updateFilter({category: categoryId});
    });

    document.getElementById("nuts-checkbox").onchange = e => {
      productGrid.updateFilter({noNuts: e.target.checked});
    };

    document.getElementById("vegeterian-checkbox").onchange = e => {
      productGrid.updateFilter({vegeterianOnly: e.target.checked});
    };
  }

  async getProducts() {
    let res = await fetch("products.json");
    return await res.json();
  }

  renderProductsGrid() {
    let productGrid = new ProductsGrid(this.products);
    document.querySelector('[data-products-grid-holder]').innerHTML = "";
    document.querySelector('[data-products-grid-holder]').append(productGrid.elem);
    return productGrid;
  }

}
