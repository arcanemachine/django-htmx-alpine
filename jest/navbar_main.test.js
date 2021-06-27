/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const navbarMain = require('../static/js/navbar_main.js');

describe('hHandleTabEvent', () => {

  let instance;

  beforeEach(() => {
    instance = navbarMain();
  });

  it('creates an instance of navbarMain()', () => {
    expect(instance).toBeTruthy();
  });

  it('all parameters are false when navbar is instantiated', () => {
    expect(instance.navbarIsActive).toBeFalsy();
    expect(instance.loginModalIsActive).toBeFalsy();
    expect(instance.loginModalSubmitButtonIsLoading).toBeFalsy();
    expect(instance.logoutModalIsActive).toBeFalsy();
    expect(instance.registerModalIsActive).toBeFalsy();
    expect(instance.registerModalSubmitButtonIsLoading).toBeFalsy();
  });

});
