<script lang="ts">
  import { cardColumns } from "../../Stores";
  import CardColumn from "./CardColumn.svelte";
</script>

<div class="board">
  <div class="column-container">
    {#each $cardColumns as cards}
      <CardColumn playingCards={cards} />
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