const defaultTransitionLength = 500;
const defaultMessageTimeout = 4000;

const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}

function hHandleTabEvent(e, tabbableClass, firstElement, lastElement) {
  if (!document.activeElement.classList.contains(tabbableClass)) {
    if (!e.shiftKey) {
      e.preventDefault();
      firstElement.focus();
    } else {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (document.activeElement === firstElement) {
      if (e.shiftKey) {
        e.preventDefault();
        lastElement.focus();
      }
    } else if (document.activeElement === lastElement) {
      if (!e.shiftKey) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}
