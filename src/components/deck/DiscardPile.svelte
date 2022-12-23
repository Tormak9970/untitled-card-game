<script lang="ts">
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardStack, discardZoneStyle } from "../../Stores";
  import Card from "../cards/Card.svelte";

  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";

  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";

  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { onMount } from "svelte";

  export let scale:number;

  let notAdded = true;

  let items = [];
  let dropFromOthersDisabled = true;
  let dragDisabled = false;

  $: topCard = $discardStack.size() > 0 ? $discardStack.peek() : null;
  $: type = topCard ? getCurrentCardZoneType(topCard) : getKingZoneType();

  $: if (topCard && notAdded) {
    notAdded = false;
    items.push({
      "id": `${topCard.card}|${topCard.suit}`,
      "data": new LinkedNode<PlayingCard>(topCard),
      "column": "none",
      "row": 0
    });
  }

  const flipDurationMs = 300;
  function handleDndConsider(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID); }
  function handleDndFinalize(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID); }

  onMount(() => {
    discardStack.subscribe((value) => {
      console.log("discard updated");
      topCard = value.size() > 0 ? value.peek() : null;
      if (topCard) {
        items[0] = {
          "id": `${topCard.card}|${topCard.suit}`,
          "data": new LinkedNode<PlayingCard>(topCard),
          "column": "none",
          "row": 0
        };
      }
    });
  });
</script>

<div class="discard-pile">
  <div class="empty-pile" style="width: {CARD_WIDTH * scale + 8}px; height: {CARD_HEIGHT * scale + 8}px;">
    <div class="empty-inner">
      <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, type}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
        {#each items.slice(0, 1) as playingCard (playingCard.id)}
          <div animate:flip="{{duration: flipDurationMs}}">
            <div class="card-wrapper">
              <Card card={topCard.card} suit={topCard.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
            </div>
          </div>
        {/each}
      </div>
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

    position: relative;
  }
</style>