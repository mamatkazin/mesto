function showError(form, input, config) {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = input.validationMessage;
  // error.classList.add(config.errorInvalidClass);
  input.classList.add(config.inputErrorClass);
}

function hideError(form, input, config) {
  const error = form.querySelector(`#${input.name}-error`);
  error.textContent = '';
  // error.classList.remove(config.errorInvalidClass);
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
      showError(form, input, config);
  } else {
      hideError(form, input, config);
  }
}

function setButtonDisable(buttonElement, disabled, config) {
  if (disabled) {
    buttonElement.classList.add(config.buttonDisabledClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.buttonDisabledClass);
    buttonElement.disabled = false;
  }
};

function setEventListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  setButtonDisable(submitButton, !form.checkValidity(), config);

  inputList.forEach((input) => {
      input.addEventListener('input', () => {
          checkInputValidity(form, input, config);
          setButtonDisable(submitButton, !form.checkValidity(), config);
      });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}

enableValidation(config);