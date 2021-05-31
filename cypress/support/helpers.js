export const serverUrl = 'http://192.168.1.120:8000';

export const urls = {
  taskList: serverUrl,
  getCsrfToken: serverUrl + '/users/get-csrf-token/',
  login: serverUrl + '/users/login/',
  loginForm: serverUrl + '/users/login/?form=1'
}
