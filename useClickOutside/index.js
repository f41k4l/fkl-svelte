export function clickOutside(element, callbackFunction) {
  function onClick(clickEvent) {
    if (!element.contains(clickEvent.target)) {
      callbackFunction(clickEvent);
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
