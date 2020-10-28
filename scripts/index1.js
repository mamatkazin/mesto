const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__button-edit");
const addButton = profile.querySelector(".profile__button-add");

const title = profile.querySelector(".profile__title");
const subtitle = profile.querySelector(".profile__subtitle");

const submitButtonAdd = document.querySelector(".popup_type-form_add");
const submitButtonEdit = document.querySelector(".popup_type-form_edit");

const elements = document.querySelector(".elements");
const list = elements.querySelector(".elements__list");
const likeButtons = elements.querySelectorAll(".button-like");
const deleteButtons = elements.querySelectorAll(".button-delete");
const images = elements.querySelectorAll(".elements__image");

let closeButton;

let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(card => {
  var li = document.createElement("li");
  li.className = 'elements__item';
});

function activationFormElements(className) {
  let p = document.querySelector(className);
  p.classList.add("popup_opened");

  closeButton = p.querySelector(".popup_opened .button-close");
  closeButton.addEventListener("click", formClose, { once: true });
}

function loadFormEdit() {
  activationFormElements(".popup_type-form_edit");

  let name = document.querySelector(".popup_opened .popup__input-name");
  let descr = document.querySelector(".popup_opened .popup__input-descr");

  name.value = title.textContent;
  descr.value = subtitle.textContent;
}

function loadFormAdd() {
  activationFormElements(".popup_type-form_add");
}

function formClose(e) {
  e.currentTarget.closest('.popup').classList.remove("popup_opened");
}

function formSubmitAdd(e) {
  e.preventDefault();

  formClose(e);
}

function formSubmitEdit(e) {
  e.preventDefault();

  let p = this.closest(".popup");
  let name = p.querySelector(".popup__input-name");
  let descr = p.querySelector(".popup__input-descr");

  title.textContent = name.value;
  subtitle.textContent = descr.value;

  formClose(e);
}

function liked() {
  this.classList.toggle("button-like_liked");
}

function deleted() {
  alert(this);
}

function loadFormPicture(e) {
  activationFormElements(".popup_type-form_picture");

  let image = document.querySelector(".popup_opened .figure__image");
  image.setAttribute("src", e.currentTarget.getAttribute("src"));

  let sourceCaption = e.currentTarget.closest('.elements__item').querySelector('.elements__name');
  let targetCaption = document.querySelector(".popup_opened .figure__caption");
  targetCaption.textContent = sourceCaption.textContent;
}

editButton.addEventListener("click", loadFormEdit);
addButton.addEventListener("click", loadFormAdd);
submitButtonAdd.addEventListener("submit", formSubmitAdd);
submitButtonEdit.addEventListener("submit", formSubmitEdit);

likeButtons.forEach((b) => {
  b.addEventListener("click", liked);
});

deleteButtons.forEach((b) => {
  b.addEventListener("click", deleted);
});

images.forEach((i) => {
  i.addEventListener("click", loadFormPicture);
});
