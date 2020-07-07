import jsCookie from 'js-cookie';
// import envConfig from 'envConfig';

const AUTH_TOKEN_COOKIE_NAME= 'tensorplace';

export function fetchAuthToken() {
  return jsCookie.get(AUTH_TOKEN_COOKIE_NAME);
}

export function saveAuthToken(token) {
  jsCookie.set(AUTH_TOKEN_COOKIE_NAME, token);
}

export function clearAuthToken() {
  jsCookie.remove(AUTH_TOKEN_COOKIE_NAME);
}