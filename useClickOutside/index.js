export function clickOutside(element, callbackFunction) {
  function onClick(event) {
    if (!element.contains(event.target)) {
      callbackFunction(e);
    }
  }

  document.body.addEventListener("click", onClick);

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener("click", onClick);
    },
  };
}
