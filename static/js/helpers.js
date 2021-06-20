const defaultTransitionLength = 500;
const defaultMessageTimeout = 4000;

const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}

function hHandleTabEvent(
    e, firstElement, lastElement, tabbableClass=undefined) {
  let activeElement = document.activeElement;

  if (tabbableClass && !activeElement.classList.contains(tabbableClass)) {
    if (!e.shiftKey) {
      e.preventDefault();
      firstElement.focus();
    } else {
      e.preventDefault();
      lastElement.focus();
    }
  } else {
    if (activeElement === firstElement) {
      if (e.shiftKey) {
        e.preventDefault();
        lastElement.focus();
      }
    } else if (activeElement === lastElement) {
      if (!e.shiftKey) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

}
