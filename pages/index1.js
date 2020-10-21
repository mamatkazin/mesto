let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__button-edit");
let addButton = profile.querySelector(".profile__button-add");

let title = profile.querySelector(".profile__title");
let subtitle = profile.querySelector(".profile__subtitle");

let popup;
let closeButton;
let submitButton;
let name;
let descr;



editButton.addEventListener("click", loadFormEdit);
addButton.addEventListener("click", loadFormAdd);



function activationFormElements() {
  closeButton = popup.querySelector(".popup_opened .popup__button-close");
  submitButton = popup.querySelector(".popup_opened .popup__button");

  name = popup.querySelector(".popup__input-name");
  descr = popup.querySelector(".popup__input-descr");

  closeButton.addEventListener("click", formClose);
  submitButton.addEventListener("click", formSubmit);
}

function loadFormEdit() {
  popup = document.querySelector(".page__popup-edit");
  popup.classList.add("popup_opened");

  activationFormElements();

  name.value = title.textContent;
  descr.value = subtitle.textContent;
}

function loadFormAdd() {
  popup = document.querySelector(".page__popup-add");
  popup.classList.add("popup_opened");

  activationFormElements();

  name.value = "";
  descr.value = "";
}

function formClose() {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

if (popup.classList.contains('page__popup-edit')) {
title.textContent = name.value;
  subtitle.textContent = descr.value;
}
else if (popup.classList.contains('page__popup-add')) {
  
} else {
  console.log('Ошибка вызова функции formSubmit')
}
  

  popup.classList.remove("popup_opened");
}

