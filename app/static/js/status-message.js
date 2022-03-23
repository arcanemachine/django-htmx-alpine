/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

function statusMessageComponent() {
  return {
    // data
    show: false,
    colors: {},
    eventName: undefined,
    eventParams: {},
    statusMessageText: "",
    statusMessageTimeout: undefined,

    infoBackground: "#3E8ED0",
    successBackground: "#48C78E",
    warningBackground: "#FFE08A",
    dangerBackground: "#F14668",

    // methods
    getColors(messageType) {
      let background;
      let text;

      let infoText = (successText = dangerText = "white");
      let warningText = "black";

      if (messageType === 20 || messageType == "info") {
        background = this.infoBackground;
        text = infoText;
      } else if (messageType === 25 || messageType == "success") {
        background = this.successBackground;
        text = successText;
      } else if (messageType === 30 || messageType == "warning") {
        background = this.warningBackground;
        text = warningText;
      } else if (messageType === 40 || messageType == "danger") {
        background = this.dangerBackground;
        text = dangerText;
      } else {
        background = this.infoBackground;
        text = infoText;
      }
      return { background, text };
    },
    handleStatusMessageClick() {
      if (this.eventName) {
        this.$nextTick(() => {
          hDispatch(this.eventName, this.eventParams);
        });
      }
      this.statusMessageClear();
    },
    processContext(context) {
      let result = {};
      if (typeof context === "string") {
        result.message = context;
      } else if (typeof context === "object") {
        if (context.message === undefined) {
          console.error("Context must contain non-empty 'message'.");
          return false;
        }

        result.message = context.message;
        result.messageType = context.messageType;
        result.timeout = context.timeout;

        if (context.eventName) {
          this.eventName = context.eventName;
          this.eventParams = context.eventParams;
        } else {
          this.eventName = undefined;
          this.eventParams = {};
        }
      } else {
        console.error("context must be object or string");
        return false;
      }

      // timeout
      if (!context.timeout) {
        result.timeout = defaultMessageTimeout;
      }

      return result;
    },
    statusMessageClear() {
      clearTimeout(this.statusMessageTimeout);
      this.show = false;
      setTimeout(() => {
        // clear the text
        this.statusMessageText = "";

        // clear any events
        this.eventName = "";
        this.eventParams = {};
      }, defaultTransitionDuration);
    },
    statusMessageDisplay(context) {
      let statusMessageEl = this.$refs.statusMessageEl;

      context = this.processContext(context);
      let message = context.message;
      let timeout = context.timeout;
      let messageType = context.messageType;

      this.colors = this.getColors(messageType);

      if (this.statusMessageText) {
        // if existing status message present, clear it and display new one
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
  };
}

try {
  module.exports = statusMessageComponent;
} catch {
  // eslint-disable-line
}
