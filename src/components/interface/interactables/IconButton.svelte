<script lang="ts">
  export let onClick: (e: MouseEvent) => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button class="button" on:click={onClick}>
  <slot />
</button>

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
