class UserInfo {
  #elemtTitle;
  #elemSubtitle;

  constructor(config) {
    this.#elemtTitle = document.querySelector(config.titleSelector);
    this.#elemSubtitle = document.querySelector(config.subtitleSelector);
  }

  getUserInfo() {
    return [
      this.#elemtTitle.textContent,
      this.#elemSubtitle.textContent,
    ]
  }

  setUserInfo(title, subtitle) {
    this.#elemtTitle.textContent = title;
    this.#elemSubtitle.textContent = subtitle;
  }
}