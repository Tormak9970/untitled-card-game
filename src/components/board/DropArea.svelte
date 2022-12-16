<script lang="ts">
  import { onMount } from "svelte";
  import { CARD_WIDTH, CARD_HEIGHT } from "../../lib/SpriteLUT";

  export let numCards:number;
  export let scale:number;

  let dropElem:HTMLDivElement;
  
  let show = false;

  function validateMove() {
    if (numCards == 0) {

    } else {

    }
  }
</script>

<div
  class="drag-area dropzone draggable-dropzone" class:show={show}
  style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;"
  bind:this={dropElem} />

<style>
  @import "/theme.css";

  .drag-area {
    pointer-events: none;
    border-radius: 8px;
    background-color: transparent;
    border: 2px dashed transparent;
    transition: all 0.4s ease-in-out;
  }

  :global(.draggable--over) {
    background-color: rgba(0, 0, 0, 0.1);
    border: 2px dashed var(--highlight);
  }
</style>