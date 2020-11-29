import axios, { setBearerToken, removeBearerToken } from '../axios'

const notLoggedRoutes = ['/Register', '/Login']

const pathNeedsLogin = (pathname) => {
  return !notLoggedRoutes.includes(pathname)
}

export const isLoggedIn = (history) => {
  const { pathname } = history.location

  if (!localStorage.getItem('session')) {
    if (pathNeedsLogin(pathname)) {
      history.push('/Login')
      return
    }
    return
  }
  axios(history, {
    method: 'get',
    url: '/session',
  })
    .then(() => {
      if (!pathNeedsLogin(pathname)) {
        history.push('/')
      }
    })
    .catch(() => {
      if (pathNeedsLogin(pathname)) {
        history.push('/Login')
      }
    })
}

export const login = (history, credentials) => {
  axios(history, {
    method: 'post',
    url: '/session',
    data: credentials,
  })
    .then((res) => {
      setBearerToken(res.data)
      history.push('/')
    })
    .catch(() => {
      alert('Credenciais inválidas')
    })
}

export const logout = (history) => {
  const { token } = JSON.parse(localStorage.getItem('session'))
  axios(history, {
    method: 'delete',
    url: '/session',
    data: { token },
  })
    .then(() => {
      removeBearerToken()
      history.push('/Login')
    })
    .catch(() => {
    })
}

export const register = (history, {
  name,
  password,
  passwordConfirmation,
  email,
}) => {
  if (password !== passwordConfirmation) {
    alert('Senhas são diferentes')
    return
  }
  axios(history, {
    method: 'post',
    url: '/user',
    data: {
      name,
      email,
      password,
    },
  })
    .then(() => {
      alert('Cadasto realizado com sucesso!')
      history.push('/Login')
    })
    .catch(() => {
      alert('Verifique os campos e tente novamente.')
    })
}

export default {
  isLoggedIn,
  login,
  logout,
  register,
}
