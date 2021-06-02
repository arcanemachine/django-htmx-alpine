import { ClientFunction } from 'testcafe';

// constants
export const SERVER_URL = 'http://192.168.1.120:8000';

// localStorage get + set
export const localStorageSet = ClientFunction(
  (prop, value) => localStorage.setItem(prop, value));
export const localStorageGet = ClientFunction(
  prop => localStorage.getItem(prop));

// get current url
export const getWindowLocation = ClientFunction(
  () => window.location.href.toString());
