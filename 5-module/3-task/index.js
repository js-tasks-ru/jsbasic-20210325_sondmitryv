function initCarousel() {
  let btnNext = document.querySelector('.carousel__arrow_right');
  let btnPrev = document.querySelector('.carousel__arrow_left');
  let slide = document.querySelector('.carousel__inner');
  let slideArr = document.querySelectorAll('.carousel__slide');
  let clideCount = 1;
  let shift = 0;
  visibleArrow();
  let slideWidth = slide.offsetWidth;
  btnNext.addEventListener('click', (event) => {
    shift -= slideWidth;
    clideCount++;
    slide.style.transform = `translateX(${shift}px)`;
    visibleArrow();
  });
  btnPrev.addEventListener('click', (event) => {
    shift += slideWidth;
    clideCount--;
    slide.style.transform = `translateX(${shift}px)`;
    visibleArrow();
  });

  function visibleArrow() {
    if (clideCount == slideArr.length) {
      btnNext.style.display = 'none';
    } else if (clideCount == 1) {
      btnPrev.style.display = 'none';
    } else {
      btnNext.style.display = '';
      btnPrev.style.display = '';
    }
  }

}
