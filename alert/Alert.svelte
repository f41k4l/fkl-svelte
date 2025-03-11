<script>
  import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-svelte";

  export let text;
  export let description = "";
  export let type = "info";
  export let disableIcon = false;
  export let uppercase = false;

  const alertClasses = {
    info: "fkl-svelte-alert-info",
    success: "fkl-svelte-alert-success",
    warning: "fkl-svelte-alert-warning",
    error: "fkl-svelte-alert-error",
  };

  const alertIcon = {
    info: BadgeInfo,
    success: BadgeCheck,
    warning: BadgeAlert,
    error: BadgeX,
  };
</script>

<alert class={`fkl-svelte-alert ${alertClasses[type]} flex justify-center w-auto shadow`}>
  {#if !disableIcon}
    <svelte:component this={alertIcon[type]} class="h-6 w-6" />
  {/if}
  <div class="flex flex-col">
    <p class={uppercase ? "uppercase text-lg font-bold" : ""}>{text}</p>
    {#if description}
      <span class="text-xs font-thin">{description}</span>
    {/if}
    <slot />
  </div>
</alert>
