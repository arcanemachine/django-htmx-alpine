/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

function navbarMain() {
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
      document.body.dispatchEvent(new CustomEvent('login-form-submit'));
    },
    loginModalEnable() {
      this.navbarClearAll();
      this.loginModalIsActive = true;
      document.body.dispatchEvent(new CustomEvent('login-captcha-get'));
    },
    loginModalDisable() {
      this.navbarClearAll();
      this.loginModalIsActive = false;
    },
    loginModalHandleTabEvent(e) {
      let firstTabbable = this.$refs.loginModalFirstTabbable;
      let lastTabbable = this.$refs.loginModalLastTabbable;
      hHandleTabEvent(e, firstTabbable, lastTabbable, 'login-modal-tabbable');
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
      let firstTabbable = this.$refs.logoutModalFirstTabbable;
      let lastTabbable = this.$refs.logoutModalLastTabbable;
      hHandleTabEvent(e, firstTabbable, lastTabbable);
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
      document.body.dispatchEvent(new CustomEvent('register-captcha-get'));
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
      document.body.dispatchEvent(new CustomEvent('register-form-submit'));
    },
    registerModalHandleTabEvent(e) {
      let firstTabbable = this.$refs.registerModalFirstTabbable;
      let lastTabbable = this.$refs.registerModalLastTabbable;
      hHandleTabEvent(
        e, firstTabbable, lastTabbable, 'register-modal-tabbable');
    },
  }
}

try {
  module.exports = navbarMain;
} catch {
  ; // eslint-disable-line
}
