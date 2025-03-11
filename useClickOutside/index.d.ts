declare module "fkl-svelte/useClickOutside" {
  export function clickOutside(
    element: HTMLElement,
    callbackFunction: () => void
  ): {
    update(newCallbackFunction: () => void): void;
    destroy(): void;
  };
}
