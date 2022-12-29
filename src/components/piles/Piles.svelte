<script lang="ts">
  import { Suits } from "../../lib/models/Suits";
  import { clubsPileId, clubsPileList, diamondPileId, diamondsPileList, heartsPileId, heartsPileList, spadesPileId, spadesPileList } from "../../Stores";
  import Pile from "./Pile.svelte";

  export let scale:number;
</script>

<div class="piles">
  <Pile scale={scale} suit={Suits.SPADE} suitPileId={$spadesPileId} suitPileList={$spadesPileList} />
  <Pile scale={scale} suit={Suits.HEART} suitPileId={$heartsPileId} suitPileList={$heartsPileList} />
  <Pile scale={scale} suit={Suits.CLUB} suitPileId={$clubsPileId} suitPileList={$clubsPileList} />
  <Pile scale={scale} suit={Suits.DIAMOND} suitPileId={$diamondPileId} suitPileList={$diamondsPileList} />
</div>

<style>
  @import "/theme.css";

  .piles {
    display: grid;
    grid-template-rows: repeat(1fr, 4);
    row-gap: 14px;
  }
</style>