import { useSyncExternalStore } from 'react'

const TOKEN_KEY = 'token'

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

function isAuthenticated() {
  return !!getToken()
}

export const authStore = {
  getToken,
  setToken,
  removeToken,
  isAuthenticated,
}
