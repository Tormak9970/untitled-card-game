<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { LinkedNode, type LinkedList } from "../../lib/data-structs/LinkedList";
  import CardNode from "./CardNode.svelte";
  import {dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS} from "svelte-dnd-action";
  import { cardColumns, cardPositionLUT, clubsPileList, columnBoundingRectFuncs, diamondsPileList, discardPileList, discardZoneStyle, draggingMoreThenOne, draggingSuit, draggingType, drawPileList, dropZoneStyle, frontColumn, heartsPileList, moves, preRedoMoves, renderedList, shouldPlayRedoAnim, shouldPlayUndoAnim, spadesPileList, turns } from "../../Stores";
  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";
  import { Controller } from "../../Controller";
  import type { Writable } from "svelte/store";
  import { Suits } from "../../lib/models/Suits";
  import { CardLocation } from "../../lib/models/CardLocation";

  export let playingCards:LinkedList<PlayingCard>;
  export let column:number;
  export let scale:number;

  let notAdded = true;

  let cardContainer:HTMLDivElement;
  let previousLeft = 0;
  let previousTop = 0;

  let shouldPlayAnim = true;

  let items = [];
  let dragDisabled = false;
  $: type = playingCards.first ? getCurrentCardZoneType(playingCards.first) : getKingZoneType();
  $: dropFromOthersDisabled = (playingCards.first != null && items.length > 0) || ($draggingType != type);

  $: if (playingCards.first && notAdded && items.length == 0) {
    notAdded = false;
    items.push({
      "id": `${playingCards.first.data.card}|${playingCards.first.data.suit}`,
      "data": playingCards.first,
      "column": column,
      "row": 0
    });
    dragDisabled = !playingCards.first.data.revealed;
  }

  const flipDurationMs = 300;
  function handleDndConsider(e:any) {
    if (e.detail.info.trigger == TRIGGERS.DRAG_STARTED) {
      $draggingType = type;
      $draggingSuit = e.detail.items[0].data.data.suit;
      $draggingMoreThenOne = e.detail.items[0].data.next != null;
    }
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
  }

  function handleDndFinalize(e:any) {
    const tarElem = e.detail.items[0];

    if (tarElem && tarElem.id != `${playingCards.first?.data.card}|${playingCards.first?.data.suit}`) {
      const tmp = [...$cardColumns];

      cardPositionLUT[`${tarElem.data.data.card}|${tarElem.data.data.suit}`] = {
        location: CardLocation.BOARD,
        column: column,
        row: 0
      };
      
      if (typeof tarElem.column == "number") {
        let tmpRow = 0;
        let nextNode = tarElem.data.next;
        while (nextNode != null) {
          tmpRow++;

          cardPositionLUT[`${nextNode.data.card}|${nextNode.data.suit}`] = {
            location: CardLocation.BOARD,
            column: column,
            row: tmpRow
          };

          nextNode = nextNode.next;
        }

        $moves.push(JSON.stringify({
          "board": $cardColumns,
          "renderedList": $renderedList
        }));
        $moves = [...$moves];
        $preRedoMoves = [];
        const tarColumn = tmp[tarElem.column];
      
        const nodes = tarColumn.removeAllAfter(tarElem.row);
        if (tarColumn.size > 0) {
          tarColumn.get(tarColumn.size - 1).data.revealed = true;
          Controller.scoreCardReveal();
        }
        
        tmp[column].add(nodes);
        tmp[tarElem.column] = tarColumn;
        $turns++;
      } else {
        const typeInfo = tarElem.column.split("-");
        if (typeInfo[1] == "discard") {
          $moves.push(JSON.stringify({
            "board": $cardColumns,
            "renderedList": $renderedList,
            "drawPile": $drawPileList,
            "discardPile": $discardPileList
          }));
          $moves = [...$moves];
          $preRedoMoves = [];
          const card = new LinkedNode<PlayingCard>($discardPileList.pop());
          $discardPileList = [...$discardPileList];
          $renderedList[`${card.data.card}|${card.data.suit}`] = true;
          Controller.playCurrentCard();
          e.detail.items[0] = {
            "id": `${card.data.card}|${card.data.suit}`,
            "data": card,
            "column": column,
            "row": 0
          };
          tmp[column].add(card);
          Controller.scoreDiscardToBoard();
        } else {
          let pileListStore:Writable<PlayingCard[]>;
          let pileList:PlayingCard[];
          
          switch(typeInfo[1]) {
            case Suits.SPADE:
              pileListStore = spadesPileList;
              pileList = $spadesPileList;
              break;
            case Suits.HEART:
              pileListStore = heartsPileList;
              pileList = $heartsPileList;
              break;
            case Suits.CLUB:
              pileListStore = clubsPileList;
              pileList = $clubsPileList;
              break;
            case Suits.DIAMOND:
              pileListStore = diamondsPileList;
              pileList = $diamondsPileList;
              break;
          }

          const moveState = {
            "board": $cardColumns,
            "renderedList": $renderedList
          };
          moveState[`${typeInfo[1]}Pile`] = pileList;
          $moves.push(JSON.stringify(moveState));
          $moves = [...$moves];
          $preRedoMoves = [];

          const card = new LinkedNode<PlayingCard>(pileList.pop());
          pileListStore.set([...pileList]);
          $renderedList[`${card.data.card}|${card.data.suit}`] = true;
          Controller.playCurrentCard();

          e.detail.items[0] = {
            "id": `${card.data.card}|${card.data.suit}`,
            "data": card,
            "column": column,
            "row": 0
          };
          tmp[column].add(card);
          Controller.scorePileToBoard();
        }
        
        $turns++;
      }

      $cardColumns = tmp;
    }
    
    items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID);
  }
  
  function triggerAnimationIn() {
    setTimeout(() => {
      const elems = cardContainer.getElementsByClassName("transition-in");
      if (elems[0]) {
        $frontColumn = column;
        elems[0].classList.remove("transition-in");
      }
      shouldPlayAnim = true;
    }, 0);
  }

  function setPositions() {
    if (items[0] && (cardPositionLUT[items[0].id].row != items[0].row || cardPositionLUT[items[0].id].column != items[0].column)) {
      const lastPosition = Controller.getLastPosition(items[0].id);

      const cardContBoundingRect = cardContainer.getBoundingClientRect();
      previousLeft = -(cardContBoundingRect.left - lastPosition.left);
      previousTop = -(cardContBoundingRect.top - lastPosition.top);
    }
  }

  afterUpdate(() => {
    if (cardContainer) {
      if ($shouldPlayUndoAnim || $shouldPlayRedoAnim) {
        if (shouldPlayAnim) {
          shouldPlayAnim = false;
          setPositions();
          triggerAnimationIn();
          
          if (items[0]) {
            setTimeout(() => {
              cardPositionLUT[items[0].id] = {
                location: CardLocation.BOARD,
                column: column,
                row: 0
              };
              
              let tmpRow = 0;
              let nextNode = items[0].data.next;
              while (nextNode != null) {
                tmpRow++;

                cardPositionLUT[`${nextNode.data.card}|${nextNode.data.suit}`] = {
                  location: CardLocation.BOARD,
                  column: column,
                  row: tmpRow
                };
                
                nextNode = nextNode.next;
              }
            }, 500);
          }
        }
      }
    }
  });

  onMount(() => {
    columnBoundingRectFuncs[`column${column}`] = cardContainer.getBoundingClientRect.bind(cardContainer);
  });
</script>

<div class="card-column-wrapper" style="width: {CARD_WIDTH * scale}px; height: {(playingCards.size) * (CARD_HEIGHT * scale) * Controller.UNCOVERED_PERCENT + (CARD_HEIGHT * scale)}px; --previousLeft: {previousLeft}px; --previousTop: {previousTop}px;">
  <div class="card-column" style="width: {CARD_WIDTH * scale}px; height: {(playingCards.size) * (CARD_HEIGHT * scale) * Controller.UNCOVERED_PERCENT + (CARD_HEIGHT * scale)}px;{$frontColumn == column ? " z-index: 100;" : ""}" bind:this={cardContainer}>
    <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: 100%; height: {CARD_HEIGHT * scale}px;">
      {#each items.slice(0, 1) as playingCard (playingCard.id)}
        <div class="card-wrapper{(playingCard.id && playingCard.id != SHADOW_PLACEHOLDER_ITEM_ID && typeof playingCard.column != "string") ? ((cardPositionLUT[playingCard.id].row != playingCard.row || cardPositionLUT[playingCard.id].column != playingCard.column) ? " transition-in" : "") : ""}">
          <CardNode card={playingCard.data} column={column} row={0} scale={scale} uncoveredPercenet={Controller.UNCOVERED_PERCENT} />
        </div>
      {/each}
    </div>
  </div>
  <div class="icon-cont" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px;">
    <img src="/assets/pixel-crown.png" alt="king-slot">
  </div>
</div>

<style>
  @import "/theme.css";

  :root {
    --previousLeft: 0px;
    --previousTop: 0px;
  }

  .card-column-wrapper {
    position: relative;
    margin-left: 3.5px;
    margin-right: 3.5px;
    margin-top: 7px;
  }

  .card-column { position: absolute; z-index: 1; }
  .icon-cont {
    position: absolute;
    
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    border: 2px solid var(--highlight);
    border-radius: 8px;
  }

  .card-wrapper {
    position: absolute;
    
    left: 0px;
    top: 0px;
    transition: left 300ms ease-in-out, top 300ms ease-in-out;
  }

  .transition-in {
    left: var(--previousLeft);
    top: var(--previousTop);
    transition: none;
  }
</style>