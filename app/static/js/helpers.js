/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

var defaultTransitionDuration = 500;
var defaultMessageTimeout = 4000;

function hDispatch(eventName, params={}) {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}

function hStatusMessageDisplay(message,
                               messageType='info',
                               timeout=undefined,
                               eventName=undefined) {
  return window.dispatchEvent(
    new CustomEvent('status-message-display', {
      detail: { message, messageType, timeout, eventName }
    }));
}

function hHandleTabEvent(
    e, firstElement, lastElement, tabbableClass=undefined) {
  let activeElement = e.target;
  let activeElementContainsTabbableClass =
    activeElement.classList.contains(tabbableClass);

  function selectFirstElement() {
    e.preventDefault();
    firstElement.focus();
  }

  function selectLastElement() {
    e.preventDefault();
    lastElement.focus();
  }

  function selectFirstOrLastElement() {
    if (!e.shiftKey) {
      e.preventDefault();
      firstElement.focus();
    }
    else {
      e.preventDefault();
      lastElement.focus();
    }
  }

  if (tabbableClass) {
    if (!activeElementContainsTabbableClass) {
      selectFirstOrLastElement();
    }
    else if (activeElement === firstElement && e.shiftKey) {
      selectLastElement();
    }
    else if (activeElement === lastElement && !e.shiftKey) {
      selectFirstElement();
    }
  } else {
    // if no tabbableClass given, toggle between the two given elements
    if (activeElement === firstElement) {
      selectLastElement();
    } else {
      selectFirstElement();
    }
  }
}

try {
  module.exports = {
    defaultTransitionDuration,
    defaultMessageTimeout,
    hDispatch,
    hHandleTabEvent
  };
} catch {
  ; // eslint-disable-line
}
