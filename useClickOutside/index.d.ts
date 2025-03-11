declare module "fkl-svelte/useClickOutside" {
  export function clickOutside(
    element: HTMLElement,
    callbackFunction: (e: Event) => void
  ): {
    update(newCallbackFunction: () => void): void;
    destroy(): void;
  };
}
