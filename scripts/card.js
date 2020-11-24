class Card {
  #config = {
    classLiked: 'button-like_liked',
    classLike: 'button-like',
    classDelete: 'button-delete',
    classImage: 'card__image',
    selectorCard: '.card',
    selectorImage: '.card__image',
    selectorName: '.card__name'
  };

  #link;
  #name;
  #card;
  #eventClick;

  #clickButtonLike(e) {
    e.target.classList.toggle(this.#config.classLiked);
  }

  #clickButtonDelete() {
    this.#card.removeEventListener('click', this.#eventClick);
    this.#card.remove();
  }

  #loadFormPicture() {
    openPopup(globalPopupPicture);

    globalImage.src = this.#link;
    globalImage.alt = this.#name;
    globalCaption.textContent = this.#name;
  }

  #setEventListener(e) {
    if (e.target.classList.contains(this.#config.classLike)) {
      this.#clickButtonLike(e);
    } else if (e.target.classList.contains(this.#config.classDelete)) {
      this.#clickButtonDelete();
    } else if (e.target.classList.contains(this.#config.classImage)) {
      this.#loadFormPicture();
    }
  }

  constructor(name, link, template) {
    this.#name = name;
    this.#link = link;

    this.#card = document.querySelector(template).content.firstElementChild.cloneNode(true);
    const img = this.#card.querySelector(this.#config.selectorImage);
    const text = this.#card.querySelector(this.#config.selectorName);

    img.src = link;
    img.alt = name;
    text.textContent = name;

    this.#eventClick = this.#setEventListener.bind(this);
    this.#card.addEventListener('click', this.#eventClick);
  }

  toHTML() {
    return this.#card;
  }
}
