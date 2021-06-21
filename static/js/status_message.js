function statusMessageNotificationData() {
  return {
    // data
    show: false,
    statusMessageText: '',
    statusMessageTimeout: undefined,

    // methods
    getColors(messageType) {
      let background = '';
      let text = '';
      if (messageType === '20' || messageType == 'info') {
        background = 'info';
        text = 'white';
      } else if (messageType === '25' || messageType == 'success') {
        background = 'success';
        text = 'white';
      } else if (messageType === '30' || messageType == 'warning') {
        background = 'warning';
        text = 'black';
      } else if (messageType === '40' || messageType == 'danger') {
        background = 'danger';
        text = 'white';
      }
      if (background) {
        return { background, text };
      } else {
        return {
          background: 'info',
          text: 'white'
        };
      }
    },
    receiveStatusMessageDisplay(event) {
      if (typeof(event.detail) === 'string') {
        this.statusMessageDisplay(event.detail);
      } else {
        this.statusMessageDisplay(event.detail.message,
                                  event.detail.messageType,
                                  event.detail.timeout);
      }
    },
    statusMessageDisplay(message, timeout=undefined, messageType=undefined) {
      // if a status message is already present,
      // then clear it and display a new one
      if (this.statusMessageText) {
        this.statusMessageClear();
        setTimeout(() => {
          this.statusMessageDisplay(message, timeout, messageType);
        }, defaultTransitionDuration);
        return false;
      }

      clearTimeout(this.statusMessageTimeout);
      if (timeout === undefined) {
        // if no timeout is given, display the message for 4 seconds
        timeout = defaultMessageTimeout;
      } else if (timeout === -1) {
        // if timeout == -1, display the message forever
        timeout = 9999999;
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
