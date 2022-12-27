<script lang="ts">
  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { onMount } from "svelte";

  import { Controller } from "../../Controller";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardId, drawCard, drawPileBoundingRect } from "../../Stores";
  
  import Card from "../cards/Card.svelte";

  export let scale:number;

  // TODO: implement this: https://svelte.dev/tutorial/deferred-transitions
  // and this: https://svelte.dev/tutorial/animate
  
  let cardContainer:HTMLDivElement;

  function doDrawCard(): void { Controller.drawCard(); }
  function recycleDiscard(): void {
    if (!$drawCard) {
      Controller.recycleDeck();
      $discardId = 0;
    }
  }

  onMount(() => {
    $drawPileBoundingRect = cardContainer.getBoundingClientRect.bind(cardContainer);
  });
</script>

<div class="draw-pile">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="empty-pile" style="width: {CARD_WIDTH * scale + 8}px; height: {CARD_HEIGHT * scale + 8}px;">
    <div class="empty-inner" on:click|stopPropagation={recycleDiscard} bind:this={cardContainer}>
      {#if $drawCard.length > 0}
      {#each $drawCard as playingCard (`${playingCard.card}|${playingCard.suit}`)}
        <div class="card-wrapper" on:click|stopPropagation={doDrawCard}>
          <Card card={playingCard.card} suit={playingCard.suit} revealed={false} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
        </div>
      {/each}
      {:else}
        <!-- Same size as card but suggest drawing a card -->
        <Icon data={refresh} scale={4} class="icon"/>
      {/if}
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .empty-pile {
    background-color: var(--highlight);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .empty-inner {
    width: calc(100% - 8px);
    height: calc(100% - 8px);

    background-color: var(--highlight-faded);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  :global(.empty-inner > .icon) { color: var(--highlight); }

  :global(.empty-inner:hover > .icon) { color: var(--highlight-hover); }
</style>