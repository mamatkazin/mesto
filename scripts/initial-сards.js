const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const templateCard = document.querySelector('#newCard').content;

function clickButtonLike(e) {
  e.target.classList.toggle('button-like_liked');
}

function clickButtonDelete(e) {
  e.target.closest('.card').remove();
}

function createCard(name, link) {
  const newCard = templateCard.cloneNode(true);

  const img = newCard.querySelector('.card__image');
  img.src = link;
  img.alt = name;
  img.addEventListener('click', loadFormPicture);

  newCard.querySelector('.card__name').textContent = name;
  newCard.querySelector('.button-like').addEventListener('click', clickButtonLike);
  newCard.querySelector('.button-delete').addEventListener('click', clickButtonDelete);

  return newCard;
};

initialCards.forEach((card) => {
  globalList.append(createCard(card.name, card.link));
});