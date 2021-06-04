export const serverUrl = 'http://localhost:8000';

export const randomString = (length=12) => {
  return Math.random().toString(16).substr(2, length);
};

export const urls = {
  about: serverUrl,
  getCsrfToken: serverUrl + '/users/get-csrf-token/',
  login: serverUrl + '/users/login/',
  loginForm: serverUrl + '/users/login/?form=1',
  register: serverUrl + '/users/register/',
  taskList: serverUrl + '/tasks/',
  userIsAuthenticated: serverUrl + '/utility/user-is-authenticated/'
}
