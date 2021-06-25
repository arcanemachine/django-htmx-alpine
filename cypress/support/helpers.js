export const serverUrl = 'http://192.168.1.120:8000';

export const randomString = (length=12) => {
  return Math.random().toString(16).substr(2, length);
};

export const urls = {
  about: serverUrl,
  getCsrfToken: serverUrl + '/utility/get-csrf-token/',
  login: serverUrl + '/users/login/',
  register: serverUrl + '/users/register/',
  taskList: serverUrl + '/tasks/',
  userIsAuthenticated: serverUrl + '/utility/user-is-authenticated/'
}
