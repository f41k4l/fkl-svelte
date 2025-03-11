<script>
  import MoveUp from "lucide-svelte/icons/move-up";
  import { fly } from "svelte/transition";

  let y;
</script>

<svelte:window bind:scrollY={y} />

{#if y > 100}
  <div transition:fly={{ duration: 300, y: -60 }} class="fkl-svelte-scrolltop">
    <button class="fkl-svelte-scrolltop-button" on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <MoveUp class="h-auto w-auto" />
    </button>
  </div>
{/if}
