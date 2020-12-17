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

  addItem(card) {
    this._list.append(card);
  }
}
