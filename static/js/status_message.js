function statusMessageNotification() {
  return {
    // data
    show: false,
    statusMessageText: '',
    statusMessageTimeout: undefined,

    // methods
    getColors(messageType) {
      let background = '';
      let text = '';
      if (messageType === 20 || messageType == 'info') {
        background = 'info';
        text = 'white';
      } else if (messageType === 25 || messageType == 'success') {
        background = 'success';
        text = 'white';
      } else if (messageType === 30 || messageType == 'warning') {
        background = 'warning';
        text = 'black';
      } else if (messageType === 40 || messageType == 'danger') {
        background = 'danger';
        text = 'white';
      } else {
        background = 'info';
        text = 'white';
      }
      return { background, text };
    },
    // statusMessageDisplay(message, timeout=undefined, messageType=undefined) {
    statusMessageDisplay(context) {
      let message;
      let timeout;
      let messageType;

      // abort with error if context is not object
      if (typeof(context) === 'object') {
        // extract properties from context
        message = context.message;
        timeout = context.timeout;
        messageType = context.messageType;
      } else if (typeof(context) === 'string') {
        message = context;
      }

      // abort with error if no message present
      if (message === undefined) {
        console.error("Context must contain non-empty 'message'. Aborting...");
        return false;
      }

      // if a status message is already present, clear it and display a new one
      if (this.statusMessageText) {
        this.statusMessageClear();
        setTimeout(() => {
          this.statusMessageDisplay(message, timeout, messageType);
        }, defaultTransitionDuration);
        return false;
      }

      // remove statusMessageTimeout
      clearTimeout(this.statusMessageTimeout);

      // get timeout
      if (!timeout) {
        timeout = defaultMessageTimeout;
      } else if (timeout === -1) {
        timeout = 9999999;  // display the message forever
      }

      // apply colors
      colors = this.getColors(messageType);
      let currentEl = document.querySelector('#status-message');
      if (messageType) {
        if (currentEl) {
          // add colors
          currentEl.classList.add(`has-background-${colors.background}`);
          currentEl.classList.add(`has-text-${colors.text}`);
        }
      }

      // display the message
      this.show = true;
      this.statusMessageText = message;
      this.statusMessageTimeout = setTimeout(() => {
        // clear the message and remove any color classes
        this.statusMessageClear();
        if (Object.keys(colors).length) {
          setTimeout(() => {
            currentEl.classList
              .remove(`has-background-${colors.background}`);
            currentEl.classList
              .remove(`has-text-${colors.text}`);
          }, defaultTransitionDuration);
        }
      }, timeout);
    },
    statusMessageClear() {
      clearTimeout(this.statusMessageTimeout);
      this.show = false;
      setTimeout(() => {
        this.statusMessageText = '';
      }, defaultTransitionDuration)
    }
  }
}
