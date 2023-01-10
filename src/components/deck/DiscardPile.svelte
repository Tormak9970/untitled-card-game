<script lang="ts">
  import { onDestroy, onMount, afterUpdate } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from "svelte-dnd-action";
  
  import { discardPileList, discardId, discardPileBoundingRect, discardZoneStyle, drawPileBoundingRect, draggingSuit, draggingMoreThenOne, draggingType, difficulty, shouldPlayUndoAnim, drawPileList } from "../../Stores";
  import { getCurrentCardZoneType } from "../../UiLogic";
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";

  import Card from "../cards/Card.svelte";
  import CardContainer from "./CardContainer.svelte";
  import { Difficulty } from "../../lib/models/Difficulty";
  import { Controller } from "../../Controller";
  
  export let scale:number;
  export let uncoveredPercent:number;

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
  function handleDndFinalize(e:any) {
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }

  function setPilePositions() {
    const drawPileInfo = $drawPileBoundingRect();
    const cardContBoundingRect = cardContainer.getBoundingClientRect();
    drawPileLeft = -(cardContBoundingRect.left - drawPileInfo.left);
    drawPileTop = -(cardContBoundingRect.top - drawPileInfo.top);
  }

  function recursiveAnimateIn(list:HTMLCollectionOf<Element>, idx:number) {
    if (idx < list.length) {
      const elem = list[idx];
      elem.classList.remove("transition-in");
      setTimeout(() => {
        recursiveAnimateIn(list, idx++);
      }, Controller.DRAW_ANIM_DELAY);
    }
  }

  function triggerAnimationIn() {
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-in");
      recursiveAnimateIn(elems, 0);
    }, 0);
  }

  afterUpdate(() => { triggerAnimationIn(); });

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

        let i = items.length-1;
        while (i >= 0) {
          if (!values.find((val) => `${items[i].data.data.card}|${items[i].data.data.suit}` == `${val.card}|${val.suit}`)) {
            $discardId--;
            items.splice(i, 1);
          }
          i--;
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
  {#if $difficulty == Difficulty.BEGINNER}
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
  {:else}
    <CardContainer scale={scale} width={(CARD_WIDTH * scale * uncoveredPercent * 2) + (CARD_WIDTH * scale) + 8}>
      <div class="empty-inner" style="--drawPileLeft: {drawPileLeft}px; --drawPileTop: {drawPileTop}px;" bind:this={cardContainer}>
        <div class="blocker" style="position: absolute; z-index: 100; width: {CARD_WIDTH * scale * uncoveredPercent * ((items.length - 1) % 3)}px; height: 100%" on:mousedown|stopPropagation />
        <div
            use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}"
            on:consider="{handleDndConsider}"
            on:finalize="{handleDndFinalize}"
            style="width: {(CARD_WIDTH * scale * uncoveredPercent * 2) + (CARD_WIDTH * scale)}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px; left: 0px;"
            >
            {#each items as playingCard, i (`${i}|${playingCard.id}`)}
              <div class="card-wrapper{(i >= items.length-3 && shouldAnimate) || ($drawPileList.length == 0 && $shouldPlayUndoAnim) ? " transition-in": ""}" style="--base-left: {(CARD_WIDTH * scale * uncoveredPercent * 2) - (i >= $discardPileList.length - 3 ? (CARD_WIDTH * scale * uncoveredPercent * (($discardPileList.length - 1 - i) % 3)) : (CARD_WIDTH * scale * uncoveredPercent * 2))}px;">
                <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
              </div>
            {/each}
          </div>
      </div>
    </CardContainer>
  {/if}
</div>

<style>
  @import "/theme.css";

  :root {
    --drawPileLeft: 0px;
    --drawPileTop: 0px;
    --base-left: 0px;
  }

  .card-wrapper {
    position: absolute;
    overflow: hidden;
    
    left: var(--base-left);
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .transition-in {
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

    position: relative;
  }
</style>