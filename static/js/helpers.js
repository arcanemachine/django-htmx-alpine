const defaultTransitionLength = 500;
const defaultMessageTimeout = 4000;

const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}

function hHandleTabEvent(e, nextElement, previousElement) {
  if (e.shiftKey) {
    previousElement.focus();
  } else {
    nextElement.focus();
  }
}
