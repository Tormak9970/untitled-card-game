<script lang="ts">
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardStack } from "../../Stores";
  import Card from "../cards/Card.svelte";

  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';

  export let scale:number;

  $: topCard = $discardStack.size() > 0 ? $discardStack.peek() : null;
</script>

<div class="discard-pile">
  {#if topCard}
    <div class="card-wrapper">
      <Card card={topCard.card} suit={topCard.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
    </div>
  {:else}
    <div class="empty-pile" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;">
      <div class="empty-inner" />
    </div>
  {/if}
</div>

<style>
  @import "/theme.css";

  .discard-pile {
    
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
  }
</style>