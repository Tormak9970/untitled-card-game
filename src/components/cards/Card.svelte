<script lang="ts">
  import { FaceCards, BaseCards, type Cards } from "../../lib/models/CardEnums";
  import type { JokerTypes, Suits } from "../../lib/models/Suits";
  import BaseCard from "./BaseCard.svelte";
    import CardBack from "./CardBack.svelte";
  import FaceCard from "./FaceCard.svelte";

  export let card:Cards;
  export let suit:Suits|JokerTypes;
  export let faceDown:boolean = false;

  let cardVal = null;
  let suitVal = null;

  let isFaceCard = Object.values(FaceCards).includes(card as FaceCards);
  console.log(isFaceCard);
  if (isFaceCard) {
    cardVal = card as FaceCards;
  } else if (Object.values(BaseCards).includes(card as BaseCards)) {
    cardVal = card as BaseCards;
    suitVal = suit as Suits;
  } else {
    throw new Error(`Expected value of card to be in Cards but was ${card}`);
  }

  function handleClick() {
    faceDown = !faceDown;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" class:face-down={faceDown} on:click={handleClick}>
  <div class="card-inner">
    <div class="card-front">
      {#if isFaceCard}
        <FaceCard card={cardVal} suit={suit} />
      {:else}
        <BaseCard card={cardVal} suit={suitVal} />
      {/if}
    </div>
    <div class="card-back">
      <CardBack />
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .card {
    background-color: transparent;
    width: 360px;
    height: 504px;
    perspective: 1000px;
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