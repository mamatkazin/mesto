const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__button-edit");
const addButton = profile.querySelector(".profile__button-add");

const title = profile.querySelector(".profile__title");
const subtitle = profile.querySelector(".profile__subtitle");

const closeButtons = document.querySelectorAll('.button-close');
const submitButtonAdd = document.querySelector(".popup_type-form_add");
const submitButtonEdit = document.querySelector(".popup_type-form_edit");

const list = document.querySelector(".elements__list");

let initialCards = [
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

function createCard(name, link, direction) {
  let li = document.createElement("li");
  li.className = "elements__item";

  let img = document.createElement("img");
  img.className = "elements__image";
  img.src = link;
  img.alt = name;
  img.addEventListener("click", loadFormPicture);

  let div = document.createElement("div");
  div.className = "elements__row";

  let h2 = document.createElement("h2");
  h2.className = "elements__name";
  h2.textContent = name;

  let buttonLike = document.createElement("button");
  buttonLike.className = "button button-like";
  buttonLike.type = "button";
  buttonLike.setAttribute("aria-label", "Поставить лайк.");
  buttonLike.addEventListener("click", liked);

  let buttonDel = document.createElement("button");
  buttonDel.className = "button button-delete elements__delete";
  buttonDel.type = "button";
  buttonDel.setAttribute("aria-label", "Удалить карточку.");
  buttonDel.addEventListener("click", deleted);

  div.append(h2);
  div.append(buttonLike);

  li.append(img);
  li.append(div);
  li.append(buttonDel);

  if (direction == 'append') {
    list.append(li);
  }
  else {
    list.prepend(li);
  } 
  
};

initialCards.forEach((card) => {
  createCard(card.name, card.link, 'append');
});

function formOpen(className) {
  let p = document.querySelector(className);
  p.classList.add("popup_opened");
}

function loadFormEdit() {
  formOpen(".popup_type-form_edit");

  let name = document.querySelector(".popup_opened .popup__input-name");
  let descr = document.querySelector(".popup_opened .popup__input-descr");

  name.value = title.textContent;
  descr.value = subtitle.textContent;
}

function loadFormAdd() {
  formOpen(".popup_type-form_add");
}

function formClose(e) {
  e.currentTarget.closest(".popup").classList.remove("popup_opened");
}

function formSubmitAdd(e) {
  e.preventDefault();

  let p = this.closest(".popup");
  // let cardNew = {name: p.querySelector(".popup__input-name").value, link: p.querySelector(".popup__input-descr").value};
  // initialCards.unshift(cardNew);

  createCard(p.querySelector(".popup__input-name").value, p.querySelector(".popup__input-descr").value, 'prepend');

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

function deleted(e) {
  this.closest(".elements__item").remove();
}

function loadFormPicture(e) {
  formOpen(".popup_type-form_picture");

  let image = document.querySelector(".popup_opened .figure__image");
  image.setAttribute("src", e.currentTarget.getAttribute("src"));

  let sourceCaption = e.currentTarget
    .closest(".elements__item")
    .querySelector(".elements__name");
  let targetCaption = document.querySelector(".popup_opened .figure__caption");
  targetCaption.textContent = sourceCaption.textContent;
}

editButton.addEventListener("click", loadFormEdit);
addButton.addEventListener("click", loadFormAdd);
submitButtonAdd.addEventListener("submit", formSubmitAdd);
submitButtonEdit.addEventListener("submit", formSubmitEdit);

closeButtons.forEach((b) => {
  b.addEventListener("click", formClose);
});
