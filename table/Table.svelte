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
  export let sticky: boolean = false;
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

  function getNestedValue(item: any, key: string): any {
    return key.split(".").reduce((obj, k) => (obj && obj[k] !== "undefined" ? obj[k] : null), item);
  }

  function calcColumnSum(key: string): string {
    return filteredData
      .reduce((sum, item) => {
        const value = getNestedValue(item, key);
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
          const value = col.modifier ? col.modifier(getNestedValue(item, col.key)) : getNestedValue(item, col.key);
          return String(value).toLowerCase().includes(searchValue.toLowerCase());
        })
      );
    }

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = getNestedValue(a, sortColumn);
        const bValue = getNestedValue(b, sortColumn);

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    filteredData = filtered;
  }
</script>

<div class="overflowtable">
  <table class={`fkl-svelte-table ${tableClass}`}>
    <thead class={sticky ? "sticky-header" : ""}>
      <tr>
        {#if selectable}
          <th></th>
        {/if}
        {#each columns as col}
          <th class={col.sortable ? "cursorpointer" : ""} on:click={() => col.sortable && handleSort(col.key)}>
            {col.title}
            {col.key === sortColumn ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each filteredData as item}
        <tr class="fkl-svelte-table-row">
          {#if selectable}
            <th>
              <label>
                <input
                  on:change={(e) => handleRowCheckbox(e, item.id)}
                  type="checkbox"
                  class="fkl-svelte-table-checkbox"
                />
              </label>
            </th>
          {/if}
          {#each columns as { key, component, modifier }}
            <td on:click={() => onClickRow(item.id)}>
              {#if component}
                <svelte:component
                  this={component}
                  value={modifier ? modifier(getNestedValue(item, key)) : getNestedValue(item, key)}
                />
              {:else}
                {modifier ? modifier(getNestedValue(item, key)) : getNestedValue(item, key)}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
    <tfoot class={sticky ? "sticky-footer" : ""}>
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

<style>
  .cursorpointer {
    cursor: pointer;
  }

  .overflowtable {
    overflow-x: auto;
  }

  .sticky-header th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .sticky-footer td {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }
</style>
