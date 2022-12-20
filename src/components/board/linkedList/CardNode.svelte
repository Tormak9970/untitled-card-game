<script lang="ts">
  import type { LinkedNode } from "../../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../../lib/models/PlayingCard";
  
  import Card from "../../cards/Card.svelte";

  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";

  import { CARD_HEIGHT, CARD_WIDTH } from "../../../lib/SpriteLUT";
  import { cardColumns, dropZoneStyle, renderedList } from "../../../Stores";
  import { getHiddenZoneType, getZoneType } from "../../../UiLogic";

  export let card:LinkedNode<PlayingCard>;
  export let column:number;
  export let row:number
  export let scale:number;
  export let uncoveredPercenet:number;

  let notAdded = true;

  let items = [];
  $: dragDisabled = false;
  $: dropFromOthersDisabled = false;
  $: revealed = $renderedList[`${card.data.card}|${card.data.suit}`] ? $renderedList[`${card.data.card}|${card.data.suit}`] : false;
  $: type = card ? (!(card.next) ? getZoneType(card) : getHiddenZoneType(card)) : "";

  $: if (card?.next && notAdded) {
    notAdded = false;
    items.push({
      "id": `${card.next.data.card}|${card.next.data.suit}`,
      "data": card.next,
      "column": column,
      "row": row+1
    });
    dragDisabled = !card?.next?.data.revealed;
    dropFromOthersDisabled = card?.next != null && items.length > 0;
  }

  $: if (!revealed && !$renderedList[`${card.data.card}|${card.data.suit}`] && card.data.revealed) {
    setTimeout(() => {
      $renderedList[`${card.data.card}|${card.data.suit}`] = true;
      revealed = card.data.revealed;
    }, 100);
  }

  const flipDurationMs = 300;
  function handleDndConsider(e:any) {
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
    dropFromOthersDisabled = false;
  }

  function handleDndFinalize(e:any) {
    const tarElem = e.detail.items[0];
    
    if (tarElem && tarElem.id != `${card?.next?.data.card}|${card?.next?.data.suit}`) {
      const tmp = [...$cardColumns];
      const tarColumn = tmp[tarElem.column];
      
      const nodes = tarColumn.removeAllAfter(tarElem.row);
      tmp[column].add(nodes);
      tmp[tarElem.column] = tarColumn;

      if (tarElem.row > 0) {
        const prevNode = tarColumn.get(tarElem.row-1);
        prevNode.data.revealed = true;
      }

      $cardColumns = tmp;
      dropFromOthersDisabled = true;
    }
    
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
  }
</script>

<div class="card-node" style="width: {CARD_WIDTH * scale}px; height: {(CARD_HEIGHT * scale) * uncoveredPercenet + (CARD_HEIGHT * scale)}px;">
  <Card card={card.data.card} suit={card.data.suit} revealed={revealed} scale={scale} uncoveredPercent={uncoveredPercenet} column={column} row={row} />

  <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:dropZoneStyle, type}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: {uncoveredPercenet * CARD_HEIGHT * scale}px;">
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