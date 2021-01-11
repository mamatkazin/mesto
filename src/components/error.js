export default class ErrorApp {
  constructor() {
    this._popup = document.querySelector('.error');
    this._title = this._popup.querySelector('.error__title');
    this._text = this._popup.querySelector('.error__text');
  }

  _handleClick = (e) => {
    if (e.target.classList.contains("error")) {
      this.close();
    }
  }

  open(title, text) {
    this._popup.classList.add("error_opened");
    this._title.textContent = title;
    this._text.textContent = text;
    this._popup.addEventListener("click", this._handleClick);
  }

  close() {
    this._popup.classList.remove("error_opened");
    this._popup.removeEventListener("click", this._handleClick);
  }
}