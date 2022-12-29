<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";
  
  import { discardPileList, discardZoneStyle } from "../../Stores";
  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";
  import { CARD_HEIGHT, CARD_WIDTH, SUIT_ICON_SIZE, SUIT_ICON_SPRITE_SHEET_HEIGHT } from "../../lib/SpriteLUT";

  import Card from "../cards/Card.svelte";
  import CardContainer from "../deck/CardContainer.svelte";
  import type { Suits } from "../../lib/models/Suits";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { Controller } from "../../Controller";
  
  export let scale:number;
  export let suit:Suits;
  export let suitPileId:number;
  export let suitPileList:PlayingCard[];

  let cardContainer:HTMLDivElement;

  let items = [];
  let dropFromOthersDisabled = false;
  let dragDisabled = false;

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  let type = $discardPileList.length > 0 ? getCurrentCardZoneType($discardPileList[$discardPileList.length - 1]) : getKingZoneType();

  function sortById(itemA: { id: string; }, itemB: { id: string; }) { return parseInt(itemA.id) - parseInt(itemB.id); }
  function handleDndConsider(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById); }
  function handleDndFinalize(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById); }

  onMount(() => {
    const spriteInfo = Controller.getSprite(null, suit);

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;
  });

  onDestroy(() => {
    
  });
</script>

<div class="pile">
  <CardContainer scale={scale}>
    {#if suitPileList.length > 0}
      <div class="empty-inner" bind:this={cardContainer}>
        <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, type, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
          {#each items as playingCard (playingCard.id)}
            <div class="card-wrapper">
              <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div style="width: {SUIT_ICON_SIZE * scale}px; height: {SUIT_ICON_SIZE * scale}px; background-image: url({sprite}); background-position: left {offset.x * scale}px top {offset.y * scale}px; background-size: {SUIT_ICON_SIZE * scale}px {SUIT_ICON_SPRITE_SHEET_HEIGHT * scale}px;" />
    {/if}
  </CardContainer>
</div>

<style>
  @import "/theme.css";

  .pile {
    
  }

  .card-wrapper {
    position: absolute;
    overflow: hidden;
    
    left: 0px;
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .empty-inner {
    width: 100%;
    height: 100%;

    background-color: var(--highlight-faded);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
  }
</style>