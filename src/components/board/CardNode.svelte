<script lang="ts">
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  
  import Card from "../cards/Card.svelte";

  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";

  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { cardColumns, discardCard, drawCard, dropZoneStyle, moves, renderedList } from "../../Stores";
  import { getHiddenZoneType, getZoneType } from "../../UiLogic";
  import { Stack } from "../../lib/data-structs/Stack";
  import { Controller } from "../../Controller";

  export let card:LinkedNode<PlayingCard>;
  export let column:number;
  export let row:number
  export let scale:number;
  export let uncoveredPercenet:number;

  let notAdded = true;

  let items = [];
  let dragDisabled = false;
  let dropFromOthersDisabled = false;
  $: revealed = $renderedList[`${card.data.card}|${card.data.suit}`] ? $renderedList[`${card.data.card}|${card.data.suit}`] : false;
  $: type = card ? ((!card.next || card?.data?.revealed) ? getZoneType(card) : getHiddenZoneType(card)) : "";

  $: if (card?.next && notAdded) {
    notAdded = false;
    items.push({
      "id": `${card.next.data.card}|${card.next.data.suit}`,
      "data": card.next,
      "column": column,
      "row": row+1
    });
    dragDisabled = !card.next?.data.revealed;
    dropFromOthersDisabled = card.next != null && items.length > 0;
    console.log(`${card.data.card}|${card.data.suit}: `, {
      "next": card.next,
      "type": type
    });
  } else {
    if (!card?.next) {
      console.log(`${card.data.card}|${card.data.suit}: `, {
        "cardColumns": $cardColumns,
        "type": type
      });
    }
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
      
      if (typeof tarElem.column == "number") {
        $moves.push(`boardState:${JSON.stringify($cardColumns)}`);
        $moves = $moves;
        const tarColumn = tmp[tarElem.column];
      
        const nodes = tarColumn.removeAllAfter(tarElem.row);
        if (tarColumn.size > 0) {
          tarColumn.get(tarColumn.size - 1).data.revealed = true;
        }

        tmp[column].add(nodes);
        tmp[tarElem.column] = tarColumn;
      } else {
        $moves.push(`multiState:${JSON.stringify({
          "boardState": $cardColumns,
          "drawState": $drawCard,
          "discardState": $discardCard
        })}`);
        $moves = $moves;
        const card = new LinkedNode<PlayingCard>($discardCard);
        Controller.playCurrentCard();
        $renderedList[`${card.data.card}|${card.data.suit}`] = true;
        e.detail.items[0] = {
          "id": `${card.data.card}|${card.data.suit}`,
          "data": card,
          "column": column,
          "row": 0
        };
        tmp[column].add(card);
        $discardCard = {...$discardCard};
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