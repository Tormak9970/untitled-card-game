<script lang="ts">
  import { fade } from "svelte/transition";

  export let showing:boolean;
  export function show(stat:boolean) {
    showing = stat;
  }

  export function isShowing() { return showing; }
</script>

{#if showing}
  <div class="modal-container" transition:fade={{duration: 200}}>
    <slot>

    </slot>
  </div>
{/if}

<style>
  .modal-container {
    z-index: 100;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgba(0.0, 0.0, 0.0, 0.7);

    pointer-events: all;
  }

  .hidden { display: none; }
</style>