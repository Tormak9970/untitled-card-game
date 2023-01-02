<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Unsubscriber, Writable } from "svelte/store";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from "svelte-dnd-action";
  
  import { cardColumns, discardPileList, discardZoneStyle, draggingMoreThenOne, draggingSuit, dropZoneStyle, moves, renderedList } from "../../Stores";
  import { CARD_HEIGHT, CARD_WIDTH, SUIT_ICON_SIZE, SUIT_ICON_SPRITE_SHEET_HEIGHT } from "../../lib/SpriteLUT";

  import Card from "../cards/Card.svelte";
  import CardContainer from "../deck/CardContainer.svelte";
  import { isRedSuit, type Suits } from "../../lib/models/Suits";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { Controller } from "../../Controller";
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import { getNextCard } from "../../lib/models/CardEnums";
  
  export let scale:number;
  export let suit:Suits;
  export let suitPileId:Writable<number>;
  export let suitPileList:Writable<PlayingCard[]>;

  let suitPileListSub:Unsubscriber;
  let draggingSuitSub:Unsubscriber;

  let cardContainer:HTMLDivElement;

  let items = [];
  let dragDisabled = false;

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  let type = $suitPileList.length > 0 ? getAceZoneType($suitPileList[$suitPileList.length - 1]) : `${isRedSuit(suit) ? "Red" : "Black"}|Ace`;
  $: dropFromOthersDisabled = $draggingSuit != suit && !$draggingMoreThenOne;

  function sortById(itemA: { id: string; }, itemB: { id: string; }) { return parseInt(itemA.id) - parseInt(itemB.id); }
  function handleDndConsider(e:any) {
    if (e.detail.info.trigger == TRIGGERS.DRAG_STARTED) {
      $draggingSuit = e.detail.items[0].data.data.suit;
      $draggingMoreThenOne = false;
    }
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }
  function handleDndFinalize(e:any) {
    const tarElem = e.detail.items[0];
    
    if (tarElem) {
      const tmp = [...$cardColumns];
      
      if (typeof tarElem.column == "number") {
        const moveState = {
          "boardState": $cardColumns,
          "discardState": $discardPileList
        };
        moveState[`${type[1]}PileState`] = $suitPileList;
        $moves.push(`multiState:${JSON.stringify(moveState)}`);
        $moves = [...$moves];

        const tarColumn = tmp[tarElem.column];
      
        const nodes = tarColumn.removeAllAfter(tarElem.row);
        if (tarColumn.size > 0) {
          tarColumn.get(tarColumn.size - 1).data.revealed = true;
        }

        tmp[tarElem.column] = tarColumn;
        
        $suitPileList.push(nodes.data);
        $suitPileList = [...$suitPileList];
      } else {
        const typeInfo = tarElem.column.split("-");
        if (typeInfo[1] == "discard") {
          const moveState = {
            "boardState": $cardColumns,
            "discardState": $discardPileList
          };
          moveState[`${type[1]}PileState`] = $suitPileList;
          $moves.push(`multiState:${JSON.stringify(moveState)}`);
          $moves = [...$moves];

          const card = new LinkedNode<PlayingCard>($discardPileList.pop());
          $discardPileList = [...$discardPileList];
          $renderedList[`${card.data.card}|${card.data.suit}`] = true;
          Controller.playCurrentCard();

          e.detail.items[0] = {
            "id": `${card.data.card}|${card.data.suit}`,
            "data": card,
            "column": `pile-${suit}`,
            "row": 0
          };

          $suitPileList.push(card.data);
          $suitPileList = [...$suitPileList];
        }
      }

      $cardColumns = tmp;
    }

    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }

  function getAceZoneType(card:PlayingCard): string {
    const nextCard = getNextCard(card.card);
    const suitColor = isRedSuit(suit) ? "Red" : "Black";

    return `${suitColor}|${nextCard}`
  }

  onMount(() => {
    const spriteInfo = Controller.getSprite(null, suit);

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;

    suitPileListSub = suitPileList.subscribe((values) => {
      if (values.length > 0) {
        for (const val of values) {
          if (!items.find((itm) => `${itm.data.card}|${itm.data.suit}` == `${val.card}|${val.suit}`)) {
            items.push({
              "id": `${$suitPileId++}`,
              "data": new LinkedNode<PlayingCard>(val),
              "column": `pile-${suit}`,
              "row": 0
            });
          }
        }

        items = [...items];
      } else {
        items = [];
      }
      type = values.length > 0 ? getAceZoneType(values[values.length - 1]) : `${isRedSuit(suit) ? "Red" : "Black"}|Ace`;
    });

    // draggingSuitSub = draggingSuit.subscribe((value) => {
    //   dropFromOthersDisabled = value != suit;
    // });
  });

  onDestroy(() => {
    if (suitPileListSub) suitPileListSub();
    // if (draggingSuitSub) draggingSuitSub();
  });
</script>

<div class="pile">
  <CardContainer scale={scale}>
    <div class="empty-inner" bind:this={cardContainer}>
      <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:dropZoneStyle, type, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
        {#each items as playingCard (playingCard.id)}
          <div class="card-wrapper">
            <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
          </div>
        {/each}
      </div>
    </div>
    <div style="width: {SUIT_ICON_SIZE * scale}px; height: {SUIT_ICON_SIZE * scale}px; background-image: url({sprite}); background-position: left {offset.x * scale}px top {-1 * offset.y * scale}px; background-size: {SUIT_ICON_SIZE * scale}px {SUIT_ICON_SPRITE_SHEET_HEIGHT * scale}px;" />
  </CardContainer>
</div>

<style>
  @import "/theme.css";

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

    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    z-index: 1;
  }
</style>