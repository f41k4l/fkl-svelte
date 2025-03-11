import { SvelteComponentTyped } from "svelte";

type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  className?: string;
}

export function T(text?: string, type?: ToastType): void;

export default class Toast extends SvelteComponentTyped<ToastProps, {}, {}> {}
