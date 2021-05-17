
// display status messages
let statusMessage = '';
let statusMessageTimeout;

const statusMessageDisplay = (message, timeout=undefined) => {
  // if a status message is already present, clear it
  if (statusMessage) {
    statusMessage = '';
    clearTimeout(statusMessageTimeout);
    setTimeout(() => {
      statusMessageDisplay(message, timeout);
    }, 500);
    return false;
  }

  clearTimeout(statusMessageTimeout);
  if (timeout === undefined) {
    // if no timeout is given, display the message for 4 seconds
    timeout = 4000;
  } else if (timeout === -1) {
    // if timeout == -1, display the message forever
    timeout = 1000000;
  }

  statusMessage = message
  statusMessageTimeout = setTimeout(() => statusMessage = '', timeout);
}

const statusMessageClear = () => {
  statusMessage = '';
  clearTimeout(statusMessageTimeout);
  statusMessageDisplay('', 0);
}

const receiveStatusMessageDisplay = (event) => {
  if (typeof(event.detail) === 'string') {
    statusMessageDisplay(event.detail);
  } else {
    statusMessageDisplay(event.detail.message, event.detail.timeout);
  }
}

const hDispatch = (eventName) => {
  return window.dispatchEvent(new CustomEvent(eventName));
}
