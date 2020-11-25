class Popup {
  #popup;
  #eventKeyup;

  #handleEscClose(e) {
    if (!e.target.classList.contains('input') && (e.key === 'Escape')) { 
      this.close(); 
    } 
  }

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  open() {
    this.#popup.classList.add('popup_opened');
    this.#eventKeyup = this.#handleEscClose.bind(this);
    document.addEventListener('keyup', this.#eventKeyup); //Узнать накапливается ли addEventListener при многократном вызове open
  }

  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this.#eventKeyup);
  }

  setEventListeners() {

  }
}