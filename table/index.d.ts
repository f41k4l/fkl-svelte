declare module "fkl-svelte/table" {
  import type { SvelteComponentTyped } from "svelte";

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

  export interface TableProps {
    columns: Column[];
    data: any[];
    onClickRow?: (id: any) => void;
    searchValue?: string;
    selectable?: boolean;
    sticky?: boolean;
    selectedRows?: any[];
    tableClass?: string;
  }

  export default class Table extends SvelteComponentTyped<TableProps, any, any> {}
}
