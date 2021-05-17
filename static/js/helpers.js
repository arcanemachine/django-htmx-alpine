const hDispatch = (eventName) => {
  return window.dispatchEvent(new CustomEvent(eventName));
}
