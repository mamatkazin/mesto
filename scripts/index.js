import Card from "./card.js";
import Validator from "./qformValidator.js";
import UserInfo from "./userInfo.js";
import PopupWithImage from "./popupWithImage.js";
import PopupWithForm from "./popupWithForm.js";
import Section from "./section.js";

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

const gConfigUser = {
  selectorTitle: ".profile__title",
  selectorSubTitle: ".profile__subtitle",
};

const initData = {
  items: [
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
  ],
  renderer: function (card) {
    return new Card(
      gConfigCard,
      card.name,
      card.link,
      "#newCard",
      loadFormPicture
    ).generateCard();
  },
};

const gUser = new UserInfo(gConfigUser);
const gSection = new Section(initData, ".elements__list");
const gPopupImage = new PopupWithImage(".popup_type-form_picture");
const gPopupAdd = new PopupWithForm(".popup_type-form_add", submitFormAdd);
const gPopupEdit = new PopupWithForm(".popup_type-form_edit", submitFormEdit);

gSection.renderer();

function loadFormEdit() {
  const user = gUser.getUserInfo();
  gPopupEdit.setInputValues(user.title, user.subTitle);
  gPopupEdit.open();
}

function loadFormAdd() {
  gPopupAdd.open();
}

function loadFormPicture(alt, src) {
  gPopupImage.open(alt, src);
}

gForms.forEach((form) => {
  new Validator(gConfigValidator, form).enableValidation();
});

function submitFormAdd(e, src, alt) {
  e.preventDefault();

  gSection.addItem({
    name: alt,
    link: src,
  });

  gPopupAdd.close();
}

function submitFormEdit(e, subTitle, title) {
  e.preventDefault();

  gUser.setUserInfo(title, subTitle);

  gPopupEdit.close();
}

const buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", loadFormEdit);

const buttonAdd = document.querySelector(".profile__button-add");
buttonAdd.addEventListener("click", loadFormAdd);
