declare module "fkl-svelte/useClickOutside" {
  export function clickOutside(
    element: HTMLElement,
    callbackFunction: (clickEvent: Event) => void
  ): {
    update(newCallbackFunction: () => void): void;
    destroy(): void;
  };
}
