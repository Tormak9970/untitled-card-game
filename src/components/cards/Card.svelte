<script lang="ts">
  import { onMount } from "svelte";
  import { FaceCards, BaseCards, type Cards } from "../../lib/models/CardEnums";
  import type { JokerTypes, Suits } from "../../lib/models/Suits";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";

  import BaseCard from "./BaseCard.svelte";
  import CardBack from "./CardBack.svelte";
  import FaceCard from "./FaceCard.svelte";

  export let card:Cards;
  export let suit:Suits|JokerTypes;
  export let revealed:boolean = false;
  export let scale:number;
  export let uncoveredPercent:number;
  export let column:number;
  export let row:number;

  let cardElem:HTMLDivElement;

  let cardVal = null;
  let suitVal = null;

  let isFaceCard = Object.values(FaceCards).includes(card as FaceCards);
  
  if (isFaceCard) {
    cardVal = card as FaceCards;
  } else if (Object.values(BaseCards).includes(card as BaseCards)) {
    cardVal = card as BaseCards;
    suitVal = suit as Suits;
  } else {
    throw new Error(`Expected value of card to be in Cards but was ${card}`);
  }

  //! remove this once done testing
  function reveal() {
    revealed = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="card"
  class:draggable-source="{revealed}"
  style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; top: {(row) * (CARD_HEIGHT * scale) * uncoveredPercent}px;"
  class:face-down={!revealed}
  on:click={reveal}
  bind:this={cardElem}
  >
  <div class="card-inner">
    <div class="card-front">
      {#if isFaceCard}
        <FaceCard card={cardVal} suit={suit} scale={scale} />
      {:else}
        <BaseCard card={cardVal} suit={suitVal} scale={scale} />
      {/if}
    </div>
    <div class="card-back" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;">
      <CardBack scale={scale} />
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .card {
    position: absolute;
    background-color: transparent;
    perspective: 1000px;
    box-shadow: 1px -12px 30px -16px rgba(0,0,0,0.96);
    -webkit-box-shadow: 1px -12px 30px -16px rgba(0,0,0,0.96);
    -moz-box-shadow: 1px -12px 30px -16px rgba(0,0,0,0.96);
  }

  :global(.draggable-source--is-dragging) {
    top:0px;
    z-index: 1000;
  }

  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .face-down .card-inner {
    transform: rotateY(180deg);
  }

  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card-back {
    color: white;
    transform: rotateY(180deg);
  } 
</style>