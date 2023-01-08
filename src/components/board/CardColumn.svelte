<script lang="ts">
  import { flip } from "svelte/animate";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { LinkedNode, type LinkedList } from "../../lib/data-structs/LinkedList";
  import CardNode from "./CardNode.svelte";
  import {dndzone, SHADOW_PLACEHOLDER_ITEM_ID, TRIGGERS} from "svelte-dnd-action";
  import { cardColumns, clubsPileList, diamondsPileList, discardPileList, discardZoneStyle, draggingMoreThenOne, draggingSuit, draggingType, drawPileList, dropZoneStyle, heartsPileList, moves, renderedList, spadesPileList, turns } from "../../Stores";
  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";
  import { Controller } from "../../Controller";
  import type { Writable } from "svelte/store";
  import { Suits } from "../../lib/models/Suits";

  export let playingCards:LinkedList<PlayingCard>;
  export let column:number;
  export let scale:number;

  let notAdded = true;

  const UNCOVERED_PERCENT = 0.3;

  let items = [];
  let dragDisabled = false;
  $: type = playingCards.first ? getCurrentCardZoneType(playingCards.first) : getKingZoneType();
  $: dropFromOthersDisabled = (playingCards.first != null && items.length > 0) || ($draggingType != type);

  $: if (playingCards.first && notAdded) {
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
      
      if (typeof tarElem.column == "number") {
        $moves.push(`boardState:${JSON.stringify($cardColumns)}`);
        $moves = [...$moves];
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
          $moves.push(`multiState:${JSON.stringify({
            "boardState": $cardColumns,
            "drawState": $drawPileList,
            "discardState": $discardPileList
          })}`);
          $moves = [...$moves];
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
            "boardState": $cardColumns
          };
          moveState[`${typeInfo[1]}PileState`] = pileList;
          $moves.push(`multiState:${JSON.stringify(moveState)}`);
          $moves = [...$moves];

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
</script>

<div class="card-column-wrapper" style="width: {CARD_WIDTH * scale}px; height: {(playingCards.size) * (CARD_HEIGHT * scale) * UNCOVERED_PERCENT + (CARD_HEIGHT * scale)}px;">
  <div class="card-column" style="width: {CARD_WIDTH * scale}px; height: {(playingCards.size) * (CARD_HEIGHT * scale) * UNCOVERED_PERCENT + (CARD_HEIGHT * scale)}px;">
    <div use:dndzone="{{items, flipDurationMs, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: 100%; height: {CARD_HEIGHT * scale}px;">
      {#each items.slice(0, 1) as playingCard (playingCard.id)}
        <div animate:flip="{{duration: flipDurationMs}}">
          <CardNode card={playingCard.data} column={column} row={0} scale={scale} uncoveredPercenet={UNCOVERED_PERCENT} />
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
</style>