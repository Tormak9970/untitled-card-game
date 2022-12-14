<script lang="ts">
  import { FaceCards, BaseCards, type Cards } from "../../lib/CardEnums";
  import type { JokerTypes, Suits } from "../../lib/Suits";
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
</script>

<div class="card">
  {#if faceDown}
    <CardBack />
  {:else}
    {#if isFaceCard}
      <FaceCard card={cardVal} suit={suit} />
    {:else}
      <BaseCard card={cardVal} suit={suitVal} />
    {/if}
  {/if}
</div>

<style>
  @import "/theme.css";

  .card {
    width: 360px;
    height: 504px;
  }
</style>