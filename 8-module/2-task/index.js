import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render () {
    this.elem = createElement(`<div class="products-grid"><div class="products-grid__inner"></div></div>)`);
    this.update(this.products);
  }

  update(products) {
    let container = this.elem.querySelector('.products-grid__inner');
    container.innerHTML = '';
    products.forEach(elem => {
      let card = new ProductCard(elem);
      container.append(card.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    let {noNuts = false, vegeterianOnly = false, maxSpiciness = 0, category = ''} = this.filters;

    let filteredProducts = this.products
    .filter(item => (noNuts ? noNuts == !item.nuts : item))
    .filter(item => (vegeterianOnly ? vegeterianOnly == item.vegeterian : item))
    .filter(item => (maxSpiciness ? item.spiciness <= maxSpiciness : item))
    .filter(item => (category ? category == item.category : item));

    this.update(filteredProducts);
  }
}