import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector(".figure__image");
    this._caption = this._popup.querySelector(".figure__caption");
  }

  open(src, alt) {
    this._image.src = src;
    this._image.alt = alt;
    this._caption.textContent = alt;

    super.open();
  }
}
