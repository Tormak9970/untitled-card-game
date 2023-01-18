<script lang="ts">
  import type { Placement } from "tippy.js";
  import { Controller } from "../../../Controller";

  export let text: string;
  export let width = "40px";
  export let onClick: (e: MouseEvent) => void;
  export let disabled = false;
  
  export let tooltip = false;
  export let tooltipText = "";
  export let placement:Placement = 'top';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if tooltip}
  <button class="button" class:disabled={disabled} style="width: {width};" on:click={onClick} use:Controller.tippy={{content: tooltipText, placement: placement}}>
    <div>{text}</div>
  </button>
{:else}
  <button class="button" class:disabled={disabled} style="width: {width};" on:click={onClick}>
    <div>{text}</div>
  </button>
{/if}

<style>
  @import "/theme.css";

  .button {
    padding: 6px 12px;
    min-width: 40px;
    
    background-color: var(--background);
    border: 1px solid #000;
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 12px;
    cursor: pointer;

    color: rgb(231, 231, 231);
    
    font-family: 'PixelOperatorMono', sans-serif;
    font-size: 22px;
  }

  .button:hover {
    background-color: var(--background-hover);
  }

  .button:focus {
    border: 1px solid var(--highlight);
  }

  .disabled {
    pointer-events: none;
    opacity: 0.7;
  }
</style>
