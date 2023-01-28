<script lang="ts">
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  
  export let scale:number;
  export let height = CARD_HEIGHT * scale + Math.floor(8 * (1 / 0.4) * scale);
  export let width = CARD_WIDTH * scale + Math.floor(8 * (1 / 0.4) * scale);
</script>

<div class="card-container">
  <div class="border-edge" style="width: {width}px; height: {height}px;">
    <div class="card-inner" style="width: calc(100% - {Math.floor(8 * (1 / 0.4) * scale)}px); height: calc(100% - {Math.floor(8 * (1 / 0.4) * scale)}px);">
      <slot />
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .border-edge {
    background-color: var(--highlight);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card-inner {
    background-color: var(--foreground);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
  }
</style>