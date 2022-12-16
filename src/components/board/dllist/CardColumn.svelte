<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../../lib/SpriteLUT";
  import Card from "../../cards/Card.svelte";
  import DropArea from "../DropArea.svelte";
  import type { DLList } from "../../../lib/data-structs/DLList";
  import CardNode from "./CardNode.svelte";

  export let playingCards:DLList<PlayingCard>;
  export let column:number;

  const CARD_SCALE = 0.4;
  const UNCOVERED_PERCENT = 0.3;
</script>

<div class="card-column" style="width: {CARD_WIDTH * CARD_SCALE}px; height: {(playingCards.size) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT + (CARD_HEIGHT * CARD_SCALE)}px;">
  <CardNode card={playingCards.first.next} column={column} row={0} />
  <!-- {#if playingCards.size > 0}
    {#each playingCards as playingCard, idx (`${playingCard.card} of ${playingCard.suit}`)}
      <Card card={playingCard.card} suit={playingCard.suit} revealed={playingCard.revealed} scale={CARD_SCALE} uncoveredPercent={UNCOVERED_PERCENT} column={column} row={idx} />
    {/each}
  {/if} -->
</div>

<style>
  @import "/theme.css";

  .card-column {
    position: relative;
    margin-left: 3.5px;
    margin-right: 3.5px;
    margin-top: 7px;
  }
</style>