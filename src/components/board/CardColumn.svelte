<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import Card from "../cards/Card.svelte";

  export let playingCards:PlayingCard[];
  console.log(playingCards)

  const CARD_SCALE = 0.4;
  const UNCOVERED_PERCENT = 0.3;
</script>

<div class="card-column" style="width: {CARD_WIDTH * CARD_SCALE}px; height: {(playingCards.length - 1) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT + (CARD_HEIGHT * CARD_SCALE)}px;">
  {#if playingCards.length > 0}
    {#each playingCards as playingCard, idx (`${playingCard.card} of ${playingCard.suit}`)}
      <div class="card-wrapper" style="top: {(idx) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT}px;" animate:flip>
        <Card card={playingCard.card} suit={playingCard.suit} faceDown={!playingCard.revealed} scale={CARD_SCALE} />
      </div>
    {/each}
  {/if}
</div>

<style>
  @import "/theme.css";

  .card-column {
    position: relative;
    margin-left: 3.5px;
    margin-right: 3.5px;
    margin-top: 7px;
  }

  .card-wrapper {
    position: absolute;
  }
</style>