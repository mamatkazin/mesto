export default class UserInfo {
  constructor(config) {
    this._elemtName = document.querySelector(config.selectorName);
    this._elemDescr = document.querySelector(config.selectorDescr);
  }

  getUserInfo() {
    return {
      name: this._elemtName.textContent,
      descr: this._elemDescr.textContent,
    };
  }

  setUserInfo(name, descr) {
    this._elemtName.textContent = name;
    this._elemDescr.textContent = descr;
  }
}
