let profile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let formCardAdd = document.querySelector(".form-card-add");
let editButton = profile.querySelector(".profile__button-edit");
let closeButtonPopup = popup.querySelector(".popup__button-close");
let submitButtonPopup = popup.querySelector(".popup__button");

let addButton = profile.querySelector(".profile__button-add");
let closeButtonCardAdd = formCardAdd.querySelector(
  ".form-card-add__button-close"
);
let submitButtonCardAdd = formCardAdd.querySelector(".form-card-add__button");

let name = popup.querySelector(".popup__input-name");
let descr = popup.querySelector(".popup__input-descr");

let title = profile.querySelector(".profile__title");
let subtitle = profile.querySelector(".profile__subtitle");

editButton.addEventListener("click", formLoad);
closeButtonPopup.addEventListener("click", formClose);
submitButtonPopup.addEventListener("click", formSubmitHandler);

addButton.addEventListener("click", formCardAddLoad);
closeButtonCardAdd.addEventListener("click", formCardAddClose);
submitButtonCardAdd.addEventListener("click", formCardAddSubmit);

function formLoad() {
  name.value = title.textContent;
  descr.value = subtitle.textContent;

  popup.classList.add("popup_opened");
}

function formClose() {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  title.textContent = name.value;
  subtitle.textContent = descr.value;

  popup.classList.remove("popup_opened");
}

function formCardAddLoad() {
  // name.value = title.textContent;
  // descr.value = subtitle.textContent;

  formCardAdd.classList.add("form-card-add_opened");
}

function formCardAddClose() {
  formCardAdd.classList.remove("form-card-add_opened");
}

function formCardAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // title.textContent = name.value;
  // subtitle.textContent = descr.value;

  poformCardAddpup.classList.remove("form-card-add_opened");
}
