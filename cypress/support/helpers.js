export const randomString = (length=12) => {
  return Math.random().toString(16).substr(2, length);
};

export const serverUrl = 'http://192.168.1.120:8000';

export const urls = {
  about: serverUrl + '/about/',
  getCsrfToken: serverUrl + '/users/get-csrf-token/',
  login: serverUrl + '/users/login/',
  loginForm: serverUrl + '/users/login/?form=1',
  taskList: serverUrl,
  userIsAuthenticated: serverUrl + '/utility/user-is-authenticated/'
}
