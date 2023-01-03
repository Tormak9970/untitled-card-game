<script lang="ts">
  import { onDestroy, onMount, afterUpdate } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from "svelte-dnd-action";
  
  import { discardPileList, discardId, discardPileBoundingRect, discardZoneStyle, drawPileBoundingRect, draggingSuit, draggingMoreThenOne, draggingType } from "../../Stores";
  import { getCurrentCardZoneType } from "../../UiLogic";
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";

  import Card from "../cards/Card.svelte";
  import CardContainer from "./CardContainer.svelte";
  
  export let scale:number;

  let discardPileListSub: Unsubscriber;

  let drawPileLeft = 0;
  let drawPileTop = 0;
  let cardContainer:HTMLDivElement;

  let items = [];
  let dropFromOthersDisabled = true;
  let dragDisabled = false;

  let type = $discardPileList.length > 0 ? getCurrentCardZoneType($discardPileList[$discardPileList.length - 1]) : "none";
  
  let shouldAnimate = true;

  function sortById(itemA: { id: string; }, itemB: { id: string; }) { return parseInt(itemA.id) - parseInt(itemB.id); }
  function handleDndConsider(e:any) {
    if (e.detail.info.trigger == TRIGGERS.DRAG_STARTED) {
      $draggingType = type
      $draggingSuit = e.detail.items[e.detail.items.length - 1].data.data.suit;
      $draggingMoreThenOne = false;
    }
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }
  function handleDndFinalize(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById); }

  function setPilePositions() {
    const drawPileInfo = $drawPileBoundingRect();
    const cardContBoundingRect = cardContainer.getBoundingClientRect();
    drawPileLeft = -(cardContBoundingRect.left - drawPileInfo.left);
    drawPileTop = -(cardContBoundingRect.top - drawPileInfo.top);
  }

  afterUpdate(() => {
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-out");
      for (const elem of elems) {
        elem.classList.remove("transition-out");
      }
    }, 0);
  });

  onMount(() => {
    $discardPileBoundingRect = cardContainer.getBoundingClientRect.bind(cardContainer);
    discardPileListSub = discardPileList.subscribe((values) => {
      if (values.length > 0) {
        for (const val of values) {
          if (!items.find((itm) => `${itm.data.data.card}|${itm.data.data.suit}` == `${val.card}|${val.suit}`)) {
            items.push({
              "id": `${$discardId++}`,
              "data": new LinkedNode<PlayingCard>(val),
              "column": "pile-discard",
              "row": 0
            });
          }
        }

        items = [...items];
      } else {
        items = [];
      }
      type = values.length > 0 ? getCurrentCardZoneType(values[values.length - 1]) : "none";
      
      setPilePositions();
    });
  });

  onDestroy(() => {
    if (discardPileListSub) discardPileListSub();
  });
</script>

<div class="discard-pile">
  <CardContainer scale={scale}>
    <div class="empty-inner" style="--drawPileLeft: {drawPileLeft}px; --drawPileTop: {drawPileTop}px;" bind:this={cardContainer}>
      <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
        {#each items as playingCard, i (playingCard.id)}
          <div class="card-wrapper{(i == items.length-1 && shouldAnimate) ? " transition-out": ""}">
            <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
          </div>
        {/each}
      </div>
    </div>
  </CardContainer>
</div>

<style>
  @import "/theme.css";

  :root {
    --drawPileLeft: 0px;
    --drawPileTop: 0px;
  }

  .card-wrapper {
    position: absolute;
    overflow: hidden;
    
    left: 0px;
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .transition-out {
    left: var(--drawPileLeft);
    top: var(--drawPileTop);
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .empty-inner {
    width: 100%;
    height: 100%;

    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
  }
</style>