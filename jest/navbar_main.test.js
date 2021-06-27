/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const htmx = require('./@/static/js/htmx.min.js');
const navbarMain = require('./@/static/js/navbar_main.js');

describe('navbarMain()', () => {
  let instance;
  
  beforeEach(() => {
    instance = navbarMain();
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

  // loginFormSubmit
  describe('loginFormSubmit()', () => {

    test('sets loginModalSubmitButtonIsLoading to true', () => {
      instance.loginFormSubmit();
      expect(instance.loginModalSubmitButtonIsLoading).toEqual(true);
    });

  });
});
