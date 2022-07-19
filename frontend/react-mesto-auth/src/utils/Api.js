class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._checkResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
    .then(this._checkResponse)
  }

  editProfile(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
      name,
      about
      })
    })
    .then(this._checkResponse)
  }

  updateAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
      avatar
      })
    })
    .then(this._checkResponse)
  }

  addCard(name, link, token){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id, token){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked, token){
    if(isLiked){
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      })
      .then(this._checkResponse)
    }
  }
}

export const api = new Api({
  baseUrl: 'https://api.borisbell.nomoredomains.xyz',
});
