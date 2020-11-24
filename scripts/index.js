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
const gForms = document.querySelectorAll('.popup'); 

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

// const templateCard = document.querySelector('#newCard').content;

// function clickButtonLike(e) {
//   e.target.classList.toggle('button-like_liked');
// }

// function clickButtonDelete(e) {
//   e.target.closest('.card').remove();
// }

// function previewImageCard(card, name, link) {
//   const img = card.querySelector('.card__image');

//   img.src = link;
//   img.alt = name;
//   img.addEventListener('click', loadFormPicture);
// }

// function getCard(name, link) {
//   const newCard = templateCard.cloneNode(true);

//   newCard.querySelector('.card__name').textContent = name;
//   newCard.querySelector('.button-like').addEventListener('click', clickButtonLike);
//   newCard.querySelector('.button-delete').addEventListener('click', clickButtonDelete);

//   previewImageCard(newCard, name, link);

//   return newCard;
// };

initialCards.forEach((card) => {
  // globalList.append(getCard(card.name, card.link));
  globalList.append(new Card(card.name, card.link, '#newCard').toHTML());
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
  clearError(globalPopupEdit, gConfig);
}

function loadFormAdd() {
  openPopup(globalPopupAdd);
  globalFormAdd.reset();
  clearError(globalPopupAdd, gConfig);
}

// function loadFormPicture(e) {
//   openPopup(globalPopupPicture);
  
//   globalImage.src = e.target.src;
//   globalImage.alt = e.target.alt;

//   const sourceCaption = e.target
//     .closest('.card')
//     .querySelector('.card__name');
  
//   globalCaption.textContent = sourceCaption.textContent;
// }

// Блок отправки данных -------------------------------------------------------
function submitFormAdd(form) {
  const inputBlock = getInputBlock();

  globalList.prepend(new Card(inputBlock.name.value, inputBlock.descr.value, '#newCard').toHTML());

  

  closePopup(form.closest('.popup'));
}

function submitFormEdit(form) {
  const inputBlock = getInputBlock();

  globalTitle.textContent = inputBlock.name.value;
  globalSubtitle.textContent = inputBlock.descr.value;

  closePopup(form.closest('.popup'));
}

// Блок инициализации контролов -----------------------------------------------
const buttonEdit = document.querySelector('.profile__button-edit');
buttonEdit.addEventListener('click', loadFormEdit);

const buttonAdd = document.querySelector('.profile__button-add');
buttonAdd.addEventListener('click', loadFormAdd);

// const buttonSubmitAdd = document.querySelector('.popup_type-form_add');
// buttonSubmitAdd.addEventListener('submit', submitFormAdd);

// const buttonSubmitEdit = document.querySelector('.popup_type-form_edit');
// buttonSubmitEdit.addEventListener('submit', submitFormEdit);

gForms.forEach(popup => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});



//import_highway_new_2