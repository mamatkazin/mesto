export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._eventKeyup = this._handleEscClose.bind(this);
    this._eventClick = this._handleClick.bind(this);
  }

  _configPopup = {
    classPopup: "popup",
    classPopupClose: "popup__close",
    classPopupOpened: "popup_opened",
  };

  _handleEscClose(e) {
    if (!e.target.classList.contains("input") && e.key === "Escape") {
      this.close();
    }
  }

  _handleClick(e) {
    if (
      e.target.classList.contains(this._configPopup.classPopup) ||
      e.target.classList.contains(this._configPopup.classPopupClose)
    ) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener("click", this._eventClick);
  }

  _removeEventListeners() {
    document.removeEventListener("keyup", this._eventKeyup);
    this._popup.removeEventListener("click", this._eventClick);
  }

  open() {
    this._popup.classList.add(this._configPopup.classPopupOpened);
    document.addEventListener("keyup", this._eventKeyup); //Узнать накапливается ли addEventListener при многократном вызове open
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._configPopup.classPopupOpened);
    this._removeEventListeners();
  }
}
