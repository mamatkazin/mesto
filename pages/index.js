let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let editButton = profile.querySelector('.profile__button-edit');
let closeButtonPopup = popup.querySelector('.popup__button-close');
let submitButtonPopup = popup.querySelector('.popup__button');

let name = popup.querySelector('.popup__input-name');
let descr = popup.querySelector('.popup__input-descr');

let title = profile.querySelector('.profile__title');
let subtitle = profile.querySelector('.profile__subtitle');

editButton.addEventListener('click', formLoad);
closeButtonPopup.addEventListener('click', formClose);
submitButtonPopup.addEventListener('click', formSubmit);

function formLoad() {
  name.value = title.textContent;
  descr.value = subtitle.textContent;

  popup.classList.add('popup_opened');
}

function formClose() {
  popup.classList.remove('popup_opened');
}

function formSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  title.textContent = name.value;
  subtitle.textContent = descr.value;

  popup.classList.remove('popup_opened');
}
