<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../../lib/SpriteLUT";
  import Card from "../../cards/Card.svelte";
  import DropArea from "../DropArea.svelte";
  import type { DLList, DLNode } from "../../../lib/data-structs/DLList";

  export let card:DLNode<PlayingCard>;
  export let column:number;
  export let row:number

  const playingCard = card.data;

  const CARD_SCALE = 0.4;
  const UNCOVERED_PERCENT = 0.3;
</script>

<div class="card-node" style="width: {CARD_WIDTH * CARD_SCALE}px; height: {(CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT + (CARD_HEIGHT * CARD_SCALE)}px;">
  {#if playingCard}
    <Card card={playingCard.card} suit={playingCard.suit} revealed={playingCard.revealed} scale={CARD_SCALE} uncoveredPercent={UNCOVERED_PERCENT} column={column} row={row} />
    {#if card.next != null}
      <svelte:self {...{card:card.next, column, row:row+1}} />
    {/if}
  {/if}
</div>

<style>
  @import "/theme.css";

  .card-node { position: relative; }
</style>