


import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.render();
    this.body = document.querySelector('body');

    this.modal.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.escClose);
  }

  render() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);
  }

  escClose = (event) =>{
    if (event.code === 'Escape') this.close();
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(body) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.append(body);
  }

  open = () => {
    this.body.classList.add('is-modal-open');
    this.body.append(this.modal);
  }

  close = () => {
    this.body.classList.remove('is-modal-open');
    this.modal.remove();
    document.removeEventListener('keydown', this.escClose);
  }


}