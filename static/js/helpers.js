/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const defaultTransitionDuration = 500;
const defaultMessageTimeout = 4000;

function hDispatch(eventName, params={}) {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
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
    else if (activeElement === firstElement && !e.shiftKey) {
      selectFirstElement();
    }
    else if (activeElement === lastElement && e.shiftKey) {
      selectLastElement();
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
