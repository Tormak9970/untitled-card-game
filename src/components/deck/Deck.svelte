<script lang="ts">
  import DiscardPile from "./DiscardPile.svelte";
  import DrawPile from "./DrawPile.svelte";

  export let scale:number;
  export let uncoveredPercent:number;

  let increaseDrawZIndex:boolean;
</script>

<div class="deck">
  <div class="draw-cont" style="{increaseDrawZIndex ? "z-index: 10;": ""}">
    <DrawPile scale={scale} bind:shouldAnimate={increaseDrawZIndex} />
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