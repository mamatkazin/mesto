export default class Section {
  constructor({ data, renderer }, selector) {
    this._data = data;
    this._renderer = renderer;
    this._list = document.querySelector(selector);
  }

  renderItems() {
    this._data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(card, isAppend) {
    if (isAppend) {
      this._list.append(card);
    } else {
      this._list.prepend(card);
    }
  }
}
