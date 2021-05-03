import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let carousel = document.createElement('div');
    this.elem = carousel;
    carousel.classList.add('carousel');

    let arrowPrev = document.createElement('div');
    arrowPrev.classList.add('carousel__arrow', 'carousel__arrow_left');
    arrowPrev.style.display = 'none';

    let arrowNext = document.createElement('div');
    arrowNext.classList.add('carousel__arrow', 'carousel__arrow_right');

    let carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');

    let arrowImgPrev = document.createElement('img');
    arrowImgPrev.src = '/assets/images/icons/angle-left-icon.svg';

    let arrowImgNext = document.createElement('img');
    arrowImgNext.src = '/assets/images/icons/angle-icon.svg';

    //append element
    arrowPrev.appendChild(arrowImgPrev);
    arrowNext.appendChild(arrowImgNext);
    carousel.appendChild(arrowNext);
    carousel.appendChild(arrowPrev);
    carousel.appendChild(carouselInner);

    for (slides of slides) {
      let slideItem = document.createElement('div');
      slideItem.classList.add('carousel__slide');
      slideItem.setAttribute('data-id', `${slides.id}`)
      let slideImg = document.createElement('img');
      slideImg.classList.add('carousel__img');
      slideImg.src = `/assets/images/carousel/${slides.image}`;
      let carouselCaption = document.createElement('div');
      carouselCaption.classList.add('carousel__caption');
      let slidePrice = document.createElement('span');
      slidePrice.classList.add('carousel__price');
      let fixedPrice = slides.price.toFixed(2);
      slidePrice.insertAdjacentHTML('beforeEnd', `€ ${fixedPrice}`);
      let slideTitle = document.createElement('span');
      slideTitle.classList.add('carousel__title');
      slideTitle.insertAdjacentHTML('beforeEnd', `${slides.name}`);
      let slideButton = document.createElement('button');
      slideButton.classList.add('carousel__button');
      let btnImg = document.createElement('img');
      btnImg.src = `/assets/images/icons/plus-icon.svg`;
      slideButton.appendChild(btnImg);

      carouselCaption.appendChild(slidePrice);
      carouselCaption.appendChild(slideTitle);
      carouselCaption.appendChild(slideButton);
      slideItem.appendChild(slideImg);
      slideItem.appendChild(carouselCaption);
      carouselInner.appendChild(slideItem);
    }



    this.elem.addEventListener('click', function(event) {
      if (event.target.closest('.carousel__button')) {
        let dataId = event.target.closest('.carousel__slide').dataset.id;
        carousel.dispatchEvent(
          new CustomEvent("product-add", {
            detail: dataId,
            bubbles: true
          })
        );
      }
    });

    this.elem.addEventListener('click', event => {
      this.slideScroll(event);
    });
    this.clideCount = 1;
    this.shift = 0;

  }
  slideScroll (event) {
    let btnNext = document.querySelector('.carousel__arrow_right');
    let btnPrev = document.querySelector('.carousel__arrow_left');
    let slideArr = document.querySelectorAll('.carousel__slide');
    let slide = document.querySelector('.carousel__inner');
    let slideWidth = slide.offsetWidth;


    if (event.target.closest('.carousel__arrow_right')) {
      this.shift -= slideWidth;
      this.clideCount++;
      slide.style.transform = `translateX(${this.shift}px)`;
    }
    if (event.target.closest('.carousel__arrow_left')) {
      this.shift += slideWidth;
      this.clideCount--;
      slide.style.transform = `translateX(${this.shift}px)`;
    }
    if (this.clideCount == slideArr.length) {
      btnNext.style.display = 'none';
    } else if (this.clideCount == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnNext.style.display = '';
      btnPrev.style.display = '';
    }
  }


}
