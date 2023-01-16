<script lang="ts">
  import type { Placement } from "tippy.js";
  import { Controller } from "../../../Controller";

  export let onClick: (e: MouseEvent) => void;

  export let tooltip = false;
  export let tooltipText = "";
  export let placement:Placement = 'top';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if tooltip}
  <button class="button" on:click={onClick} use:Controller.tippy={{content: tooltipText, placement: placement}}>
    <slot />
  </button>
{:else}
  <button class="button" on:click={onClick}>
    <slot />
  </button>
{/if}

<style>
  @import "/theme.css";

  .button {
    padding: 6px;
    
    background-color: var(--background);
    border: 1px solid #000;
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    cursor: pointer;
  }

  .button:hover {
    background-color: var(--background-hover);
  }

  .button:focus {
    border: 1px solid var(--highlight);
  }
</style>
