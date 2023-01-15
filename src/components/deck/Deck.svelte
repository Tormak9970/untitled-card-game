<script lang="ts">
    import { discardPileList, drawPileList, shouldAnimateDrawPile, shouldPlayRedoAnim, shouldPlayUndoAnim } from "../../Stores";
  import DiscardPile from "./DiscardPile.svelte";
  import DrawPile from "./DrawPile.svelte";

  export let scale:number;
  export let uncoveredPercent:number;

  let shouldAnimate:boolean;
</script>

<div class="deck">
  <div class="draw-cont" style="{shouldAnimate || ($shouldAnimateDrawPile && $shouldPlayRedoAnim && $discardPileList.length == 0) || ($drawPileList.length != 0 && $shouldPlayUndoAnim && $shouldAnimateDrawPile) ? "z-index: 100;": ""}">
    <DrawPile scale={scale} bind:shouldAnimate={shouldAnimate} />
  </div>
  <div class="discard-cont">
    <DiscardPile scale={scale} uncoveredPercent={uncoveredPercent} />
  </div>
</div>

<style>
  @import "/theme.css";

  .deck {
    margin-top:7px;

    display: flex;
  }

  .draw-cont {
    margin-right: 7px;
  }

  .discard-cont {
    margin-left: 7px;
  }
</style>