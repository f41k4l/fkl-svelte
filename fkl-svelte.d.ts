declare module "fkl-svelte/alert" {
  import type { ComponentPropsWithoutRef } from "svelte";
  export interface AlertProps extends ComponentPropsWithoutRef<Alert> {
    text: string;
    description?: string;
    type?: "info" | "success" | "warning" | "error";
    disableIcon?: boolean;
    uppercase?: boolean;
  }
}

declare module "fkl-svelte/table" {
  import type { ComponentPropsWithoutRef } from "svelte";
  export interface TableProps extends ComponentPropsWithoutRef<Table> {
    data: any[];
    columns: Column[];
    search?: string;
    sort?: string;
    filter?: string;
    pagination?: boolean;
    loading?: boolean;
    emptyMessage?: string;
    noDataMessage?: string;
    rowClick?: (row: any) => void;
  }
}
