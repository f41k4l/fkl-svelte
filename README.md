- [Installation](#installation)
  - [With `npm`](#with-npm)
  - [With `pnpm`](#with-pnpm)
  - [With `yarn`](#with-yarn)
  - [With `bun`](#with-bun)
- [Dependencies](#dependencies)
- [Example usage](#example-usage)
  - [Alert](#alert)
    - [Component](#component)
    - [CSS](#css)
  - [Toast](#toast)
    - [Component](#component-1)
    - [CSS](#css-1)
  - [Table](#table)
    - [Component](#component-2)
    - [CSS](#css-2)

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

# Dependencies

- Svelte (can run without sveltekit)
- TailwindCSS
- DaisyUI
- Lucide Icons

```bash
bun install -D svelte tailwindcss daisyui lucide-svelte @tailwindcss/vite
```

# Example usage

## Alert

### Component

```svelte
<script>
  import Alert from 'fkl-svelte/alert';
</script>

<Alert text="Hello world" type="success" description="This is a success alert" />
```

### CSS

```css
@import "tailwindcss";
@plugin "daisyui"

@layer base {
  .fkl-svelte-alert {
    @apply alert;
  }

  .fkl-svelte-alert-info {
    @apply alert-info;
  }

  .fkl-svelte-alert-success {
    @apply alert-success;
  }

  .fkl-svelte-alert-warning {
    @apply alert-warning;
  }

  .fkl-svelte-alert-error {
    @apply alert-error;
  }
}
```

## Toast

### Component

```svelte
<script>
  import Toast from 'fkl-svelte/toast';
  import { T } from 'fkl-svelte/toast';
</script>

<button on:click={() => T("Hello world", "success")}></button>
<Toast />
```

### CSS

```css
@import "tailwindcss";
@plugin "daisyui"

@layer base {
  .fkl-svelte-toast {
    @apply toast-bottom toast-center cursor-pointer;
  }
}
```

## Table

### Component

```svelte
<script>
  import Table from 'fkl-svelte/table';

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

### CSS

```css

```
