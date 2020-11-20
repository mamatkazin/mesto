// Блок глобальных переменных -------------------------------------------------
const globalTitle = document.querySelector('.profile__title');
const globalSubtitle = document.querySelector('.profile__subtitle');
const globalImage = document.querySelector('.figure__image');
const globalCaption = document.querySelector('.figure__caption');
const globalList = document.querySelector('.elements__list');
const globalPopupAdd = document.querySelector('.popup_type-form_add');
const globalPopupEdit = document.querySelector('.popup_type-form_edit');
const globalPopupPicture = document.querySelector('.popup_type-form_picture');
const globalFormAdd = document.querySelector('form[name="form-add"]');
const gBody = document.querySelector('.body'); 

const config = {
  formSelector: '.popup__container',
  inputSelector: '.input',
  submitButtonSelector: '.popup__button',
  buttonDisabledClass: 'button_disabled',
  inputErrorClass: 'input_failed'
};

function getInputBlock(){
  return {
    name: document.querySelector('.popup_opened .popup__input-name'),
    descr: document.querySelector('.popup_opened .popup__input-descr')
  }
}

function clearError(popup){
  const inputList = popup.querySelectorAll(config.inputSelector);
  const submitButton = popup.querySelector(config.submitButtonSelector);

  setButtonDisable(submitButton, true, config);

  inputList.forEach((input) => {
    hideError(popup, input, config)
  });
}

// Блок функций, обслуживающих карточку ---------------------------------------
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', clickOverlay);
  gBody.removeEventListener('keyup', pressEsc); 
  
}

function clickOverlay(e) {
  if (!e.target.closest('.popup__form')) {
    const popup = e.target.closest('.popup_opened') || document.querySelector('.popup_opened');

    closePopup(popup);
  }
}

function pressEsc(e) { 
  if (!e.target.classList.contains('input') && (e.key === 'Escape')) { 
    const popup = e.target.closest('.popup_opened') || document.querySelector('.popup_opened');
    closePopup(popup); 
  } 
} 

// Блок загрузки форм ---------------------------------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', clickOverlay);
  gBody.addEventListener('keyup', pressEsc);
   
}

function setInputValue(name = '', descr = '') {
  const inputBlock = getInputBlock();

  inputBlock.name.value = name;
  inputBlock.descr.value = descr;
}

function loadFormEdit() {
  openPopup(globalPopupEdit);
  setInputValue(globalTitle.textContent, globalSubtitle.textContent);
  clearError(globalPopupEdit);
}

function loadFormAdd() {
  openPopup(globalPopupAdd);
  globalFormAdd.reset();
  clearError(globalPopupAdd);
}

function loadFormPicture(e) {
  openPopup(globalPopupPicture);
  
  globalImage.src = e.target.src;
  globalImage.alt = e.target.alt;

  const sourceCaption = e.target
    .closest('.card')
    .querySelector('.card__name');
  
  globalCaption.textContent = sourceCaption.textContent;
}

// Блок отправки данных -------------------------------------------------------
function submitFormAdd(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  globalList.prepend(createCard(inputBlock.name.value, inputBlock.descr.value));

  closePopup(globalPopupAdd);
}

function submitFormEdit(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  globalTitle.textContent = inputBlock.name.value;
  globalSubtitle.textContent = inputBlock.descr.value;

  closePopup(globalPopupEdit);
}

// Блок закрытия форм ---------------------------------------------------------
function clickButtonCloseEdit() {
    closePopup(globalPopupEdit);
};

function clickButtonCloseAdd() {
  closePopup(globalPopupAdd);
};

function clickButtonClosePicture() {
  closePopup(globalPopupPicture);
};

// Блок инициализации контролов -----------------------------------------------
const buttonEdit = document.querySelector('.profile__button-edit');
buttonEdit.addEventListener('click', loadFormEdit);

const buttonAdd = document.querySelector('.profile__button-add');
buttonAdd.addEventListener('click', loadFormAdd);

const buttonSubmitAdd = document.querySelector('.popup_type-form_add');
buttonSubmitAdd.addEventListener('submit', submitFormAdd);

const buttonSubmitEdit = document.querySelector('.popup_type-form_edit');
buttonSubmitEdit.addEventListener('submit', submitFormEdit);

const buttonCloseEdit = document.querySelector('.popup__close_type_edit');
buttonCloseEdit.addEventListener('click', clickButtonCloseEdit);

const buttonCloseAdd = document.querySelector('.popup__close_type_add');
buttonCloseAdd.addEventListener('click', clickButtonCloseAdd);

const buttonClosePucture = document.querySelector('.popup__close_type_picture');
buttonClosePucture.addEventListener('click', clickButtonClosePicture);

