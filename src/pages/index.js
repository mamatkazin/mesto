import "./index.css";
import Card from "../components/card.js";
import Validator from "../components/formValidator.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import Section from "../components/section.js";
import Api from "../components/api.js";


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
  selectorAvatar: ".profile__image",
};

const gUser = new UserInfo(gConfigUser);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "8f00d36b-aec0-4f68-9304-edc80987adcb",
    "Content-Type": "application/json",
  },
});

api.getUser()
  .then((data) => {
    gUser.setUserInfo(data)
  });

api.getInitialCards()
  .then((data) => {
    const gSection = new Section(
      {
        data: data,
        renderer: (item) => {
          const card = new Card(
            gConfigCard,
            item.name,
            item.link,
            "#newCard",
            loadFormPicture
          );

          gSection.addItem(card.generateCard(), true);
        },
      },

      ".elements__list"
    );

    gSection.renderItems();
  });

gForms.forEach((form) => {
  new Validator(gConfigValidator, form).enableValidation();
});

const gPopupImage = new PopupWithImage(".popup_type-form_picture");
const gPopupAdd = new PopupWithForm(".popup_type-form_add", submitFormAdd);
const gPopupEdit = new PopupWithForm(".popup_type-form_edit", submitFormEdit);
const gPopupAvatar = new PopupWithForm(".popup_type-form_avatar", submitFormAvatar);

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

function loadFormAvatar() {
  const user = gUser.getUserAvatar();
  gPopupAvatar.setInputValues(user);
  gPopupAvatar.open();
}

function submitFormAdd(cardData) {
  const card = new Card(
    gConfigCard,
    cardData.place,
    cardData.url,
    "#newCard",
    loadFormPicture
  );

  gSection.addItem(card.generateCard(), false);

  gPopupAdd.close();
}

function submitFormEdit(user) {
  api.setUser(user.name, user.descr)
    .then((data) => {
      gUser.setUserInfo(data);
      gPopupEdit.close();
    });
}

function submitFormAvatar(user) {
  api.setAvatar(user.avatar)
    .then((data) => {
      gUser.setUserAvatar(data);
      gPopupAvatar.close();
    });
}

const buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", loadFormEdit);

const buttonAdd = document.querySelector(".profile__button-add");
buttonAdd.addEventListener("click", loadFormAdd);

const buttonAvatar = document.querySelector(".profile__button-avatar");
buttonAvatar.addEventListener("click", loadFormAvatar);