import "./index.css";
import Card from "../components/card.js";
import Validator from "../components/formValidator.js";
import UserInfo from "../components/userInfo.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithButton from "../components/popupWithButton.js";
import Section from "../components/section.js";
import Api from "../components/api.js";
import ErrorApp from "../components/error.js";

const gConfigValidator = {
  formSelector: ".popup__container",
  inputSelector: ".input",
  submitButtonSelector: ".popup__button",
  buttonDisabledClass: "button_disabled",
  inputErrorClass: "input_failed",
  buttonThemeDarkClass: "button_theme_dark",
  buttonThemeLightClass: "button_theme_light",
};

const gConfigCard = {
  classLiked: "button-like__image_liked",
  classLike: "button-like__image",
  classDelete: "button-delete",
  classImage: "card__image",
  selectorCard: ".card",
  selectorImage: ".card__image",
  selectorName: ".card__name",
  selectorRecycle: ".card__delete",
  selectorLikeCount: ".button-like__like-count",
  selectorLike: ".button-like__image",
};

const gConfigUser = {
  selectorName: ".profile__title",
  selectorDescr: ".profile__subtitle",
  selectorAvatar: ".profile__image",
};

function addCard(api, section, item, userId, isAppend, err) {
  const card = new Card(
    gConfigCard,
    item,
    "#newCard",
    loadFormPicture,
    loadFormConfirm,
    userId,
    api,
    err,
  );

  section.addItem(card.generateCard(), isAppend);
}


let gSection;

const gError = new ErrorApp();
const gForms = Array.from(document.querySelectorAll(".popup__container"));
const gUser = new UserInfo(gConfigUser);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "8f00d36b-aec0-4f68-9304-edc80987adcb",
    "Content-Type": "application/json",
  },
});

Promise.all([
  api.getUser(),
  api.getInitialCards()
])
  .then((data) => {
    gUser.setUserInfo(data[0]);

    gSection = new Section(
      {
        data: data[1],
        renderer: (item) => addCard(api, gSection, item, gUser.id, true, gError),
      },

      ".elements__list"
    );

    gSection.renderItems();
  })
  .catch((err) => {
    gError.open(err);
  });

gForms.forEach((form) => {
  new Validator(gConfigValidator, form).enableValidation();
});

const gPopupImage = new PopupWithImage(".popup_type-form_picture");
const gPopupAdd = new PopupWithForm(".popup_type-form_add", "Создание...", submitFormAdd);
const gPopupEdit = new PopupWithForm(".popup_type-form_edit", "Сохранение...", submitFormEdit);
const gPopupAvatar = new PopupWithForm(".popup_type-form_avatar", "Сохранение...", submitFormAvatar);
const gPopupConfirm = new PopupWithButton(".popup_type-form_confirm", "Удаление...",submitFormConfirm);

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

function loadFormConfirm(elementCard, cardId) {
  gPopupConfirm.open(elementCard, cardId);
}

function loadFormAvatar() {
  const user = gUser.getUserAvatar();
  gPopupAvatar.setInputValues(user);
  gPopupAvatar.open();
}

function submitFormAdd(cardData) {
  api.newCard(cardData.place, cardData.url)
    .then((data) => {
      addCard(api, gSection, data, gUser.id, false, gError);
      gPopupAdd.close();
    })
    .catch((err) => {
      gError.open(err);
    })
    .finally(() => {
      gPopupAdd.recovery("Создать");
    });
}

function submitFormEdit(user) {
  api.setUser(user.name, user.descr)
    .then((data) => {
      gUser.setUserInfo(data);
      gPopupEdit.close();
    })
    .catch((err) => {
      gError.open(err);
    })
    .finally(() => {
      gPopupEdit.recovery("Сохранить");
    });
}

function submitFormAvatar(user) {
  api.setAvatar(user.avatar)
    .then((data) => {
      gUser.setUserAvatar(data);
      gPopupAvatar.close();
    })
    .catch((err) => {
      gError.open(err);
    })
    .finally(() => {
      gPopupAvatar.recovery("Сохранить");
    });
}

function submitFormConfirm(elementCard, cardId) {
  api.deleteCard(cardId)
    .then(() => {
      elementCard.deleteCard();
      gPopupConfirm.close();
    })
    .catch((err) => {
      gError.open(err);
    })
    .finally(() => {
      gPopupConfirm.recovery("Да");
    });
}

const buttonEdit = document.querySelector(".profile__button-edit");
buttonEdit.addEventListener("click", loadFormEdit);

const buttonAdd = document.querySelector(".profile__button-add");
buttonAdd.addEventListener("click", loadFormAdd);

const buttonAvatar = document.querySelector(".profile__button-avatar");
buttonAvatar.addEventListener("click", loadFormAvatar);