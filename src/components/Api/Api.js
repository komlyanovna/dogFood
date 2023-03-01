/* eslint-disable no-param-reassign */
import axios from 'axios'

class Api {
  constructor(api) {
    this.baseUrl = api.baseUrl
    this.groupId = api.groupId
  }

  signUp(email, password, group) { // регистрация
    const res = axios.post(`${this.baseUrl}/signup`, {
      email,
      password,
      group,
    })
    return res
  }

  signIn(email, password) { // авторизация
    const response = axios.post(`${this.baseUrl}/signin`, {
      email,
      password,
    })
    return response
  }

  getCardItem(search) { // вывод карточек
    const response = axios(`${this.baseUrl}/products/?${new URLSearchParams(search).toString()}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  examination() { // проверка токена
    const response = axios(`${this.baseUrl}/v2/sm8/users/me`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
      .catch((error) => {
        if (!window.localStorage.getItem('userToken')) {
          alert(`Ошибка ${error}. Пользователь не авторизован.`)
        }
      })
    return response
  }

  cardId(id) { // детальная страница карточки
    const response = axios(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    }).catch((error) => error)
    return response
  }

  getProductsById(ids) { // корзина
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())))
  }

  addProducts({ values }) {
    const response = axios(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
      data: {
        available: true,
        pictures: values.pictures,
        name: values.name,
        price: values.price,
        discount: values.discount,
        wight: values.wight,
        description: values.description,
      },
    })
    return response
  }

  deleteProducts(id) {
    const res = axios.delete(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  }

  reviews(id) {
    const res = axios(`${this.baseUrl}/products/review/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  }

  addReviews({ values, id }) {
    const res = axios(`${this.baseUrl}/products/review/${id}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
      data: {
        rating: values.rating,
        text: values.text,
      },
    })
    return res
  }

  editProduct({ values }, id) {
    const res = axios(`${this.baseUrl}/products/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
      data: {
        pictures: values.pictures,
        price: values.price,
        discount: values.discount,
        wight: values.wight,
        description: values.description,
      },
    })
    return res
  }

  deleteReview(id, idRev) {
    const res = axios.delete(`${this.baseUrl}/products/review/${id}/${idRev}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json',
      },
    })
    return res
  }
}

export const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    'Content-Type': 'application/json',
  },
  groupId: 'sm8',
})
