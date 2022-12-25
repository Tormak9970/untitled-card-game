<script lang="ts">
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardCard, discardId, discardZoneStyle } from "../../Stores";
  import Card from "../cards/Card.svelte";

  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";

  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";

  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { onMount } from "svelte";

  export let scale:number;

  let items = [];
  let dropFromOthersDisabled = true;
  let dragDisabled = false;

  let type = $discardCard ? getCurrentCardZoneType($discardCard) : getKingZoneType();
  $: console.log("rerendered discard")
  
  // Look into pure css transition: https://svelte.dev/repl/3f1e68203ef140969a8240eba3475a8d?version=3.55.0
  // or custom crossfade: https://imfeld.dev/writing/svelte_deferred_transitions

  function sortById(itemA: { id: string; }, itemB: { id: string; }) { return parseInt(itemA.id) - parseInt(itemB.id); }
  function handleDndConsider(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById); }
  function handleDndFinalize(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById); }

  onMount(() => {
    discardCard.subscribe((value) => {
      if (value) {
        items.push({
          "id": `${$discardId++}`,
          "data": new LinkedNode<PlayingCard>(value),
          "column": "none",
          "row": 0
        });
        items = [...items];
      } else {
        items = [];
      }
      type = value ? getCurrentCardZoneType(value) : getKingZoneType();
    });
  });
</script>

<div class="discard-pile">
  <div class="empty-pile" style="width: {CARD_WIDTH * scale + 8}px; height: {CARD_HEIGHT * scale + 8}px;">
    <div class="empty-inner">
      <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, type, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
        {#each items as playingCard (playingCard.id)}
          <div class="card-wrapper">
            <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .card-wrapper {
    position: absolute;
    overflow: hidden;
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

    position: relative;
  }
</style>