import { SvelteComponentTyped } from "svelte";

type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  text?: string;
  type?: ToastType;
}

export default class Toast extends SvelteComponentTyped<ToastProps, {}, {}> {}
