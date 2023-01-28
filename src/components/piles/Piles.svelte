<script lang="ts">
  import { Suits } from "../../lib/models/Suits";
    import { CARD_WIDTH } from "../../lib/SpriteLUT";
  import { clubsPileList, diamondsPileList, heartsPileList, spadesPileList } from "../../Stores";
  import Pile from "./Pile.svelte";

  export let scale:number;
</script>

<div class="piles" style="--grid-spacing: {CARD_WIDTH * scale + Math.floor(8 * (1 / 0.4) * scale)}px;">
  <Pile scale={scale} suit={Suits.SPADE} suitPileList={spadesPileList} />
  <Pile scale={scale} suit={Suits.HEART} suitPileList={heartsPileList} />
  <Pile scale={scale} suit={Suits.CLUB} suitPileList={clubsPileList} />
  <Pile scale={scale} suit={Suits.DIAMOND} suitPileList={diamondsPileList} />
</div>

<style>
  @import "/theme.css";

  :root {
    --grid-spacing: 63px;
  }

  @media (orientation: landscape) and (min-height: 810px) {
    .piles {
      display: grid;
      row-gap: 14px;
    }
  }

  @media (orientation: landscape) and (max-height: 809px) {
    .piles {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, var(--grid-spacing));
      row-gap: 7px;
      column-gap: 7px;
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