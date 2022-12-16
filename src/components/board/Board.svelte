<script lang="ts">
  import { cardColumns } from "../../Stores";
  import CardColumn from "./linkedList/CardColumn.svelte";

  let board:HTMLDivElement;

  $: columns = [...$cardColumns];
</script>

<div class="board" bind:this={board}>
  <div class="column-container">
    {#each columns as cards, idx (cards.size)}
      <CardColumn playingCards={cards} column={idx} />
    {/each}
  </div>
</div>

<style>
  @import "/theme.css";

  .board { perspective: 1000px; }

  .column-container {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 100%;
    transform: rotateX(3deg) rotateY(0deg) rotateZ(0deg);
  }
</style>