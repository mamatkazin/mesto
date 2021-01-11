import ErrorApp from "../components/error.js";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

    this._error = new ErrorApp();

    this.json = null;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "cards", {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .catch((err) => {
        err.json().then((data) => {
          this._error.open(err.status, data.message)
        });
      });
  }

  getUser() {
    return fetch(this._baseUrl + "users/me", {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .catch((err) => {
        err.json().then((data) => {
          this._error.open(err.status, data.message)
        });
      });
  }

  setUser(name, about) {
    return fetch(this._baseUrl + "users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .catch((err) => {
        err.json().then((data) => {
          this._error.open(err.status, data.message)
        });
      });
  }

  setAvatar(avatar) {
    return fetch(this._baseUrl + "users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res);
      })
      .catch((err) => {
        err.json().then((data) => {
          this._error.open(err.status, data.message)
        });
      });
  }
}
