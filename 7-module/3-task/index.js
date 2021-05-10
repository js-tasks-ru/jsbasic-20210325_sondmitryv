import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this._elem = this.render(this.steps(this._steps, this._value));

    this.elem.addEventListener('click', this._onChange);
  }

  render(steps) {
    return createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${steps}
        </div>
      </div>
    `);
  }

  steps(steps, value) {
    let html = '';
    for (let i = 0; i < steps; i++) {
      html += (i === value) ? '<span class="slider__step-active"></span>' : '<span></span>';
    }
    return html;
  }

  _onChange = (event) => {
    this._value = this._approximateValue(event);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true
    }));

    const valueSlider = this.elem.querySelector('.slider__value');
    valueSlider.innerHTML = this._value;

    const activeStep = this.elem.querySelector('.slider__step-active');
    activeStep.classList.remove('slider__step-active');

    const spans = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    spans[this._value].classList.add('slider__step-active');

    const valuePercent = this._value / (this._steps - 1) * 100;
    this._changeProgress(valuePercent);
  }

  _approximateValue = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this._steps - 1;
    let value = leftRelative * segments;
    return Math.round(value);
  }

  _changeProgress = (percent) => {
    const slider = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    if (!progress || !slider) return;

    slider.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
  }

  get elem() {
    return this._elem;
  }

}