<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import Card from "../cards/Card.svelte";
  import DropArea from "./DropArea.svelte";

  export let playingCards:PlayingCard[];
  export let column:number;

  const CARD_SCALE = 0.4;
  const UNCOVERED_PERCENT = 0.3;
</script>

<div class="card-column" style="width: {CARD_WIDTH * CARD_SCALE}px; height: {(playingCards.length) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT + (CARD_HEIGHT * CARD_SCALE)}px;">
  {#if playingCards.length > 0}
    {#each playingCards as playingCard, idx (`${playingCard.card} of ${playingCard.suit}`)}
      <Card card={playingCard.card} suit={playingCard.suit} revealed={playingCard.revealed} scale={CARD_SCALE} uncoveredPercent={UNCOVERED_PERCENT} column={column} row={idx} />
    {/each}
  {/if}
  <div class="card-wrapper" style="top: {(playingCards.length) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT}px;">
    <DropArea numCards={playingCards.length} scale={CARD_SCALE} />
  </div>
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