<script lang="ts">
  import DiscardPile from "./DiscardPile.svelte";
  import DrawPile from "./DrawPile.svelte";

  export let scale:number;

</script>

<div class="deck">
  <div class="draw-cont">
    <DrawPile scale={scale} />
  </div>
  <div class="discard-cont">
    <DiscardPile scale={scale} />
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