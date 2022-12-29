<script lang="ts">
  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { onMount } from "svelte";

  import { Controller } from "../../Controller";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardId, drawPileList, drawPileBoundingRect, discardPileBoundingRect } from "../../Stores";
  
  import Card from "../cards/Card.svelte";
    import CardContainer from "./CardContainer.svelte";

  export let scale:number;
  export let shouldAnimate = false;

  const ANIM_DELAY = 50;
  
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
      }, ANIM_DELAY);
    } else {
      shouldAnimate = false;
    }
  }

  function triggerAnimation() {
    console.log("triggering animation");
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-out");
      recursiveAnimate(elems, 0);
    }, 0);
  }

  function doDrawCard(): void { Controller.drawCard(); }
  function recycleDiscard(): void {
    if ($drawPileList.length == 0) {
      shouldAnimate = true;
      setPilePositions();
      Controller.recycleDeck();
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
        {#each $drawPileList as playingCard (`${playingCard.card}|${playingCard.suit}`)}
          <div class="card-wrapper{shouldAnimate ? " transition-out": ""}" on:click|stopPropagation={doDrawCard}>
            <Card card={playingCard.card} suit={playingCard.suit} revealed={false} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
          </div>
        {/each}
      {:else}
        <!-- Same size as card but suggest drawing a card -->
        <Icon data={refresh} scale={4} class="icon"/>
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

  :global(.empty-inner > .icon) { color: var(--highlight); }

  :global(.empty-inner:hover > .icon) { color: var(--highlight-hover); }
</style>