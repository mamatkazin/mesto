import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);

    this._elementForm = this._popup.querySelector(".popup__container");
    this._inputs = {};

    this._popup.querySelectorAll(".input").forEach((input) => {
      this._inputs[input.name] = input;
    });

    this._submit = submitForm;
    this._handleClickSubmit = this._handleClickSubmit.bind(this);

    this._inputEvent = new Event("input");
  }

  _getInputValues() {
    this._formValues = {};

    Object.keys(this._inputs).forEach((key) => {
      this._formValues[key] = this._inputs[key].value;
    });

    return this._formValues;
  }

  _handleClickSubmit(e) {
    e.preventDefault();
    this._submit(this._getInputValues());
  }

  _removeEventListeners() {
    this._popup.removeEventListener("submit", this._handleClickSubmit);
    super._removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleClickSubmit);
    super.setEventListeners();
  }

  setInputValues(formValues) {
    Object.keys(formValues).forEach((key) => {
      this._inputs[key].value = formValues[key];
      this._inputs[key].dispatchEvent(this._inputEvent);
    });
  }

  close() {
    this._elementForm.reset();
    super.close();
  }
}
