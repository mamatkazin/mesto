// Блок глобальных переменных -------------------------------------------------
const globalTitle = document.querySelector('.profile__title');
const globalSubtitle = document.querySelector('.profile__subtitle');

function getInputBlock(){
  return {
    name: document.querySelector('.popup_opened .popup__input-name'),
    descr: document.querySelector('.popup_opened .popup__input-descr')
  }
}

// Блок функций, обслуживающих карточку ---------------------------------------
function closeForm(e) {
  const popup = e.target.closest('.popup_opened') || document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

function pressEsc(e) {
  if (!e.target.classList.contains('input') && (e.code === 'Escape')) {
    closeForm(e);
  }
}

function clickOverlay(e) {
  if (!e.target.closest('.popup__form')) {
    closeForm(e);
  }
}

function liked() {
  this.classList.toggle('button-like_liked');
}

function deleted() {
  this.closest('.elements__item').remove();
}

// Блок загрузки форм ---------------------------------------------------------
function openForm(className) {
  const popup = document.querySelector(className);
  popup.classList.add('popup_opened');
}

function setInputValue(name = '', descr = '') {
  const inputBlock = getInputBlock();

  inputBlock.name.value = name;
  inputBlock.descr.value = descr;
}

function loadFormEdit() {
  openForm('.popup_type-form_edit');
  setInputValue(globalTitle.textContent, globalSubtitle.textContent);
}

function loadFormAdd() {
  openForm('.popup_type-form_add');
  setInputValue();
}

function loadFormPicture(e) {
  openForm('.popup_type-form_picture');

  const image = document.querySelector('.popup_opened .figure__image');
  image.setAttribute('src', e.currentTarget.getAttribute('src'));

  const sourceCaption = e.currentTarget
    .closest('.elements__item')
    .querySelector('.elements__name');

  const targetCaption = document.querySelector('.popup_opened .figure__caption');
  targetCaption.textContent = sourceCaption.textContent;
}

// Блок отправки данных -------------------------------------------------------
function submitFormAdd(e) {
  e.preventDefault();

  // let cardNew = {name: p.querySelector('.popup__input-name').value, link: p.querySelector('.popup__input-descr').value};
  // initialCards.unshift(cardNew);

  const inputBlock = getInputBlock();

  createCard(inputBlock.name.value, inputBlock.descr.value, 'prepend');

  closeForm(e);
}

function submitFormEdit(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  globalTitle.textContent = inputBlock.name.value;
  globalSubtitle.textContent = inputBlock.descr.value;

  closeForm(e);
}

// Блок создания карточек -----------------------------------------------------
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

function createCard(name, link, direction) {
  name =  name[0].toUpperCase() + name.slice(1);

  const tempCard = document.querySelector('#newCard').content;
  const list = document.querySelector('.elements__list');
  
  const newCard = tempCard.cloneNode(true);

  const img = newCard.querySelector('.elements__image');
  img.src = link;
  img.alt = name;
  img.addEventListener('click', loadFormPicture);

  newCard.querySelector('.elements__name').textContent = name;
  newCard.querySelector('.button-like').addEventListener('click', liked);
  newCard.querySelector('.button-delete').addEventListener('click', deleted);

  if (direction == 'append') {
    list.append(newCard);
  }
  else {
    list.prepend(newCard);
  } 
};

initialCards.forEach((card) => {
  createCard(card.name, card.link, 'append');
});

// Блок инициализации контролов -----------------------------------------------
const editButton = document.querySelector('.profile__button-edit');
editButton.addEventListener('click', loadFormEdit);

const addButton = document.querySelector('.profile__button-add');
addButton.addEventListener('click', loadFormAdd);

const submitButtonAdd = document.querySelector('.popup_type-form_add');
submitButtonAdd.addEventListener('submit', submitFormAdd);

const submitButtonEdit = document.querySelector('.popup_type-form_edit');
submitButtonEdit.addEventListener('submit', submitFormEdit);

const closeButtons = document.querySelectorAll('.button-close');
closeButtons.forEach(button => {
  button.addEventListener('click', closeForm);
});

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
  popup.addEventListener('click', clickOverlay);
});

const body = document.querySelector('.body');
body.addEventListener('keyup', pressEsc);