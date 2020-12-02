export default class Card {
  constructor(config, name, link, templateSelector) {
    this._config = config;
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    // this._eventClick = this._setEventListener.bind(this);
  }

  _clickButtonLike(e) {
    e.target.classList.toggle(this._config.classLiked);
  }

  _clickButtonDelete() {
    // this._card.removeEventListener("click", this._eventClick);
    this._card.removeEventListener("click", (e) => this._setEventListener(e));
    this._card.remove();
  }

  _loadFormPicture() {
    this._showPopup(this._name, this._link);
  }

  _setEventListener(e) {
    if (e.target.classList.contains(this._config.classLike)) {
      this._clickButtonLike(e);
    } else if (e.target.classList.contains(this._config.classDelete)) {
      this._clickButtonDelete();
    } else if (e.target.classList.contains(this._config.classImage)) {
      this._loadFormPicture();
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._config.selectorCard)
      .cloneNode(true);

    return cardElement;
  }

  generateCard(showPopup) {
    this._showPopup = showPopup;
    this._card = this._getTemplate();
    const img = this._card.querySelector(this._config.selectorImage);
    const text = this._card.querySelector(this._config.selectorName);

    img.src = this._link;
    img.alt = this._name;
    text.textContent = this._name;

    // this._card.addEventListener("click", this._eventClick);
    this._card.addEventListener("click", (e) => this._setEventListener(e));

    return this._card;
  }
}
