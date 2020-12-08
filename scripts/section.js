export default class Section {
  constructor(init, selector) {
    this._init = init;
    this._list = document.querySelector(selector);
  }

  renderer() {
    this._init.items.forEach((card) => {
      this._list.append(this._init.renderer(card));
    });
  }

  addItem(card) {
    this._list.prepend(this._init.renderer(card));
  }
}
