<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import type { FaceCards } from "../../lib/models/CardEnums";
  import { CARD_HEIGHT, CARD_WIDTH, ANIM_SPRITE_STRIP_WIDTH } from "../../lib/SpriteLUT";
  import type { JokerTypes, Suits } from "../../lib/models/Suits";

  export let card:FaceCards;
  export let suit:Suits|JokerTypes;
  export let scale:number;

  let shouldAnimate = true;

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  onMount(() => {
    const spriteInfo = Controller.getSprite(card, suit);

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;

    setInterval(() => {
      if (shouldAnimate) {
        if (offset.x == 0) {
          shouldAnimate = false;
          setTimeout(() => {
            offset.x = ANIM_SPRITE_STRIP_WIDTH - CARD_WIDTH;
            shouldAnimate = true;
          }, Controller.ANIM_PAUSE_LENGTH);
        } else {
          offset.x = (offset.x - CARD_WIDTH) % (ANIM_SPRITE_STRIP_WIDTH);
        }
      }
    }, Controller.ANIM_SPEED)
  });
</script>

<div class="face-card" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; background-image: url({sprite}); background-position: left {offset.x * scale}px top {offset.y * scale}px; background-size: {ANIM_SPRITE_STRIP_WIDTH * scale}px {CARD_HEIGHT * scale}px;" />

<style>
  @import "/theme.css";
</style>