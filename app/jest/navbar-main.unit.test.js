/* eslint no-undef: 0 */

const navbarMainComponent = require('./@/static/js/navbar-main.js');

describe('navbarMainComponent()', () => {
  let instance;
  
  beforeEach(() => {
    instance = navbarMainComponent();

    document.body.dispatchEvent = jest.fn();
    CustomEvent = jest.fn(); // eslint-disable-line
    htmx = {};
    htmx.ajax = jest.fn();

    hHandleTabEvent = jest.fn();
  });

  // sanity check
  it('Creates an instance of navbarMainComponent()', () => {
    expect(instance).toBeTruthy();
  });

  test('All variables are false when navbar is instantiated', () => {
    expect(instance.navbarIsActive).toEqual(false);
    expect(instance.loginModalIsActive).toEqual(false);
    expect(instance.loginModalSubmitButtonIsLoading)
    expect(instance.logoutModalIsActive).toEqual(false);
    expect(instance.registerModalIsActive).toEqual(false);
    expect(instance.registerModalSubmitButtonIsLoading).toEqual(false);
  });

  describe('loginModalEnable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.loginModalEnable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets loginModalIsActive to true', () => {
      expect(instance.loginModalIsActive).toEqual(false);

      instance.loginModalEnable();
      
      expect(instance.loginModalIsActive).toEqual(true);
    });

    it('Dispatches expected event', () => {
      expect(document.body.dispatchEvent).toHaveBeenCalledTimes(0);

      instance.loginModalEnable();

      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(CustomEvent).toHaveBeenCalledWith('login-captcha-get');
    });
  });

  describe('loginModalDisable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.loginModalDisable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets loginModalIsActive to false', () => {
      instance.loginModalIsActive = true;

      instance.loginModalDisable();

      expect(instance.loginModalIsActive).toEqual(false);
    });
  });

  describe('loginModalFormSubmit()', () => {
    it('Sets loginModalSubmitButtonIsLoading to true', () => {
      expect(instance.loginModalSubmitButtonIsLoading).toEqual(false);

      instance.loginModalFormSubmit();

      expect(instance.loginModalSubmitButtonIsLoading).toEqual(true);
    });

    it('Dispatches expected event', () => {
      expect(document.body.dispatchEvent).toHaveBeenCalledTimes(0);

      instance.loginModalFormSubmit();

      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(document.body.dispatchEvent).toHaveBeenCalledTimes(1);
      expect(CustomEvent).toHaveBeenCalledWith('login-form-submit');
    });
  });

  describe('loginModalHandleTabEvent()', () => {
    it('Calls hHandleTabEvent() with expected values', () => {
        instance.$refs = jest.fn();
        instance.$refs.loginModalFirstTabbable = jest.fn();
        instance.$refs.loginModalLastTabbable = jest.fn();

        const e = jest.fn();
        const firstTabbable = instance.$refs.loginModalFirstTabbable;
        const lastTabbable = instance.$refs.loginModalLastTabbable;
        const tabbableClass = 'login-modal-tabbable';

        instance.loginModalHandleTabEvent(e);

        expect(hHandleTabEvent).toHaveBeenCalled();
        expect(hHandleTabEvent).toHaveBeenCalledWith(
          e, firstTabbable, lastTabbable, tabbableClass
        );
    });
  });

  describe('logoutModalEnable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.logoutModalEnable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets logoutModalIsActive to true', () => {
      instance.logoutModalIsActive = false;

      instance.logoutModalEnable();
      
      expect(instance.logoutModalIsActive).toEqual(true);
    });
  });

  describe('logoutModalDisable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.logoutModalDisable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets logoutModalIsActive to false', () => {
      instance.logoutModalIsActive = true;

      instance.logoutModalDisable();
      
      expect(instance.logoutModalIsActive).toEqual(false);
    });
  });

  describe('logoutModalHandleTabEvent()', () => {
    it('Calls hHandleTabEvent() with expected values', () => {
        instance.$refs = jest.fn();
        instance.$refs.logoutModalFirstTabbable = jest.fn();
        instance.$refs.logoutModalLastTabbable = jest.fn();

        const e = jest.fn();
        const firstTabbable = instance.$refs.logoutModalFirstTabbable;
        const lastTabbable = instance.$refs.logoutModalLastTabbable;

        instance.logoutModalHandleTabEvent(e);
        expect(hHandleTabEvent).toHaveBeenCalled();
        expect(hHandleTabEvent).toHaveBeenCalledWith(
          e, firstTabbable, lastTabbable
        );
    });
  });

  describe('navbarClearAll()', () => {
    it('Sets navbarIsActive to false', () => {
      instance.navbarIsActive = true;

      instance.navbarClearAll();
      
      expect(instance.navbarIsActive).toEqual(false);
    });

    it('Sets loginModalIsActive to false', () => {
      instance.loginModalIsActive = true;

      instance.navbarClearAll();
      
      expect(instance.loginModalIsActive).toEqual(false);
    });

    it('Sets logoutModalIsActive to false', () => {
      instance.logoutModalIsActive = true;

      instance.navbarClearAll();
      
      expect(instance.logoutModalIsActive).toEqual(false);
    });

    it('Sets registerModalIsActive to false', () => {
      instance.registerModalIsActive = true;

      instance.navbarClearAll();
      
      expect(instance.registerModalIsActive).toEqual(false);
    });

  });

  describe('registerModalEnable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.registerModalEnable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets registerModalIsActive to true', () => {
      instance.registerModalIsActive = false;

      instance.registerModalEnable();
      
      expect(instance.registerModalIsActive).toEqual(true);
    });

    it('Dispatches expected event', () => {
      expect(document.body.dispatchEvent).toHaveBeenCalledTimes(0);

      instance.registerModalEnable();

      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(CustomEvent).toHaveBeenCalledWith('register-captcha-get');
    });

  });

  describe('registerModalDisable()', () => {
    it('Calls navbarClearAll()', () => {
      instance.navbarClearAll = jest.fn();

      instance.registerModalDisable();

      expect(instance.navbarClearAll).toHaveBeenCalled();
    });

    it('Sets registerModalIsActive to false', () => {
      instance.registerModalIsActive = true;

      instance.registerModalDisable();
      
      expect(instance.registerModalIsActive).toEqual(false);
    });
  });

  describe('registerModalFormSubmit()', () => {
    beforeEach(() => {
      hStatusMessageDisplay = jest.fn();
    });

    const runFailWithPasswordsDoNotMatch = () => {
      instance.$refs = jest.fn();

      instance.$refs.registerFormFieldPassword1 = jest.fn();
      instance.$refs.registerFormFieldPassword1.value = 'password1';

      instance.$refs.registerFormFieldPassword2 = jest.fn();
      instance.$refs.registerFormFieldPassword2.value = 'password2';

      instance.registerModalFormSubmit();
    };

    it('Dispatches success event if passwords match', () => {
      const eventName = 'register-form-submit';

      instance.$refs = jest.fn();

      instance.$refs.registerFormFieldPassword1 = jest.fn();
      instance.$refs.registerFormFieldPassword1.value = 'password';

      instance.$refs.registerFormFieldPassword2 = jest.fn();
      instance.$refs.registerFormFieldPassword2.value = 'password';

      instance.registerModalFormSubmit();

      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(CustomEvent).toHaveBeenCalled();
      expect(CustomEvent).toHaveBeenCalledWith(eventName);
    });

    it('Displays error message if passwords do not match', () => {
      const message = "The passwords do not match.";
      const messageType = 'danger';

      runFailWithPasswordsDoNotMatch()

      expect(hStatusMessageDisplay).toHaveBeenCalled();
      expect(hStatusMessageDisplay).toHaveBeenCalledWith(
        message, messageType
      );
    });

    it('Returns false if passwords do not match', () => {
      runFailWithPasswordsDoNotMatch()

      expect(instance.registerModalFormSubmit()).toEqual(false);
    });

  });

  describe('registerModalHandleTabEvent()', () => {
    it('Calls hHandleTabEvent() with expected values', () => {
        instance.$refs = jest.fn();
        instance.$refs.registerModalFirstTabbable = jest.fn();
        instance.$refs.registerModalLastTabbable = jest.fn();

        const e = jest.fn();
        const firstTabbable = instance.$refs.registerModalFirstTabbable;
        const lastTabbable = instance.$refs.registerModalLastTabbable;
        const tabbableClass = 'register-modal-tabbable';

        instance.registerModalHandleTabEvent(e);
        expect(hHandleTabEvent).toHaveBeenCalled();
        expect(hHandleTabEvent).toHaveBeenCalledWith(
          e, firstTabbable, lastTabbable, tabbableClass
        );
    });
  });

});
