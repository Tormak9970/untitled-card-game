<script lang="ts">
  import { Suits } from "../../lib/models/Suits";
  import { clubsPileList, diamondsPileList, heartsPileList, spadesPileList } from "../../Stores";
  import Pile from "./Pile.svelte";

  export let scale:number;
</script>

<div class="piles">
  <Pile scale={scale} suit={Suits.SPADE} suitPileList={spadesPileList} />
  <Pile scale={scale} suit={Suits.HEART} suitPileList={heartsPileList} />
  <Pile scale={scale} suit={Suits.CLUB} suitPileList={clubsPileList} />
  <Pile scale={scale} suit={Suits.DIAMOND} suitPileList={diamondsPileList} />
</div>

<style>
  @import "/theme.css";

  @media (orientation: landscape) {
    .piles {
      display: grid;
      grid-template-rows: repeat(1fr, 4);
      row-gap: 14px;
    }
  }

  @media (orientation: portrait) {
    .piles {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1.306vw;
      margin-right: 0.417vw;
    }
  }
</style>