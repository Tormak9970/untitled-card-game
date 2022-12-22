<script lang="ts">
  import { Controller } from "../../Controller";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { drawStack } from "../../Stores";
  import Card from "../cards/Card.svelte";
  
  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';

  export let scale:number;

  $: topCard = $drawStack.size() > 0 ? $drawStack.peek() : null;

  function drawCard(e:MouseEvent): void {
    Controller.drawCard();
  }

  function recycleDiscard(e:MouseEvent): void {

  }
</script>

<div class="draw-pile">
  {#if topCard}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="card-wrapper" on:click={drawCard}>
      <Card card={topCard.card} suit={topCard.suit} revealed={false} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
    </div>
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="empty-pile" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;" on:click={recycleDiscard}>
      <div class="empty-inner">
        <!-- Same size as card but suggest drawing a card -->
        <Icon data={refresh} scale={4} class="icon"/>
      </div>
    </div>
  {/if}
</div>

<style>
  @import "/theme.css";

  .draw-pile {
    
  }

  .card-wrapper {

  }

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