declare module "fkl-svelte/alert" {
  import type { SvelteComponentTyped } from "svelte";

  export interface AlertProps {
    text: string;
    description?: string;
    type?: "info" | "success" | "warning" | "error";
    disableIcon?: boolean;
    uppercase?: boolean;
  }

  export default class Alert extends SvelteComponentTyped<AlertProps, any, any> {}
}
