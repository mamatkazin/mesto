export default class UserInfo {
  constructor(config) {
    this._elemtTitle = document.querySelector(config.selectorTitle);
    this._elemSubtitle = document.querySelector(config.selectorSubTitle);
  }

  getUserInfo() {
    return {
      title: this._elemtTitle.textContent,
      subTitle: this._elemSubtitle.textContent,
    };
  }

  setUserInfo(title, subtitle) {
    this._elemtTitle.textContent = title;
    this._elemSubtitle.textContent = subtitle;
  }
}
