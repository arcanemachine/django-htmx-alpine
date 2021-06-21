function navbarMainContainerData(loginUrl, registerUrl) {
  return {
    // data
    navbarIsActive: false,
    loginModalIsActive: false,
    loginSubmitButtonIsLoading: false,
    logoutModalIsActive: false,
    registerModalIsActive: false,
    registerSubmitButtonIsLoading: false,
    // methods
    loginFormSubmit() {
      this.loginSubmitButtonIsLoading = true;
      htmx.ajax('POST', '', {
        source: '#login-form',
        target: '#login-form-response'
      });
    },
    loginModalEnable() {
      this.navbarClearAll();
      this.loginModalIsActive = true;
    },
    loginModalDisable() {
      this.navbarClearAll();
      this.loginModalIsActive = false;
    },
    loginModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        document.querySelector('#login-modal-first-tabbable'),
        document.querySelector('#login-modal-last-tabbable'),
        'login-modal-tabbable'
      );
    },
    loginModalInit() {
      htmx.ajax('GET', loginUrl, {
        target: '#login-captcha-img-container'
      });
    },
    logoutModalEnable() {
      this.navbarClearAll();
      this.logoutModalIsActive = true;
      document.querySelector('#logout-modal-first-tabbable').focus();
    },
    logoutModalDisable() {
      this.navbarClearAll();
      this.logoutModalIsActive = false;
    },
    logoutModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        document.querySelector('#logout-modal-first-tabbable'),
        document.querySelector('#logout-modal-last-tabbable'),
      );
    },
    navbarClearAll() {
      this.navbarIsActive = false;
      this.loginModalIsActive = false;
      this.loginSubmitButtonIsLoading = false;
      this.registerModalIsActive = false;
      this.registerSubmitButtonIsLoading = false;
      this.logoutModalIsActive = false;
    },
    registerModalEnable() {
      this.navbarClearAll();
      this.registerModalIsActive = true;
    },
    registerModalDisable() {
      this.navbarClearAll();
      this.registerModalIsActive = false;
    },
    registerModalFormSubmit() {
      // do not continue if passwords do not match
      let password1 = this.$refs.registerFormFieldPassword1.value;
      let password2 = this.$refs.registerFormFieldPassword2.value;
      if (password1 !== password2) {
        hDispatch('status-message-display', {
          message: "The passwords do not match.",
          messageType: 'danger'
        });
        return false;
      }
      this.registerSubmitButtonIsLoading = true;
      htmx.ajax('POST', registerUrl, {
        source: '#register-form',
        target: '#register-form-response'
      });
    },
    registerModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        document.querySelector('#register-modal-first-tabbable'),
        document.querySelector('#register-modal-last-tabbable'),
        'register-modal-tabbable'
      );
    },
    registerModalInit() {
      htmx.ajax('GET', registerUrl, {
        target: '#register-captcha-img-container'
      });
    }
  }
}
