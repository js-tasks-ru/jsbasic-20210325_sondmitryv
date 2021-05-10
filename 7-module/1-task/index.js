import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    let ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
    this.elem = ribbon;
    let menuScrollPrev = document.createElement('button');
    menuScrollPrev.classList.add('ribbon__arrow', 'ribbon__arrow_left');
    let ScrollPrevImg = document.createElement('img');
    ScrollPrevImg.src = `/assets/images/icons/angle-icon.svg`;
    menuScrollPrev.appendChild(ScrollPrevImg);
    ribbon.appendChild(menuScrollPrev);
    let navWrap = document.createElement('nav');
    navWrap.classList.add('ribbon__inner');

    for (let catItem of categories) {
      let categoryLink = document.createElement('a');
      categoryLink.classList.add('ribbon__item');
      categoryLink.setAttribute('data-id', `${catItem.id}`);
      categoryLink.insertAdjacentHTML('beforeEnd', `${catItem.name}`);
      navWrap.appendChild(categoryLink);
    }
    ribbon.appendChild(navWrap);

    let menuScrollNext = document.createElement('button');
    menuScrollNext.classList.add('ribbon__arrow', 'ribbon__arrow_right', 'ribbon__arrow_visible');
    let ScrollNextImg = document.createElement('img');
    ScrollNextImg.src = `/assets/images/icons/angle-icon.svg`;
    menuScrollNext.appendChild(ScrollNextImg);
    ribbon.appendChild(menuScrollNext);

    this.elem.addEventListener('click', this.slideMenu);

    this.elem.addEventListener('click', function(event) {
      if (event.target.closest('.ribbon__item')) {
        event.preventDefault();
        let categoryId = event.target.closest('.ribbon__item').dataset.id;
        ribbon.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: categoryId,
            bubbles: true
          })
        );
      }
    });
  }
  slideMenu(event) {
    let ribbonInner = document.querySelector('.ribbon__inner');
    let scrollLeft = ribbonInner.scrollLeft;
    let prevBtn = document.querySelector('.ribbon__arrow_left');
    let nextBtn = document.querySelector('.ribbon__arrow_right');
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    console.log(scrollLeft)
    console.log(scrollRight)
    if (scrollLeft == 0) {
      prevBtn.classList.remove('ribbon__arrow_visible');
    } else {
      prevBtn.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight <= 1) {
      nextBtn.classList.remove('ribbon__arrow_visible');
    } else {
      nextBtn.classList.add('ribbon__arrow_visible');
    }

    if (event.target.closest('.ribbon__arrow_right')) {
      ribbonInner.scrollBy(350, 0);
      //scrollLeft == 0 ? prevBtn.classList.remove('ribbon__arrow_visible') : prevBtn.classList.add('ribbon__arrow_visible');
    }
    if (event.target.closest('.ribbon__arrow_left')) {
      ribbonInner.scrollBy(-350, 0);
    }
  }


}
