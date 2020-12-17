import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);

    this._elementForm = this._popup.querySelector(".popup__container");
    this._elementName = this._popup.querySelector(".popup__input-name");
    this._elementUrl = this._popup.querySelector(".popup__input-descr");

    this._submit = submitForm;
    this._eventSubmit = this._handleClickSubmit.bind(this);
  }

  _getInputValues() {
    this._src = this._elementUrl.value;
    this._alt = this._elementName.value;
  }

  _handleClickSubmit(e) {
    e.preventDefault();
    this._getInputValues();
    this._submit(this._src, this._alt);
  }

  _removeEventListeners() {
    this._popup.removeEventListener("submit", this._eventSubmit);
    super._removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._eventSubmit);
    super.setEventListeners();
  }

  setInputValues(title, subTitle) {
    this._elementUrl.value = subTitle;
    this._elementName.value = title;
  }

  close() {
    this._elementForm.reset();
    super.close();
  }
}
