export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleClick(e) {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }

  _removeEventListeners() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleClick);
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClick);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }
}
