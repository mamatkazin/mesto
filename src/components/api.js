export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
      .then((data) => {
        console.log("@@@@@@@");
        console.log(data);
        console.log("@@@@@@@");
      })
      .catch((err) => {
        console.log("########", err.status); // выведем ошибку в консоль
        err.json().then((data) => {
          console.log(data.message);
        });
      });
  }

  // другие методы работы с API
}
