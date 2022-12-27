<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { LinkedNode, type LinkedList } from "../../lib/data-structs/LinkedList";
  import CardNode from "./CardNode.svelte";
  import {dndzone, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
  import { cardColumns, discardCard, drawCard, dropZoneStyle, moves, renderedList } from "../../Stores";
  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";
  import { Stack } from "../../lib/data-structs/Stack";
  import { Controller } from "../../Controller";

  export let playingCards:LinkedList<PlayingCard>;
  export let column:number;
  export let scale:number;

  let notAdded = true;

  const UNCOVERED_PERCENT = 0.3;

  let items = [];
  let dragDisabled = false;
  let dropFromOthersDisabled = false;
  $: type = playingCards.first ? getCurrentCardZoneType(playingCards.first) : getKingZoneType();

  $: if (playingCards.first && notAdded) {
    notAdded = false;
    items.push({
      "id": `${playingCards.first.data.card}|${playingCards.first.data.suit}`,
      "data": playingCards.first,
      "column": column,
      "row": 0
    });
    dragDisabled = !playingCards.first.data.revealed;
    dropFromOthersDisabled = playingCards.first != null && items.length > 0;
  }

  const flipDurationMs = 300;
  function handleDndConsider(e:any) {
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
    dropFromOthersDisabled = false;
  }

  function handleDndFinalize(e:any) {
    const tarElem = e.detail.items[0];

    if (tarElem && tarElem.id != `${playingCards.first?.data.card}|${playingCards.first?.data.suit}`) {
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
        const card = new LinkedNode<PlayingCard>($discardCard.pop());
        $discardCard = [...$discardCard];
        $renderedList[`${card.data.card}|${card.data.suit}`] = true;
        Controller.playCurrentCard();
        e.detail.items[0] = {
          "id": `${card.data.card}|${card.data.suit}`,
          "data": card,
          "column": column,
          "row": 0
        };
        tmp[column].add(card);
      }

      $cardColumns = tmp;
      dropFromOthersDisabled = true;
    }
    
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
  }
</script>

<div class="card-column" style="width: {CARD_WIDTH * scale}px; height: {(playingCards.size) * (CARD_HEIGHT * scale) * UNCOVERED_PERCENT + (CARD_HEIGHT * scale)}px;">
  <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:dropZoneStyle, type}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: 100%; height: {CARD_HEIGHT * scale}px;">
    {#each items.slice(0, 1) as playingCard (playingCard.id)}
      <div animate:flip="{{duration: flipDurationMs}}">
        <CardNode card={playingCard.data} column={column} row={0} scale={scale} uncoveredPercenet={UNCOVERED_PERCENT} />
      </div>
    {/each}
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
</style>