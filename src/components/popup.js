export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._eventKeyup = this._handleEscClose.bind(this);
    this._eventClick = this._handleClick.bind(this);
  }

  _handleEscClose(e) {
    if (!e.target.classList.contains("input") && e.key === "Escape") {
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
    document.removeEventListener("keyup", this._eventKeyup);
    this._popup.removeEventListener("click", this._eventClick);
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._eventClick);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keyup", this._eventKeyup); //Узнать накапливается ли addEventListener при многократном вызове open
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }
}
