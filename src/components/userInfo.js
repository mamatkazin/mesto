export default class UserInfo {
  constructor(config) {
    this._elemtName = document.querySelector(config.selectorName);
    this._elemDescr = document.querySelector(config.selectorDescr);
    this._elemAvatar = document.querySelector(config.selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._elemtName.textContent,
      descr: this._elemDescr.textContent,
    };
  }

  getUserAvatar() {
    return {
      avatar: this._elemAvatar.src,
    };
  }

  setUserInfo(user) {
    this._elemtName.textContent = user.name;
    this._elemDescr.textContent = user.about;
    this._elemAvatar.src = user.avatar;
    this._elemAvatar.alt = user.name;
    this.id = user._id;
  }

  setUserAvatar(user) {
    this._elemAvatar.src = user.avatar;
  }
}

// "name": "Jacques Cousteau",
//   "about": "Sailor, researcher",
//   "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
//   "_id": "e20537ed11237f86bbb20ccb",
//   "cohort": "cohort0"