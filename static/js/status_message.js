function statusMessageNotification() {
  return {
    // data
    show: false,
    statusMessageText: '',
    statusMessageTimeout: undefined,
    colors: {},


    // methods
    getColors(messageType) {
      // info: #3E8ED0, success: #48C78E, warning: #FFE08A, danger: #F14668
      let background = '';
      let text = '';
      if (messageType === 20 || messageType == 'info') {
        background = '#3E8ED0';
        text = 'white';
      } else if (messageType === 25 || messageType == 'success') {
        background = '#48C78E';
        text = 'white';
      } else if (messageType === 30 || messageType == 'warning') {
        background = '#FFE08A';
        text = 'black';
      } else if (messageType === 40 || messageType == 'danger') {
        background = '#F14668';
        text = 'white';
      } else {
        background = '#3E8ED0'; // defaults to 'info' status message
        text = 'white';
      }
      return { background, text };
    },
    statusMessageDisplay(context) {
      let message;
      let timeout;
      let messageType;
      let statusMessageEl = document.querySelector('#status-message');

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

      // get timeout
      if (!timeout) {
        timeout = defaultMessageTimeout;
      } else if (timeout === -1) {
        timeout = 9999999;  // display the message forever or until clicked
      }

      // get colors
      this.colors = this.getColors(messageType);

      // if a status message is already present, clear it and display a new one
      if (this.statusMessageText) {
        this.statusMessageClear();
        this.statusMessageTimeout = setTimeout(() => {
          this.statusMessageDisplay(context);
          // apply colors
          statusMessageEl.style.color = this.colors.text;
          statusMessageEl.style.backgroundColor = this.colors.background;
        }, defaultTransitionDuration);
        return false;
      } else {
        // apply colors
        statusMessageEl.style.color = this.colors.text;
        statusMessageEl.style.backgroundColor = this.colors.background;
      }

      // display the message
      this.show = true;
      this.statusMessageText = message;
      this.statusMessageTimeout = setTimeout(() => {
        // clear the message
        this.statusMessageClear();
      }, timeout + defaultTransitionDuration);
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
