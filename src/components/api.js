export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(res);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(this._baseUrl + "cards", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getUser() {
    return fetch(this._baseUrl + "users/me", {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setUser(name, about) {
    return fetch(this._baseUrl + "users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    }).then(this._getResponseData);
  }

  setAvatar(avatar) {
    return fetch(this._baseUrl + "users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    }).then(this._getResponseData);
  }

  newCard(name, link) {
    return fetch(this._baseUrl + "cards", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "cards/" + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }

  setLike(cardId) {
    return fetch(this._baseUrl + "cards/likes/" + cardId, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseData)
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + "cards/likes/" + cardId, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseData);
  }
}
