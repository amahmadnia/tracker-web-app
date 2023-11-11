import Cookies from 'js-cookie'

const tokenTitle = import.meta.env.VITE_APP_TOKEN_TITLE

export const setCookie = (token) => {
  return Cookies.set(tokenTitle, token, { expires: 7 })
}

export const getCookie = () => {
  return Cookies.get(tokenTitle)
}

export const removeCookie = () => {
  return Cookies.remove(tokenTitle)
}
