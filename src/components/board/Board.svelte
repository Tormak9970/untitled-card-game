<script lang="ts">
  import { cardColumns, refreshColumns } from "../../Stores";
  import CardColumn from "./CardColumn.svelte";

  export let scale:number;

  $: columns = [...$cardColumns];
</script>

<div class="board">
  <div class="column-container">
    {#key $refreshColumns}
      {#each columns as cards, idx (`${cards.size}|${idx}`)}
        <CardColumn playingCards={cards} column={idx} scale={scale} />
      {/each}
    {/key}
  </div>
</div>

<style>
  @import "/theme.css";

  @media (orientation: landscape) {
    .column-container {
      display: flex;
      flex-direction: row;

      width: 100%;
      height: 100%;
    }
  }

  @media (orientation: portrait) {
    .column-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      width: 100%;
      height: 100%;
    }
  }
</style>