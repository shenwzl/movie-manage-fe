import Cookies from 'js-cookie'

const TokenKey = 'X-Token'
const PermissionKey = 'permissions'
const NameKey = 'name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

export function getPermission() {
  return Cookies.get(PermissionKey)
}

export function setPermission(permission) {
  return Cookies.set(PermissionKey, permission)
}

export function removePermission() {
  return Cookies.remove(PermissionKey)
}

export function hasPermission(module, permission) {
  const permissions = (getPermission() || '').split(',')
  return permissions.includes(`${module}:${permission}`)
}
