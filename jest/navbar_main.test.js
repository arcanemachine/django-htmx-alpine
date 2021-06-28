/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

// const htmx = require('./@/static/js/htmx.min.js');
const navbarMain = require('./@/static/js/navbar_main.js');

jest.mock('./@/static/js/htmx.min.js');
// const htmx = jest.fn();

describe('navbarMain()', () => {
  let instance;
  
  beforeEach(() => {
    instance = navbarMain();

    document.body.dispatchEvent = jest.fn();
    CustomEvent = jest.fn(); // eslint-disable-line
  });

  test('creates an instance of navbarMain()', () => {
    expect(instance).toBeTruthy();
  });

  test('all parameters are false when navbar is instantiated', () => {
    expect(instance.navbarIsActive).toBeFalsy();
    expect(instance.loginModalIsActive).toBeFalsy();
    expect(instance.loginModalSubmitButtonIsLoading).toBeFalsy();
    expect(instance.logoutModalIsActive).toBeFalsy();
    expect(instance.registerModalIsActive).toBeFalsy();
    expect(instance.registerModalSubmitButtonIsLoading).toBeFalsy();
  });

  describe('loginFormSubmit()', () => {

    beforeEach(() => {
      instance.loginFormSubmit();
    });

    test('sets loginModalSubmitButtonIsLoading to true', () => {
      expect(instance.loginModalSubmitButtonIsLoading).toEqual(true);
    });

    test('dispatches expected event', () => {
      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(CustomEvent).toHaveBeenCalledWith('login-form-submit');
    });

  });

});
