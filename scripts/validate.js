class FormValidator {
  #config;

  #showError(form, input) {
    const error = form.querySelector(`#${input.name}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this.#config.inputErrorClass);
  }
  
  #hideError(form, input) {
    const error = form.querySelector(`#${input.name}-error`);
    error.textContent = '';
    input.classList.remove(this.#config.inputErrorClass);
  }

  #checkInputValidity(form, input) {
    if (!input.validity.valid) {
      this.#showError(form, input);
    } else {
      this.#hideError(form, input);
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

  #setEventListenerInputs(form) {
    const inputList = form.querySelectorAll(this.#config.inputSelector);
    const submitButton = form.querySelector(this.#config.submitButtonSelector);
  
    this.#setButtonDisable(submitButton, !form.checkValidity());
  
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.#checkInputValidity(form, input);
        this.#setButtonDisable(submitButton, !form.checkValidity());
      });
    });
  }

  #setEventListenerForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      this.#setButtonDisable(e.submitter, true);
    });
  }

  constructor(config) {
    this.#config = config
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.#config.formSelector));
  
    formList.forEach((form) => {
      this.#setEventListenerForm(form);    
      this.#setEventListenerInputs(form);    
    });
  }
}

// function showError(form, input, config) {
//   const error = form.querySelector(`#${input.name}-error`);
//   error.textContent = input.validationMessage;
//   // error.classList.add(config.errorInvalidClass);
//   input.classList.add(config.inputErrorClass);
// }

// function hideError(form, input, config) {
//   const error = form.querySelector(`#${input.name}-error`);
//   error.textContent = '';
//   // error.classList.remove(config.errorInvalidClass);
//   input.classList.remove(config.inputErrorClass);
// }

function clearError(form, config){
  const inputList = form.querySelectorAll(config.inputSelector);

  inputList.forEach((input) => {
    hideError(form, input, config)
  });
}

// function checkInputValidity(form, input, config) {
//   if (!input.validity.valid) {
//       showError(form, input, config);
//   } else {
//       hideError(form, input, config);
//   }
// }

// function setButtonDisable(buttonElement, disabled, config) {
//   if (disabled) {
//     buttonElement.classList.add(config.buttonDisabledClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(config.buttonDisabledClass);
//     buttonElement.disabled = false;
//   }
// };

// function setEventListeners(form, config) {
//   const inputList = form.querySelectorAll(config.inputSelector);
//   const submitButton = form.querySelector(config.submitButtonSelector);

//   setButtonDisable(submitButton, !form.checkValidity(), config);

//   inputList.forEach((input) => {
//       input.addEventListener('input', () => {
//           checkInputValidity(form, input, config);
//           setButtonDisable(submitButton, !form.checkValidity(), config);
//       });
//   });
// }

// function enableValidation(config) {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   formList.forEach((form) => {
//     form.addEventListener('submit', (e) => {
//       e.preventDefault();

//       setButtonDisable(e.submitter, true, config);

//       if (e.submitter.classList.contains('popup__button_type_add')) {
//         submitFormAdd(form);
//       } else if (e.submitter.classList.contains('popup__button_type_edit')) {
//         submitFormEdit(form);
//       }
//   });

//   setEventListeners(form, config);    
//   });
// }

// enableValidation(gConfig);

new FormValidator(gConfig).enableValidation();