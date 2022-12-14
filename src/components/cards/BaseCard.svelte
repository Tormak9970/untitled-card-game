<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import type { BaseCards } from "../../lib/models/CardEnums";
  import { BASE_SPRITE_SHEET_HEIGHT, BASE_SPRITE_SHEET_WIDTH, CARD_WIDTH, CARD_HEIGHT } from "../../lib/SpriteLUT";
  import type { Suits } from "../../lib/models/Suits";

  export let card:BaseCards;
  export let suit:Suits;
  export let scale:number;

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

<div style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; background-image: url({sprite}); background-position: left {-1 * offset.x * scale}px top {-1 * offset.y * scale}px; background-size: {BASE_SPRITE_SHEET_WIDTH * scale}px {BASE_SPRITE_SHEET_HEIGHT * scale}px;" />

<style>
  @import "/theme.css";
</style>