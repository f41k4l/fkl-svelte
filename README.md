- [Installation](#installation)
  - [With `npm`](#with-npm)
  - [With `pnpm`](#with-pnpm)
  - [With `yarn`](#with-yarn)
  - [With `bun`](#with-bun)
  - [Adding class to your css](#adding-class-to-your-css)
- [Dependencies](#dependencies)
- [Example usage](#example-usage)

# Installation

## With `npm`

```bash
npm install git+https://github.com/f41k4l/fkl-svelte.git#main
```

## With `pnpm`

```bash
pnpm install git+https://github.com/f41k4l/fkl-svelte.git#main
```

## With `yarn`

```bash
yarn install git+https://github.com/f41k4l/fkl-svelte.git#main
```

## With `bun`

```bash
bun install git+https://github.com/f41k4l/fkl-svelte.git#main
```

## Adding class to your css

```css
@import "tailwindcss";
@plugin "daisyui"

@layer base {
  .fkl-svelte-table {
    @apply table;
  }

  .fkl-svelte-table-row {
    @apply hover:bg-neutral;
  }
}
```

# Dependencies

- Svelte (can run without sveltekit)
- TailwindCSS
- DaisyUI
- Lucide Icons

```bash
bun install -D svelte tailwindcss daisyui lucide-svelte @tailwindcss/vite
```

# Example usage

```svelte
<script>
  import Table from 'fkl-svelte/Table.svelte';

  let searchValue = ""

  const columns = [
    {
      title: "Name",
      key: "name",
      totalCount: true,
      searchable: true
    },
    {
      title: "Price",
      key: "price",
      sortable: true,
      modifier: (value) => `${value}$`
    }
  ];

  let selectedRows = []

  function onClickRow(id) {
    window.alert(`Clicked row: ${id}`)
  }

  function fetchData() {
    const data = [
      {
        name: "Apple",
        price: 1.50
      },
      {
        name: "Banana",
        price: 2.00
      }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(data), 2000);
    });
  }
</script>

<input type="text" bind:value={searchValue} />
{#await fetchData()}
  <span>Loading...</span>
{:then data}
  <Table
    {columns}
    {data}
    {searchValue}
    {onClickRow}
    selectable
    bind:selectedRows
  />
{/await}
```
