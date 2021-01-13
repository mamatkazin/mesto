import Popup from "./popup.js";

export default class PopupWithButton extends Popup {
  constructor(selector, submitForm) {
    super(selector);

    this._elementButton = this._popup.querySelector(".popup__button");

    this._submit = submitForm;
    this._handleClickSubmit = this._handleClickSubmit.bind(this);
  }

  _handleClickSubmit(e) {
    e.preventDefault();

    this._elementButton.textContent = "Удаление...";

    this._submit(this._elementCard, this._cardId);
  }

  _removeEventListeners() {
    this._popup.removeEventListener("submit", this._handleClickSubmit);
    super._removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleClickSubmit);
    super.setEventListeners();
  }

  open(elementCard, cardId) {
    this._elementButton.textContent = "Да";
    this._elementCard = elementCard;
    this._cardId = cardId;

    super.open();
  }

}
