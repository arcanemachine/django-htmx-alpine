/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function navbarMainContainerData(loginUrl, registerUrl) {
  return {
    // data
    navbarIsActive: false,
    loginModalIsActive: false,
    loginModalSubmitButtonIsLoading: false,
    logoutModalIsActive: false,
    registerModalIsActive: false,
    registerModalSubmitButtonIsLoading: false,

    // methods
    loginFormSubmit() {
      this.loginModalSubmitButtonIsLoading = true;
      htmx.ajax('POST', loginUrl, {
        source: '#login-form',
        target: '#login-form-response'
      });
    },
    loginModalEnable() {
      this.navbarClearAll();
      this.loginModalIsActive = true;
      htmx.ajax('GET', loginUrl, {
        target: '#login-captcha-img-container'
      });
    },
    loginModalDisable() {
      this.navbarClearAll();
      this.loginModalIsActive = false;
    },
    loginModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        this.$refs.loginModalFirstTabbable,
        this.$refs.loginModalLastTabbable,
        'login-modal-tabbable'
      );
    },
    logoutModalEnable() {
      this.navbarClearAll();
      this.logoutModalIsActive = true;
      this.$nextTick(() => {
        this.$refs.logoutModalFirstTabbable.focus();
      });
    },
    logoutModalDisable() {
      this.navbarClearAll();
      this.logoutModalIsActive = false;
    },
    logoutModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        this.$refs.logoutModalFirstTabbable,
        this.$refs.logoutModalLastTabbable,
      );
    },
    navbarClearAll() {
      this.navbarIsActive = false;
      this.loginModalIsActive = false;
      this.registerModalIsActive = false;
      this.logoutModalIsActive = false;
    },
    registerModalEnable() {
      this.navbarClearAll();
      this.registerModalIsActive = true;
      htmx.ajax('GET', registerUrl, {
        target: '#register-captcha-img-container'
      });
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
      this.registerModalSubmitButtonIsLoading = true;
      htmx.ajax('POST', registerUrl, {
        source: '#register-form',
        target: '#register-form-response'
      });
    },
    registerModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        this.$refs.registerModalFirstTabbable,
        this.$refs.registerModalLastTabbable,
        'register-modal-tabbable'
      );
    },
  }
}
