import "./index.css";
import Card from "../components/card.js";
import Validator from "../components/formValidator.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import Section from "../components/section.js";

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
  selectorName: ".profile__title",
  selectorDescr: ".profile__subtitle",
};

const items = [
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

const gUser = new UserInfo(gConfigUser);

const gSection = new Section(
  {
    data: items,
    renderer: (item) => {
      const card = new Card(
        gConfigCard,
        item.name,
        item.link,
        "#newCard",
        loadFormPicture
      );

      gSection.addItem(card.generateCard());
    },
  },

  ".elements__list"
);

gSection.renderItems();

const gPopupImage = new PopupWithImage(".popup_type-form_picture");
const gPopupAdd = new PopupWithForm(".popup_type-form_add", submitFormAdd);
const gPopupEdit = new PopupWithForm(".popup_type-form_edit", submitFormEdit);

function loadFormEdit() {
  const user = gUser.getUserInfo();
  gPopupEdit.setInputValues(user);
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

function submitFormAdd(cardData) {
  const card = new Card(
    gConfigCard,
    cardData.place,
    cardData.url,
    "#newCard",
    loadFormPicture
  );

  gSection.addItem(card.generateCard());

  gPopupAdd.close();
}

function submitFormEdit(user) {
  gUser.setUserInfo(user.name, user.descr);

  gPopupEdit.close();
}

const buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", loadFormEdit);

const buttonAdd = document.querySelector(".profile__button-add");
buttonAdd.addEventListener("click", loadFormAdd);
