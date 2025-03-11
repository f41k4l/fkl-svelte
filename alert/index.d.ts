declare module "alert" {
  import type { ComponentPropsWithoutRef } from "svelte";
  export interface AlertProps extends ComponentPropsWithoutRef<Alert> {
    text: string;
    description?: string;
    type?: "info" | "success" | "warning" | "error";
    disableIcon?: boolean;
    uppercase?: boolean;
  }
}
