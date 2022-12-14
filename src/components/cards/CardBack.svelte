<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import { BASE_SPRITE_SHEET_HEIGHT, BASE_SPRITE_SHEET_WIDTH } from "../../lib/SpriteLUT";

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  onMount(() => {
    const spriteInfo = Controller.getCardBackSprite();

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;
  });
</script>

<div class="card-back" style="background-image: url({sprite}); background-position: left {-1 * offset.x}px top {offset.y}px; background-size: {BASE_SPRITE_SHEET_WIDTH}px {BASE_SPRITE_SHEET_HEIGHT}px;">

</div>

<style>
  @import "/theme.css";

  .card-back {
    width: 360px;
    height: 504px;
  }
</style>