import Popup from "./popup.js";

export default class PopupWithButton extends Popup {
  constructor(selector, textButton, submitForm) {
    super(selector);

    this._textButton = textButton;
    this._elementButton = this._popup.querySelector(".popup__button");

    this._submit = submitForm;
    this._handleClickSubmit = this._handleClickSubmit.bind(this);
  }

  _handleClickSubmit(e) {
    e.preventDefault();

    this._elementButton.textContent = this._textButton;

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
    this._elementCard = elementCard;
    this._cardId = cardId;

    super.open();
  }

  recovery(textButton) {
    this._elementButton.textContent = textButton;
  }

}
