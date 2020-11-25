const globalTitle = document.querySelector('.profile__title');
const globalSubtitle = document.querySelector('.profile__subtitle');
const globalImage = document.querySelector('.figure__image');
const globalCaption = document.querySelector('.figure__caption');
const globalList = document.querySelector('.elements__list');
const globalPopupAdd = document.querySelector('.popup_type-form_add');
const globalPopupEdit = document.querySelector('.popup_type-form_edit');
const globalPopupPicture = document.querySelector('.popup_type-form_picture');
const gBody = document.querySelector('.body'); 
const gPopups = document.querySelectorAll('.popup'); 
const gForms = Array.from(document.querySelectorAll('.popup__container'));

const gConfig = {
  formSelector: '.popup__container',
  inputSelector: '.input',
  submitButtonSelector: '.popup__button',
  buttonDisabledClass: 'button_disabled',
  inputErrorClass: 'input_failed'
};

const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

initialCards.forEach((card) => {
  globalList.append(new Card(card.name, card.link, '#newCard').toHTML());
});

gForms.forEach((form) => {
  new FormValidator(gConfig, form).enableValidation();   
});

function getInputBlock(){
  return {
    name: document.querySelector('.popup_opened .popup__input-name'),
    descr: document.querySelector('.popup_opened .popup__input-descr')
  }
}

// Блок функций, обслуживающих карточку ---------------------------------------
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  gBody.removeEventListener('keyup', pressEsc); 

  if (popup.classList.contains('popup_type-form_add') || popup.classList.contains('popup_type-form_edit')) {
    popup.querySelector('.popup__container').reset();
  }
}

function pressEsc(e) { 
  if (!e.target.classList.contains('input') && (e.key === 'Escape')) { 
    const popup = e.target.closest('.popup_opened') || document.querySelector('.popup_opened');
    closePopup(popup); 
  } 
} 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  gBody.addEventListener('keyup', pressEsc);
}

function loadFormEdit() {
  openPopup(globalPopupEdit);

  const inputBlock = getInputBlock();

  inputBlock.name.value = globalTitle.textContent;
  inputBlock.descr.value = globalSubtitle.textContent;
}

function loadFormAdd() {
  openPopup(globalPopupAdd);
}

function loadFormPicture(alt, src) {
  openPopup(globalPopupPicture);
  
  globalImage.src = src;
  globalImage.alt = alt;
  globalCaption.textContent = alt;
}

// Блок отправки данных -------------------------------------------------------
function submitFormAdd(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();
  
  globalList.prepend(new Card(inputBlock.name.value, inputBlock.descr.value, '#newCard').toHTML());

  closePopup(globalPopupAdd);
}

function submitFormEdit(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  globalTitle.textContent = inputBlock.name.value;
  globalSubtitle.textContent = inputBlock.descr.value;

  closePopup(globalPopupEdit);
}

// Блок инициализации контролов -----------------------------------------------
const buttonEdit = document.querySelector('.profile__button-edit');
buttonEdit.addEventListener('click', loadFormEdit);

const buttonAdd = document.querySelector('.profile__button-add');
buttonAdd.addEventListener('click', loadFormAdd);

const buttonSubmitAdd = document.querySelector('.popup_type-form_add');
buttonSubmitAdd.addEventListener('submit', submitFormAdd);

const buttonSubmitEdit = document.querySelector('.popup_type-form_edit');
buttonSubmitEdit.addEventListener('submit', submitFormEdit);

gPopups.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});
