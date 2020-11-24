import { EXPIRE_TIME_STORAGE, USER_DATA_STORAGE, USER_TOKEN_STORAGE, REMEMBER_SESSION } from '../configs';

export function clearStorages() {
  localStorage.removeItem(EXPIRE_TIME_STORAGE);
  localStorage.removeItem(USER_DATA_STORAGE);
  localStorage.removeItem(USER_TOKEN_STORAGE);
}

export function setExpireTime(value) {
  const timeObject = new Date();
  localStorage.setItem(EXPIRE_TIME_STORAGE, new Date(timeObject.getTime() + value * 1000));
}

export function checkExpireTime() {
  const time = new Date().getTime();
  const expire = (localStorage.getItem(EXPIRE_TIME_STORAGE)
    ? localStorage.getItem(EXPIRE_TIME_STORAGE) : 0);
  return time > new Date(expire).getTime();
}

export function setUserData(value) {
  localStorage.setItem(USER_DATA_STORAGE, JSON.stringify(value));
}

export function setUserToken(value) {
  localStorage.setItem(USER_TOKEN_STORAGE, value);
}

export function setRemember(remember) {
  localStorage.setItem(REMEMBER_SESSION, remember);
}

export function getRemember() {
  const retval = localStorage.getItem(REMEMBER_SESSION)
    ? localStorage.getItem(REMEMBER_SESSION) : null;

  return retval;
}

export function getUserData() {
  const retval = localStorage.getItem(USER_DATA_STORAGE)
    ? localStorage.getItem(USER_DATA_STORAGE) : null;

  return retval;
}

export function getUserToken() {
  const retval = localStorage.getItem(USER_TOKEN_STORAGE)
    ? localStorage.getItem(USER_TOKEN_STORAGE) : null;

  return retval;
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
