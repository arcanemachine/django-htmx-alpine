const defaultTransitionLength = 500;
const defaultMessageTimeout = 4000;

const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}
