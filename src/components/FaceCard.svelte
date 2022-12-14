<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../Controller";
  import type { FaceCards } from "../lib/CardEnums";
  import type { JokerTypes, Suits } from "../lib/Suits";
  import { CARD_HEIGHT, CARD_WIDTH } from "../Stores";

  export let card:FaceCards;
  export let suit:Suits|JokerTypes;

  const NUM_FRAMES = 8;

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  onMount(() => {
    const spriteInfo = Controller.getSprite(card, suit);

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;
  });
</script>

<div class="face-card" style="background-image: url({sprite}); background-position: left {offset.x}px top {offset.y}px; background-size: {CARD_WIDTH * NUM_FRAMES}px {CARD_HEIGHT}px;">

</div>

<style>
  @import "/theme.css";

  .face-card {
    width: 360px;
    height: 504px;
  }
</style>