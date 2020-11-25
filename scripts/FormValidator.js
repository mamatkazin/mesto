class FormValidator {
  #config;
  #form;

  #showError(input) {
    const error = this.#form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this.#config.inputErrorClass);
  }
  
  #hideError(input) {
    const error = this.#form.querySelector(`#${input.name}-error`);
    error.textContent = '';
    input.classList.remove(this.#config.inputErrorClass);
  }

  #resetForm(){
    const inputList = this.#form.querySelectorAll(this.#config.inputSelector);
  
    inputList.forEach((input) => {
      this.#hideError(input)
    });
  }

  #checkInputValidity(input) {
    if (!input.validity.valid) {
      this.#showError(input);
    } else {
      this.#hideError(input);
    }
  }

  #setButtonDisable(buttonElement, disabled) {
    if (disabled) {
      buttonElement.classList.add(this.#config.buttonDisabledClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.#config.buttonDisabledClass);
      buttonElement.disabled = false;
    }
  }

  #setEventListenerInputs() {
    const inputList = this.#form.querySelectorAll(this.#config.inputSelector);
    const submitButton = this.#form.querySelector(this.#config.submitButtonSelector);
  
    this.#setButtonDisable(submitButton, !this.#form.checkValidity());
  
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(input);
        this.#setButtonDisable(submitButton, !this.#form.checkValidity());
      });
    });
  }

  #setEventListenerForm() {
    this.#form.addEventListener('submit', (e) => {
      this.#setButtonDisable(e.submitter, true);
    });

    this.#form.addEventListener('reset', (e) => {
      this.#resetForm();
    });
  }

  constructor(config, form) {
    this.#config = config;
    this.#form = form;
  }

  enableValidation() {
    this.#setEventListenerForm(this.#form);    
    this.#setEventListenerInputs(this.#form);    
  }
}

