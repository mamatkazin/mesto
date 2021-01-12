export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;

    this._inputList = form.querySelectorAll(config.inputSelector);
    this._submitButton = form.querySelector(config.submitButtonSelector);
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
  }

  _resetForm() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _setButtonDisable(disabled) {
    if (disabled) {
      this._submitButton.classList.add(this._config.buttonDisabledClass);
      this._submitButton.classList.remove(this._config.buttonThemeDarkClass);
      this._submitButton.classList.add(this._config.buttonThemeLightClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.buttonDisabledClass);
      this._submitButton.classList.remove(this._config.buttonThemeLightClass);
      this._submitButton.classList.add(this._config.buttonThemeDarkClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListenerInputs() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._setButtonDisable(!this._form.checkValidity());
      });
    });
  }

  _setEventListenerForm() {
    this._form.addEventListener("submit", () => {
      this._setButtonDisable(true);
    });

    this._form.addEventListener("reset", () => {
      this._resetForm();
      this._setButtonDisable(true);
    });
  }

  enableValidation() {
    this._setButtonDisable(!this._form.checkValidity());
    this._setEventListenerForm();
    this._setEventListenerInputs();
  }
}
