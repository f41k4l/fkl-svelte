declare module "fkl-svelte/table" {
  import type { ComponentPropsWithoutRef } from "svelte";

  interface Column {
    title: string;
    key: string;
    searchable?: boolean;
    sortable?: boolean;
    sumable?: boolean;
    modifier?: (value: any) => any;
    totalCount?: boolean;
    component?: any;
  }

  export interface TableProps extends ComponentPropsWithoutRef<Table> {
    columns: Column[];
    data: any[];
    onClickRow?: (id: any) => void;
    searchValue?: string;
    selectable?: boolean;
    selectedRows?: any[];
    tableClass?: string;
  }
}
