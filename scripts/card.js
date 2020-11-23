class Card {
  #clickButtonLike() {
  }

  #clickButtonDelete() {
  }

  #loadFormPicture() {
  }

  #setEventListener(e) {
    if (e.target.classList.contains('button-like')) {
      this.#clickButtonLike;
    } else if (e.target.classList.contains('button-delete')) {
      this.#clickButtonDelete;
    } else if (e.target.classList.contains('card__image')) {
      this.#loadFormPicture;
    }
  }

  constructor(name, link, template) { 
    const newCard = template.cloneNode(true);
    const img = card.querySelector('.card__image');

    img.src = link;
    img.alt = name;

    newCard.querySelector('.card__name').textContent = name;

    this.addEventListener('click', this.#setEventListener);
  }

  destructor() { 
    this.removeEventListener('click', this.#setEventListener);
  }
  
}