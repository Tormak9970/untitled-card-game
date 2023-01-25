import { get, type Unsubscriber } from "svelte/store";
import { cardColumns, cardPositionLUT, clubsPileList, columnBoundingRects, deckBoundingRects, diamondsPileList, discardPileList, drawPileList, frontColumn, heartsPileList, moves, movingToDiscard, preRedoMoves, redoDisabled, renderedList, shouldAnimateDrawPile, shouldPlayRedoAnim, shouldPlayUndoAnim, spadesPileList, suitPileBoundingRects, undoDisabled } from "../../Stores";
import { LinkedList, LinkedNode } from "../data-structs/LinkedList";
import { CardLocation } from "../models/CardLocation";
import { MoveStates } from "../models/MoveStates";
import { PlayingCard } from "../models/PlayingCard";
import { CARD_HEIGHT, CARD_WIDTH } from "../SpriteLUT";
import type { SaveController } from "./SaveController";

/**
 * Controls undo and redo actions
 */
export class MovesController {
  private movesSub:Unsubscriber;
  private preRedoSub:Unsubscriber;

  constructor(saveController:SaveController) {
    this.movesSub = moves.subscribe((values:string[]) => {
      undoDisabled.set(values.length == 0);
      if (values.length > 0 || get(preRedoMoves).length > 0) {
        saveController.saveGame();
      }
    });
    this.preRedoSub = preRedoMoves.subscribe((values:string[]) => {
      redoDisabled.set(values.length == 0);
      if (get(moves).length > 0 || values.length > 0) {
        saveController.saveGame();
      }
    });
  }

  private saveCurrentState(state:string):string {
    const stateObj = JSON.parse(state);
    const keyValPairs = Object.entries(stateObj);
    
    const curState = {};

    for (const [s, value] of keyValPairs) {
      const state = s as MoveStates;
      
      switch(state) {
        case MoveStates.BOARD:
          curState[MoveStates.BOARD] = get(cardColumns);
          break;
        case MoveStates.RENDERED_LIST:
          curState[MoveStates.RENDERED_LIST] = get(renderedList);
          break;
        case MoveStates.DRAW_PILE:
          curState[MoveStates.DRAW_PILE] = get(drawPileList);
          break;
        case MoveStates.DISCARD_PILE:
          curState[MoveStates.DISCARD_PILE] = get(discardPileList);
          break;
        case MoveStates.SPADE_PILE:
          curState[MoveStates.SPADE_PILE] = get(spadesPileList);
          break;
        case MoveStates.HEART_PILE:
          curState[MoveStates.HEART_PILE] = get(heartsPileList);
          break;
        case MoveStates.CLUB_PILE:
          curState[MoveStates.CLUB_PILE] = get(clubsPileList);
          break;
        case MoveStates.DIAMOND_PILE:
          curState[MoveStates.DIAMOND_PILE] = get(diamondsPileList);
          break;
      }
    }

    return JSON.stringify(curState);
  }

  private parseStateString(state:string): void {
    const stateObj = JSON.parse(state);
    const keyValPairs = Object.entries(stateObj);

    for (const [s, value] of keyValPairs) {
      const state = s as MoveStates;
      
      switch(state) {
        case MoveStates.BOARD:
          cardColumns.set((value as any[]).map((val) => new LinkedList<PlayingCard>(val.first ? LinkedNode.fromJSON<PlayingCard>(val.first) : null)));
          break;
        case MoveStates.RENDERED_LIST:
          renderedList.set(value);
          break;
        case MoveStates.DRAW_PILE:
          shouldAnimateDrawPile.set(true);
          drawPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
        case MoveStates.DISCARD_PILE:
          discardPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
        case MoveStates.SPADE_PILE:
          spadesPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
        case MoveStates.HEART_PILE:
          heartsPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
        case MoveStates.CLUB_PILE:
          clubsPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
        case MoveStates.DIAMOND_PILE:
          diamondsPileList.set((value as any[]).map((val) => PlayingCard.fromJson(val)));
          break;
      }
    }
  }

  /**
   * Redoes the last move that was undone.
   */
  redo(): void {
    shouldPlayRedoAnim.set(true);
    const redoMoves = get(preRedoMoves);
    const previousState = redoMoves.pop();
    const currentState = this.saveCurrentState(previousState);
    
    this.parseStateString(previousState);

    moves.set([...get(moves), currentState]);
    preRedoMoves.set([...redoMoves]);

    setTimeout(() => {
      shouldPlayRedoAnim.set(false);
      frontColumn.set(-1);
      movingToDiscard.set(false);
      shouldAnimateDrawPile.set(false);
    }, 500);
  }

  /**
   * Undoes the last move.
   */
  undo(): void {
    shouldPlayUndoAnim.set(true);
    const undoMoves = get(moves);
    const previousState = undoMoves.pop();
    const currentState = this.saveCurrentState(previousState);
    
    this.parseStateString(previousState);

    preRedoMoves.set([...get(preRedoMoves), currentState]);
    moves.set([...undoMoves]);

    setTimeout(() => {
      shouldPlayUndoAnim.set(false);
      frontColumn.set(-1);
      movingToDiscard.set(false);
      shouldAnimateDrawPile.set(false);
    }, 500);
  }

  /**
   * Gets the absolute position of the target card before it was moved.
   * @param id The target id.
   * @param UNCOVERED_PERCENT The percent of a card that is uncovered when layering.
   * @param CARD_SCALE The scale of a card when displayed.
   * @returns The absolute position of the target card before it was moved.
   */
  getLastPosition(id:string, UNCOVERED_PERCENT:number, CARD_SCALE:number): {left:number, top:number} {
    const res = {
      "left": 0,
      "top": 0
    };

    const lastPos = cardPositionLUT[id];
    // console.log(id, lastPos);

    switch (lastPos.location) {
      case CardLocation.BOARD: {
        const boundingRect = columnBoundingRects[`column${lastPos.column}`];

        res.left = boundingRect.left;
        res.top = boundingRect.top + (CARD_HEIGHT * UNCOVERED_PERCENT * CARD_SCALE) * lastPos.row;

        break;
      }
      case CardLocation.DISCARD_PILE: {
        const boundingRect = deckBoundingRects.discardPile;
        res.left = boundingRect.right - CARD_WIDTH * CARD_SCALE;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.SPADE_PILE: {
        const boundingRect = suitPileBoundingRects.spade;
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.HEART_PILE: {
        const boundingRect = suitPileBoundingRects.heart;
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.CLUB_PILE: {
        const boundingRect = suitPileBoundingRects.club;
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.DIAMOND_PILE: {
        const boundingRect = suitPileBoundingRects.diamond;
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
    }

    return res;
  }

  /**
   * Removes subscriptions registered by this controller.
   */
  onDestroy(): void {
    if (this.movesSub) this.movesSub();
    if (this.preRedoSub) this.preRedoSub();
  }
}