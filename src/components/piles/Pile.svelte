<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import type { Unsubscriber, Writable } from "svelte/store";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from "svelte-dnd-action";
  
  import { cardColumns, cardPositionLUT, discardPileList, discardZoneStyle, draggingMoreThenOne, draggingSuit, draggingType, moves, preRedoMoves, renderedList, shouldPlayRedoAnim, shouldPlayUndoAnim, suitPileBoundingRectFuncs, turns } from "../../Stores";
  import { CARD_HEIGHT, CARD_WIDTH, SUIT_ICON_SIZE, SUIT_ICON_SPRITE_SHEET_HEIGHT } from "../../lib/SpriteLUT";

  import Card from "../cards/Card.svelte";
  import CardContainer from "../deck/CardContainer.svelte";
  import { isRedSuit, type Suits } from "../../lib/models/Suits";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { Controller } from "../../Controller";
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import { CARD_ORDER, FaceCards, getPreviousCard } from "../../lib/models/CardEnums";
  import { CardLocation } from "../../lib/models/CardLocation";
  
  export let scale:number;
  export let suit:Suits;
  export let suitPileList:Writable<PlayingCard[]>;

  let suitPileListSub:Unsubscriber;

  let cardContainer:HTMLDivElement;
  let previousLeft = 0;
  let previousTop = 0;

  let shouldPlayAnim = true;

  let items = [];
  let dragDisabled = false;
  let dropFromOthersDisabled = true;

  let sprite:string = "";
  let offset:SpriteOffset = {
    x: 0,
    y: 0
  };

  let type = $suitPileList.length > 0 ? getAceZoneType($suitPileList[$suitPileList.length - 1]) : `${isRedSuit(suit) ? "Red" : "Black"}|Ace`;
  $: dropFromOthersDisabled = $draggingSuit != suit || $draggingMoreThenOne || ($draggingType != FaceCards.KING ? $draggingType != type : type != `${isRedSuit($draggingSuit) ? "Red" : "Black"}|King`);

  function isNumeric(str:string) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
          !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  function getAceZoneType(card:PlayingCard): string {
    const nextCard = getPreviousCard(card.card);
    const suitColor = isRedSuit(suit) ? "Red" : "Black";

    return `${suitColor}|${nextCard}`
  }

  function sortById(itemA: { id: string; }, itemB: { id: string; }) { return CARD_ORDER[itemA.id.substring(0, itemA.id.indexOf("|"))] - CARD_ORDER[itemB.id.substring(0, itemB.id.indexOf("|"))]; }
  function handleDndConsider(e:any) {
    if (e.detail.info.trigger == TRIGGERS.DRAG_STARTED) {
      $draggingType = `${isRedSuit(suit) ? "Red" : "Black"}|${e.detail.items[e.detail.items.length-1].data.data.card}`;
      $draggingSuit = suit;
      $draggingMoreThenOne = false;
    }

    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }
  function handleDndFinalize(e:any) {
    let tarElem = e.detail.items.sort(sortById)[e.detail.items.length - 1];
    
    if (tarElem) {
      let card:PlayingCard;
      if (typeof tarElem.column == "number" && tarElem.id != `${$suitPileList[$suitPileList.length - 1]?.card}|${$suitPileList[$suitPileList.length - 1]?.suit}`) {
        cardPositionLUT[`${tarElem.data.data.card}|${tarElem.data.data.suit}`] = {
          location: CardLocation[`${suit.toUpperCase()}_PILE`]
        };

        const tmp = [...$cardColumns];

        const moveState = {
          "board": $cardColumns,
          "renderedList": $renderedList,
          "discardPile": $discardPileList,
        };
        moveState[`${suit.toLowerCase()}Pile`] = $suitPileList;
        $moves.push(JSON.stringify(moveState));
        $moves = [...$moves];
        $preRedoMoves = [];

        const tarColumn = tmp[tarElem.column];
      
        const nodes = tarColumn.removeAllAfter(tarElem.row);
        if (tarColumn.size > 0) {
          tarColumn.get(tarColumn.size - 1).data.revealed = true;
          Controller.scoreCardReveal();
        }

        tmp[tarElem.column] = tarColumn;

        $cardColumns = tmp;
        
        card = nodes.data;

        e.detail.items[e.detail.items.length - 1] = {
          "id": `${card.card}|${card.suit}`,
          "data": nodes,
          "column": `pile-${suit}`
        };
        
        $suitPileList.push(card);
        Controller.scoreCardToAcePile();
        $turns++;
        $suitPileList = [...$suitPileList];
        Controller.checkWin();
      } else {
        const tarElemIdx = e.detail.items.findIndex((itm: { id: string; }) => isNumeric(itm.id));
        tarElem = e.detail.items[tarElemIdx];
        if (tarElem) {
          if (tarElem.id != `${$suitPileList[$suitPileList.length - 1]?.card}|${$suitPileList[$suitPileList.length - 1]?.suit}`) {
            const typeInfo = tarElem.column.split("-");
            if (typeInfo[1] == "discard") {
              cardPositionLUT[`${tarElem.data.data.card}|${tarElem.data.data.suit}`] = {
                location: CardLocation[`${suit.toUpperCase()}_PILE`]
              };

              const moveState = {
                "board": $cardColumns,
                "renderedList": $renderedList,
                "discardPile": $discardPileList
              };
              moveState[`${suit.toLowerCase()}Pile`] = $suitPileList;
              $moves.push(JSON.stringify(moveState));
              $moves = [...$moves];
              $preRedoMoves = [];

              const cardNode = new LinkedNode<PlayingCard>($discardPileList.pop());
              $discardPileList = [...$discardPileList];
              $renderedList[`${cardNode.data.card}|${cardNode.data.suit}`] = true;
              Controller.playCurrentCard();

              card = cardNode.data;

              e.detail.items[tarElemIdx] = {
                "id": `${card.card}|${card.suit}`,
                "data": cardNode,
                "column": `pile-${suit}`
              };
              
              $suitPileList.push(card);
              Controller.scoreCardToAcePile();
              $turns++;
              $suitPileList = [...$suitPileList];
              Controller.checkWin();
            }
          }
        }
      }
    }

    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID).sort(sortById);
  }

  function triggerAnimationIn() {
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-in");
      if (elems[0]) {
        elems[0].classList.remove("transition-in");
      }
      shouldPlayAnim = true;
    }, 0);
  }

  function setPositions() {
    const lastPosition = Controller.getLastPosition(`${items[items.length - 1].data.data.card}|${items[items.length - 1].data.data.suit}`);

    const cardContBoundingRect = cardContainer.getBoundingClientRect();
    previousLeft = -(cardContBoundingRect.left - lastPosition.left);
    previousTop = -(cardContBoundingRect.top - lastPosition.top);
  }

  afterUpdate(() => {
    if (cardContainer) {
      if ($shouldPlayUndoAnim || $shouldPlayRedoAnim) {
        if (shouldPlayAnim) {
          if (items.length > 0 && (cardPositionLUT[`${items[items.length - 1].data.data.card}|${items[items.length - 1].data.data.suit}`].location == CardLocation.BOARD || cardPositionLUT[`${items[items.length - 1].data.data.card}|${items[items.length - 1].data.data.suit}`].location == CardLocation.DISCARD_PILE)) {
            shouldPlayAnim = false;
            setPositions();
            triggerAnimationIn();
            
            setTimeout(() => {
              cardPositionLUT[`${items[items.length - 1].data.data.card}|${items[items.length - 1].data.data.suit}`] = {
                location: CardLocation[`${suit.toUpperCase()}_PILE`]
              };
            }, 500);
          }
        }
      }
    }
  });

  onMount(() => {
    suitPileBoundingRectFuncs[suit.toLowerCase()] = cardContainer.getBoundingClientRect.bind(cardContainer);
    
    const spriteInfo = Controller.getSprite(null, suit);

    sprite = spriteInfo.url;
    offset = spriteInfo.offset;

    suitPileListSub = suitPileList.subscribe((values) => {
      if (values.length > 0) {
        for (const val of values) {
          if (!items.find((itm) => `${itm.data.data.card}|${itm.data.data.suit}` == `${val.card}|${val.suit}`)) {
            const newElem = {
              "id": `${val.card}|${val.suit}`,
              "data": new LinkedNode<PlayingCard>(val),
              "column": `pile-${suit}`
            };

            items.push(newElem);
          }
        }

        let i = items.length-1;
        while (i >= 0) {
          if (!values.find((val) => `${items[i].data.data.card}|${items[i].data.data.suit}` == `${val.card}|${val.suit}`)) {
            items.splice(i, 1);
          }
          i--;
        }

        items = [...items].sort(sortById);
      } else {
        items = [];
      }
      type = values.length > 0 ? getAceZoneType(values[values.length - 1]) : `${isRedSuit(suit) ? "Red" : "Black"}|Ace`;
    });
  });

  onDestroy(() => {
    if (suitPileListSub) suitPileListSub();
  });
</script>

<div class="pile">
  <CardContainer scale={scale}>
    <div class="empty-inner" style="--previousLeft: {previousLeft}px; --previousTop: {previousTop}px;" bind:this={cardContainer}>
      <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px; left: 0px">
        {#each items as playingCard, i (playingCard.id)}
          <div class="card-wrapper{(playingCard.id && playingCard.id != SHADOW_PLACEHOLDER_ITEM_ID && i == items.length - 1) ? ((cardPositionLUT[`${playingCard.data.data.card}|${playingCard.data.data.suit}`].column != playingCard.column) ? " transition-in" : "") : ""}">
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

  :root {
    --previousLeft: 0px;
    --previousTop: 0px;
  }

  .card-wrapper {
    position: absolute;
    overflow: hidden;
    
    left: 0px;
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .transition-in {
    left: var(--previousLeft);
    top: var(--previousTop);
    transition: none;
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