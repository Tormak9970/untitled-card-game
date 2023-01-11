<script lang="ts">
  import { afterUpdate } from "svelte";
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  
  import Card from "../cards/Card.svelte";

  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS } from "svelte-dnd-action";

  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { cardColumns, cardPositionLUT, clubsPileList, diamondsPileList, discardPileList, discardZoneStyle, draggingMoreThenOne, draggingSuit, draggingType, drawPileList, dropZoneStyle, frontColumn, heartsPileList, moves, preRedoMoves, renderedList, shouldPlayRedoAnim, shouldPlayUndoAnim, spadesPileList, turns } from "../../Stores";
  import { getHiddenZoneType, getZoneType } from "../../UiLogic";
  import { Controller } from "../../Controller";
  import type { Writable } from "svelte/store";
  import { Suits } from "../../lib/models/Suits";
  import { CardLocation } from "../../lib/models/CardLocation";

  export let card:LinkedNode<PlayingCard>;
  export let column:number;
  export let row:number
  export let scale:number;
  export let uncoveredPercenet:number;

  let cardContainer:HTMLDivElement;
  let previousLeft = 0;
  let previousTop = 0;

  let shouldPlayAnim = true;

  let notAdded = true;

  let items = [];
  let dragDisabled = false;
  $: revealed = $renderedList[`${card.data.card}|${card.data.suit}`] ? $renderedList[`${card.data.card}|${card.data.suit}`] : false;
  $: type = card ? ((!card.next || card?.data?.revealed) ? getZoneType(card) : getHiddenZoneType(card)) : "";
  $: dropFromOthersDisabled = (card.next != null && items.length > 0) || ($draggingType != type);

  $: if (card?.next && notAdded && items.length == 0) {
    notAdded = false;
    items.push({
      "id": `${card.next.data.card}|${card.next.data.suit}`,
      "data": card.next,
      "column": column,
      "row": row+1
    });
    dragDisabled = !card.next?.data.revealed;
  }

  $: if (!revealed && !$renderedList[`${card.data.card}|${card.data.suit}`] && card.data.revealed) {
    setTimeout(() => {
      $renderedList[`${card.data.card}|${card.data.suit}`] = true;
      revealed = card.data.revealed;
    }, 100);
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
    
    if (tarElem && tarElem.id != `${card?.next?.data.card}|${card?.next?.data.suit}`) {
      const tmp = [...$cardColumns];

      cardPositionLUT[`${tarElem.data.data.card}|${tarElem.data.data.suit}`] = {
        location: CardLocation.BOARD,
        column: column,
        row: row+1
      };
      
      if (typeof tarElem.column == "number") {
        let tmpRow = row+1;
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

        e.detail.items[0] = {
          "id": `${tarElem.data.data.card}|${tarElem.data.data.suit}`,
          "data": tarElem.data,
          "column": column,
          "row": row+1
        };
        $turns++;
      } else {
        const typeInfo = tarElem.column.split("-");
        if (typeInfo[1] == "discard") {
          $moves.push(`multiState:${JSON.stringify({
            "board": $cardColumns,
            "renderedList": $renderedList,
            "drawPile": $drawPileList,
            "discardPile": $discardPileList
          })}`);
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
            "row": row+1
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
            "row": row+1
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
      console.log(previousLeft, previousTop)
    }
  }

  afterUpdate(() => {
    if (cardContainer) {
      if ($shouldPlayUndoAnim || $shouldPlayRedoAnim) {
        if (shouldPlayAnim) {
          shouldPlayAnim = false;
          setPositions();
          $frontColumn = column;
          triggerAnimationIn();
          
          if (items[0]) {
            setTimeout(() => {
              console.log(items[0])
              cardPositionLUT[items[0].id] = {
                location: CardLocation.BOARD,
                column: column,
                row: row+1
              };
              
              let tmpRow = row+1;
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
</script>

<div class="card-node" style="width: {CARD_WIDTH * scale}px; height: {(CARD_HEIGHT * scale) * uncoveredPercenet + (CARD_HEIGHT * scale)}px; --previousLeft: {previousLeft}px; --previousTop: {previousTop}px;">
  <Card card={card.data.card} suit={card.data.suit} revealed={revealed} scale={scale} uncoveredPercent={uncoveredPercenet} column={column} row={row} />

  <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: {uncoveredPercenet * CARD_HEIGHT * scale}px;" bind:this={cardContainer}>
    {#each items.slice(0, 1) as playingCard (playingCard.id)}
      <div class="card-wrapper{(playingCard.id && playingCard.id != SHADOW_PLACEHOLDER_ITEM_ID && typeof playingCard.column != "string") ? ((cardPositionLUT[playingCard.id].row != playingCard.row || cardPositionLUT[playingCard.id].column != playingCard.column) ? " transition-in" : "") : ""}">
        <svelte:self {...{card:playingCard.data, column, row:playingCard.row, scale, uncoveredPercenet}} />
      </div>
    {/each}
  </div>
</div>

<style>
  @import "/theme.css";

  .card-node { position: relative; }

  :root {
    --previousLeft: 0px;
    --previousTop: 0px;
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