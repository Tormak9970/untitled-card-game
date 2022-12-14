<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import type { FaceCards } from "../../lib/CardEnums";
  import { CARD_HEIGHT, CARD_WIDTH, ANIM_SPRITE_STRIP_WIDTH } from "../../lib/SpriteLUT";
  import type { JokerTypes, Suits } from "../../lib/Suits";

  export let card:FaceCards;
  export let suit:Suits|JokerTypes;

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

<div class="face-card" style="background-image: url({sprite}); background-position: left {offset.x}px top {offset.y}px; background-size: {ANIM_SPRITE_STRIP_WIDTH}px {CARD_HEIGHT}px;">

</div>

<style>
  @import "/theme.css";

  .face-card {
    width: 360px;
    height: 504px;
  }
</style>