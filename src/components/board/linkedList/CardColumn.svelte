<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../../lib/SpriteLUT";
  import type { LinkedList, LinkedNode } from "../../../lib/data-structs/LinkedList";
  import CardNode from "./CardNode.svelte";
  import {dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME, SHADOW_PLACEHOLDER_ITEM_ID} from "svelte-dnd-action";
  import { cardColumns } from "../../../Stores";

  export let playingCards:LinkedList<PlayingCard>;
  export let column:number;

  let notAdded = true;

  const CARD_SCALE = 0.4;
  const UNCOVERED_PERCENT = 0.3;

  let items = [];
  $: dragDisabled = false;//!playingCards.first.data.revealed;
  $: dropFromOthersDisabled = false;
  $: console.log(dropFromOthersDisabled);

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
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
    console.log("Card Column Finalized", JSON.parse(JSON.stringify(items)));
    if (tarElem) {
      const tmp = [...$cardColumns];

      // const tarColumn = tmp[tarElem.column];
      // const nodes = tarColumn.removeAllAfter(tarElem.row);

      // tmp[column].add(nodes);

      // tmp[tarElem.column] = tarColumn;
      $cardColumns = tmp;
      dropFromOthersDisabled = true;
    }
  }
</script>

<div class="card-column" style="width: {CARD_WIDTH * CARD_SCALE}px; height: {(playingCards.size) * (CARD_HEIGHT * CARD_SCALE) * UNCOVERED_PERCENT + (CARD_HEIGHT * CARD_SCALE)}px;">
  <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: 100%; height: {CARD_HEIGHT * CARD_SCALE}px;">
    {#each items.slice(0, 1) as playingCard (playingCard.id)}
      <div animate:flip="{{duration: flipDurationMs}}">
        <CardNode card={playingCard.data} column={column} row={0} scale={CARD_SCALE} uncoveredPercenet={UNCOVERED_PERCENT} />
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