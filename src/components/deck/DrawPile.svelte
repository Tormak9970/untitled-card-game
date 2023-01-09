<script lang="ts">
  import { onMount } from "svelte";

  import { Controller } from "../../Controller";
  import { discardId, drawPileList, drawPileBoundingRect, discardPileBoundingRect, difficulty, moves, discardPileList, preRedoMoves } from "../../Stores";
  
  import Card from "../cards/Card.svelte";
  import CardContainer from "./CardContainer.svelte";
  import { Difficulty } from "../../lib/models/Difficulty";

  export let scale:number;
  export let shouldAnimate = false;
  
  let discardPileLeft = 0;
  let discardPileTop = 0;
  let cardContainer:HTMLDivElement;
  
  function setPilePositions() {
    const discardPileInfo = $discardPileBoundingRect();
    const cardContBoundingRect = cardContainer.getBoundingClientRect();
    discardPileLeft = discardPileInfo.left - cardContBoundingRect.left;
    discardPileTop = discardPileInfo.top - cardContBoundingRect.top;
  }

  function recursiveAnimate(list:HTMLCollectionOf<Element>, idx:number) {
    const elem = list[idx];
    if (idx < list.length) {
      elem.classList.remove("transition-out");
      setTimeout(() => {
        recursiveAnimate(list, idx++);
      }, Controller.DRAW_ANIM_DELAY);
    } else {
      shouldAnimate = false;
    }
  }

  function triggerAnimation() {
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-out");
      recursiveAnimate(elems, 0);
    }, 0);
  }

  function doDrawCard(): void {
    $moves = [...$moves, JSON.stringify({
      "drawPile": $drawPileList,
      "discardPile": $discardPileList
    })];
    $preRedoMoves = [];
    Controller.drawCard();
  }
  function recycleDiscard(): void {
    if ($drawPileList.length == 0) {
      $moves = [...$moves, JSON.stringify({
        "drawPile": $drawPileList,
        "discardPile": $discardPileList
      })];
      $preRedoMoves = [];

      shouldAnimate = true;
      setPilePositions();
      Controller.recycleDeck();
      if ($difficulty == Difficulty.BEGINNER) Controller.scoreBeginnerRecycle();
      $discardId = 0;
      triggerAnimation();
    }
  }

  onMount(() => {
    $drawPileBoundingRect = cardContainer.getBoundingClientRect.bind(cardContainer);
  });
</script>

<div class="draw-pile">
  <CardContainer scale={scale}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="empty-inner" on:click|stopPropagation={recycleDiscard} style="--discardPileLeft: {discardPileLeft}px; --discardPileTop: {discardPileTop}px;" bind:this={cardContainer}>
      {#if $drawPileList.length > 0}
        {#key $drawPileList.length}
          {#each $drawPileList as playingCard, i (`${i}|${playingCard.card}|${playingCard.suit}`)}
            <div class="card-wrapper {playingCard.card}|{playingCard.suit}" class:transition-out={shouldAnimate} on:click|stopPropagation={doDrawCard}>
              <Card card={playingCard.card} suit={playingCard.suit} revealed={false} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
            </div>
          {/each}
        {/key}
      {:else}
        <div class="bg-icon"/>
      {/if}
    </div>
  </CardContainer>
</div>

<style>
  @import "/theme.css";

  :root {
    --discardPileLeft: 0px;
    --discardPileTop: 0px;
  }

  .card-wrapper {
    position: absolute;
    overflow: hidden;
    
    left: 0px;
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .transition-out {
    left: var(--discardPileLeft);
    top: var(--discardPileTop);
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

    cursor: pointer;

    position: relative;
  }

  .bg-icon {
    background-image: url("/assets/ui/Pixel Refresh.png");
    filter: hue-rotate(12deg);
    background-size: 90px 90px;
    width: 90px;
    height: 90px;
  }

  .bg-icon:hover {
    filter: hue-rotate(0deg);
    cursor: pointer;
  }

  :global(.empty-inner > .icon) { color: var(--highlight); }

  :global(.empty-inner:hover > .icon) { color: var(--highlight-hover); }
</style>