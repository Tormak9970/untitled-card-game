<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import type { BaseCards } from "../../lib/models/CardEnums";
  import { BASE_SPRITE_SHEET_HEIGHT, BASE_SPRITE_SHEET_WIDTH } from "../../lib/SpriteLUT";
  import type { Suits } from "../../lib/models/Suits";

  export let card:BaseCards;
  export let suit:Suits;

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

<div class="base-card" style="background-image: url({sprite}); background-position: left {-1 * offset.x}px top {offset.y}px; background-size: {BASE_SPRITE_SHEET_WIDTH}px {BASE_SPRITE_SHEET_HEIGHT}px;">

</div>

<style>
  @import "/theme.css";

  .base-card {
    width: 360px;
    height: 504px;
  }
</style>