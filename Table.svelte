<script lang="ts">
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

  export let columns: Column[];
  export let data: any[];
  export let onClickRow = (id: any) => {};
  export let searchValue: string = "";
  export let selectable: boolean = false;
  export let selectedRows: any[] = [];
  export let tableClass = "";

  let filteredData = data;
  let sortColumn: string | null = null;
  let sortDirection: "asc" | "desc" = "asc";

  function handleRowCheckbox(e: Event, id: any) {
    const checked = (e.target as HTMLInputElement).checked;
    selectedRows = checked ? [...selectedRows, id] : selectedRows.filter((i) => i !== id);
  }

  function handleSort(columnKey: string) {
    if (sortColumn === columnKey) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortColumn = columnKey;
      sortDirection = "asc";
    }
  }

  function calcColumnSum(key: string): string {
    return filteredData
      .reduce((sum, item) => {
        const value = item[key];
        return sum + (typeof value === "number" ? value : 0);
      }, 0)
      .toFixed(2);
  }

  $: {
    let filtered = data;
    if (searchValue) {
      filtered = data.filter((item) =>
        columns.some((col) => {
          if (!col.searchable) return false;
          const value = col.modifier ? col.modifier(item[col.key]) : item[col.key];
          return String(value).toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    }

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    filteredData = filtered;
  }
</script>

<div class="overflow-x-auto">
  <table class={`svelte-table ${tableClass}`}>
    <thead>
      <tr>
        {#if selectable}
          <th></th>
        {/if}
        {#each columns as col}
          <th class={col.sortable ? "cursor-pointer" : ""} on:click={() => col.sortable && handleSort(col.key)}>
            {col.title}
            {col.key === sortColumn ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each filteredData as item}
        <tr class="cursor-pointer svelte-table-row">
          {#if selectable}
            <th>
              <label>
                <input on:change={(e) => handleRowCheckbox(e, item.id)} type="checkbox" class="checkbox" />
              </label>
            </th>
          {/if}
          {#each columns as { key, component, modifier }}
            <td on:click={() => onClickRow(item.id)}>
              {#if component}
                <svelte:component this={component} value={modifier ? modifier(item[key]) : item[key]} />
              {:else}
                {modifier ? modifier(item[key]) : item[key]}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        {#if selectable}
          <th></th>
        {/if}
        {#each columns as { key, totalCount, sumable, modifier }}
          <td>
            {#if sumable}
              {modifier ? modifier(calcColumnSum(key)) : calcColumnSum(key)}
            {:else if totalCount}
              Total : {filteredData.length}
            {/if}
          </td>
        {/each}
      </tr>
    </tfoot>
  </table>
</div>
