<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../../lib/SpriteLUT";
  import Card from "../../cards/Card.svelte";
  import type { LinkedNode } from "../../../lib/data-structs/LinkedList";

  import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
  import { cardColumns } from "../../../Stores";
    import { onMount } from "svelte";

  export let card:LinkedNode<PlayingCard>;
  export let column:number;
  export let row:number
  export let scale:number;
  export let uncoveredPercenet:number;

  let notAdded = true;

  let old = null;
  let items = [];
  $: dragDisabled = false;//!card?.next?.data.revealed;
  $: dropFromOthersDisabled = items.length != 0;

  $: if (card?.next && notAdded) {
    notAdded = false;
    items.push({
      "id": `${card.next.data.card}|${card.next.data.suit}`,
      "data": card.next,
      "column": column,
      "row": row+1
    });
  }

  const flipDurationMs = 300;
  function handleDndConsider(e:any) {
    const tarElem = e.detail.items[0];
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
    console.log("Card Node Considered:", JSON.parse(JSON.stringify(items)));
  }

  function handleDndFinalize(e:any) {
    const tarElem = e.detail.items[0];
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
    console.log("Card Node Finalized:", JSON.parse(JSON.stringify(items)));
    // if (tarElem) {
    //   const tmp = [...$cardColumns];

    //   const tarColumn = tmp[tarElem.column];
    //   const nodes = tarColumn.removeAllAfter(tarElem.row);

    //   tmp[column].add(nodes);

    //   tmp[tarElem.column] = tarColumn;
    //   $cardColumns = tmp;
    // }
  }
</script>

<div class="card-node" style="width: {CARD_WIDTH * scale}px; height: {(CARD_HEIGHT * scale) * uncoveredPercenet + (CARD_HEIGHT * scale)}px;">
  <Card card={card.data.card} suit={card.data.suit} revealed={card.data.revealed} scale={scale} uncoveredPercent={uncoveredPercenet} column={column} row={row} />

  <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;">
    {#each items.slice(0, 1) as playingCard (playingCard.id)}
      <div animate:flip="{{duration: flipDurationMs}}">
        <svelte:self {...{card:playingCard.data, column, row:row+1, scale, uncoveredPercenet}} />
      </div>
    {/each}
  </div>
</div>

<style>
  @import "/theme.css";

  .card-node { position: relative; }
</style>