import ErrorApp from "../components/error.js";

export default class Card {
  constructor(config, dataSource, templateSelector, showPopupPicture, showPopupConfirm, userId, api, error) {
    this._config = config;
    this._dataSource = dataSource;
    this._templateSelector = templateSelector;
    this._showPopupPicture = showPopupPicture;
    this._showPopupConfirm = showPopupConfirm;
    this._userId = userId;
    this._api = api;
    this._setEventListener = this._setEventListener.bind(this);

    this._error = error;
  }

  _clickLikeButton(e) {
    const likeCount = this._card.querySelector(this._config.selectorLikeCount);

    if (e.target.classList.contains(this._config.classLiked)) {
      this._api.deleteLike(this._dataSource._id)
        .then((data) => {
            e.target.classList.remove(this._config.classLiked);
            likeCount.textContent = data.likes.length;
          })
        .catch((err) => {
          err.json().then((data) => {
            this._error.open(err.status, data.message)
          });
        });
    } else {
      this._api.setLike(this._dataSource._id)
        .then((data) => {
          e.target.classList.add(this._config.classLiked);
          likeCount.textContent = data.likes.length;
        })
        .catch((err) => {
          err.json().then((data) => {
            this._error.open(err.status, data.message)
          });
        });
    }
  }

  _clickDeleteButton() {
    this._showPopupConfirm(this, this._dataSource._id);
  }

  _loadFormPicture() {
    this._showPopupPicture(this._dataSource.link, this._dataSource.name);
  }

  _setEventListener(e) {
    if (e.target.classList.contains(this._config.classLike)) {
      this._clickLikeButton(e);
    } else if (e.target.classList.contains(this._config.classDelete)) {
      this._clickDeleteButton();
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

  generateCard() {
    this._card = this._getTemplate();
    const img = this._card.querySelector(this._config.selectorImage);
    const text = this._card.querySelector(this._config.selectorName);
    const likeCount = this._card.querySelector(this._config.selectorLikeCount);

    if (this._dataSource.owner._id !== this._userId) {
      const recycle = this._card.querySelector(this._config.selectorRecycle);
      recycle.remove();
    }

    img.src = this._dataSource.link;
    img.alt = this._dataSource.name;

    text.textContent = this._dataSource.name;
    likeCount.textContent = this._dataSource.likes.length;

    const userId = this._dataSource.likes.findIndex(item => item._id === this._userId);

    if (userId != -1) {
      this._card.querySelector(this._config.selectorLike).classList.add(this._config.classLiked);
    }

    this._card.addEventListener("click", this._setEventListener);

    return this._card;
  }

  deleteCard() {
    this._card.removeEventListener("click", this._setEventListener);
    this._card.remove();
  }
}
