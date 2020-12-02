import Card from "./card.js";
import Validator from "./formValidator.js";

const gTitle = document.querySelector(".profile__title");
const gSubtitle = document.querySelector(".profile__subtitle");
const gImage = document.querySelector(".figure__image");
const gCaption = document.querySelector(".figure__caption");
const gList = document.querySelector(".elements__list");
const gPopupAdd = document.querySelector(".popup_type-form_add");
const gPopupEdit = document.querySelector(".popup_type-form_edit");
const gPopupPicture = document.querySelector(".popup_type-form_picture");
const gBody = document.querySelector(".body");
const gPopups = document.querySelectorAll(".popup");
const gForms = Array.from(document.querySelectorAll(".popup__container"));

const gConfigValidator = {
  formSelector: ".popup__container",
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  buttonDisabledClass: "button_disabled",
  inputErrorClass: "input_failed",
};

const gConfigCard = {
  classLiked: "button-like_liked",
  classLike: "button-like",
  classDelete: "button-delete",
  classImage: "card__image",
  selectorCard: ".card",
  selectorImage: ".card__image",
  selectorName: ".card__name",
};

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function getInputBlock() {
  return {
    name: document.querySelector(".popup_opened .popup__input-name"),
    descr: document.querySelector(".popup_opened .popup__input-descr"),
  };
}

function clickPopup(e) {
  if (
    e.target.classList.contains("popup") ||
    e.target.classList.contains("popup__close")
  ) {
    closePopup(this);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  gBody.removeEventListener("keyup", pressEsc);
  popup.removeEventListener("click", clickPopup);

  if (
    popup.classList.contains("popup_type-form_add") ||
    popup.classList.contains("popup_type-form_edit")
  ) {
    popup.querySelector(".popup__container").reset();
  }
}

function pressEsc(e) {
  if (!e.target.classList.contains("input") && e.key === "Escape") {
    const popup =
      e.target.closest(".popup_opened") ||
      document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  gBody.addEventListener("keyup", pressEsc);
  popup.addEventListener("click", clickPopup);
}

function loadFormEdit() {
  openPopup(gPopupEdit);

  const inputBlock = getInputBlock();

  inputBlock.name.value = gTitle.textContent;
  inputBlock.descr.value = gSubtitle.textContent;
}

function loadFormAdd() {
  openPopup(gPopupAdd);
}

function loadFormPicture(alt, src) {
  openPopup(gPopupPicture);

  gImage.src = src;
  gImage.alt = alt;
  gCaption.textContent = alt;
}

initialCards.forEach((card) => {
  gList.append(
    new Card(gConfigCard, card.name, card.link, "#newCard").generateCard(
      loadFormPicture
    )
  );
});

gForms.forEach((form) => {
  new Validator(gConfigValidator, form).enableValidation();
});

// Блок отправки данных -------------------------------------------------------
function submitFormAdd(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  gList.prepend(
    new Card(
      gConfigCard,
      inputBlock.name.value,
      inputBlock.descr.value,
      "#newCard"
    ).generateCard(loadFormPicture)
  );

  closePopup(gPopupAdd);
}

function submitFormEdit(e) {
  e.preventDefault();

  const inputBlock = getInputBlock();

  gTitle.textContent = inputBlock.name.value;
  gSubtitle.textContent = inputBlock.descr.value;

  closePopup(gPopupEdit);
}

// Блок инициализации контролов -----------------------------------------------
const buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", loadFormEdit);

const buttonAdd = document.querySelector(".profile__button-add");
buttonAdd.addEventListener("click", loadFormAdd);

const buttonSubmitAdd = document.querySelector(".popup_type-form_add");
buttonSubmitAdd.addEventListener("submit", submitFormAdd);

const buttonSubmitEdit = document.querySelector(".popup_type-form_edit");
buttonSubmitEdit.addEventListener("submit", submitFormEdit);

// gPopups.forEach((popup) => {
//   popup.addEventListener("click", (e) => {
//     if (
//       e.target.classList.contains("popup") ||
//       e.target.classList.contains("popup__close")
//     ) {
//       closePopup(popup);
//     }
//   });
// });
