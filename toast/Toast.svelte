<script>
  import { fly } from "svelte/transition";
  import Alert from "../alert/Alert.svelte";
  import { toast } from "./store";

  let text;
  let type;
  let toastClass = "";

  toast.subscribe((value) => {
    if (!value) return;
    text = value.text;
    type = value.type;
  });
</script>

{#if text}
  <button transition:fly={{ y: 50, duration: 400 }} on:click={() => (text = "")} class={toastClass}>
    <Alert {text} {type} />
  </button>
{/if}
