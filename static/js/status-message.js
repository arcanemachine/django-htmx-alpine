/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

function statusMessageComponent() {
  return {
    // data
    show: false,
    colors: {},
    eventName: undefined,
    eventParams: {},
    statusMessageText: '',
    statusMessageTimeout: undefined,

    infoBackground: '#3E8ED0',
    successBackground: '#48C78E',
    warningBackground: '#FFE08A',
    dangerBackground: '#F14668',

    // methods
    getColors(messageType) {
      let background;
      let text;

      let infoText = successText = dangerText = 'white';
      let warningText = 'black';

      if (messageType === 20 || messageType == 'info') {
        background = this.infoBackground;
        text = infoText;
      } else if (messageType === 25 || messageType == 'success') {
        background = this.successBackground;
        text = successText;
      } else if (messageType === 30 || messageType == 'warning') {
        background = this.warningBackground;
        text = warningText;
      } else if (messageType === 40 || messageType == 'danger') {
        background = this.dangerBackground;
        text = dangerText;
      } else {
        background = this.infoBackground;
        text = infoText;
      }
      return { background, text };
    },
    dispatchEvent() {
      return window.dispatchEvent(
        new CustomEvent(this.eventName, { detail: this.eventParams })
      );
    },
    handleStatusMessageClick() {
      this.$nextTick(() => { this.dispatchEvent() })
      this.statusMessageClear();
    },
    statusMessageClear() {
      clearTimeout(this.statusMessageTimeout);
      this.show = false;
      this.$nextTick(() => {
        // clear the text
        this.statusMessageText = '';

        // clear any events
        this.eventName = '';
        this.eventParams = {};
      }, defaultTransitionDuration)
    },
    statusMessageDisplay(context) {
      let message;
      let timeout;
      let messageType;
      let statusMessageEl = this.$refs.statusMessageEl;

      if (typeof(context) === 'object') {
        // extract properties from context
        message = context.message;
        timeout = context.timeout;
        messageType = context.messageType;
        if (context.eventName) {
          this.eventName = context.eventName;
          this.eventParams = context.eventParams;
        } else {
          this.eventName = undefined;
          this.eventParams = {};
        }
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
    }
  }
}

try {
  module.exports = statusMessageComponent;
} catch {
  ; // eslint-disable-line
}
