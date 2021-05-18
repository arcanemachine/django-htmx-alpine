const hDispatch = (eventName, params={}) => {
  return window.dispatchEvent(new CustomEvent(eventName, { detail: params }));
}
