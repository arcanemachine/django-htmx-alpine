const defaultTransitionLength = 500;
const defaultMessageTimeout = 2000;

const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}
