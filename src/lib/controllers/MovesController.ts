import { get, type Unsubscriber } from "svelte/store";
import { cardColumns, cardPositionLUT, clubsPileList, columnBoundingRects, diamondsPileList, discardPileBoundingRect, discardPileList, drawPileList, frontColumn, heartsPileList, moves, preRedoMoves, redoDisabled, renderedList, shouldPlayRedoAnim, shouldPlayUndoAnim, spadesPileList, suitPileBoundingRects, undoDisabled } from "../../Stores";
import { LinkedList, LinkedNode } from "../data-structs/LinkedList";
import { CardLocation } from "../models/CardLocation";
import { MoveStates } from "../models/MoveStates";
import { PlayingCard } from "../models/PlayingCard";
import { CARD_HEIGHT, CARD_WIDTH } from "../SpriteLUT";

/**
 * Controls undo and redo actions
 */
export class MovesController {
  private movesSub:Unsubscriber;
  private preRedoSub:Unsubscriber;

  constructor() {
    this.movesSub = moves.subscribe((values:string[]) => {
      undoDisabled.set(values.length == 0);
    });
    this.preRedoSub = preRedoMoves.subscribe((values:string[]) => {
      redoDisabled.set(values.length == 0);
    });
  }

  private saveCurrentState():string {
    const curState = {};

    curState[MoveStates.BOARD] = get(cardColumns);
    curState[MoveStates.RENDERED_LIST] = get(renderedList);
    curState[MoveStates.DRAW_PILE] = get(drawPileList);
    curState[MoveStates.DISCARD_PILE] = get(discardPileList);
    curState[MoveStates.SPADE_PILE] = get(spadesPileList);
    curState[MoveStates.HEART_PILE] = get(heartsPileList);
    curState[MoveStates.CLUB_PILE] = get(clubsPileList);
    curState[MoveStates.DIAMOND_PILE] = get(diamondsPileList);

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

  redo() {
    shouldPlayRedoAnim.set(true);
    const redoMoves = get(preRedoMoves);
    const previousState = redoMoves.pop();
    const currentState = this.saveCurrentState();
    
    this.parseStateString(previousState);

    moves.set([...get(moves), currentState]);
    preRedoMoves.set([...redoMoves]);

    setTimeout(() => {
      shouldPlayUndoAnim.set(false);
      frontColumn.set(-1);
    }, 500);
  }

  undo() {
    shouldPlayUndoAnim.set(true);
    const undoMoves = get(moves);
    const previousState = undoMoves.pop();
    const currentState = this.saveCurrentState();
    
    this.parseStateString(previousState);

    preRedoMoves.set([...get(preRedoMoves), currentState]);
    moves.set([...undoMoves]);

    setTimeout(() => {
      shouldPlayUndoAnim.set(false);
      frontColumn.set(-1);
    }, 500);
  }

  getLastPosition(id:string, UNCOVERED_PERCENT:number, CARD_SCALE:number): {left:number, top:number} {
    const res = {
      "left": 0,
      "top": 0
    };

    const lastPos = cardPositionLUT[id];
    console.log(id, lastPos);

    switch (lastPos.location) {
      case CardLocation.BOARD: {
        const bRects = columnBoundingRects;
        const boundingRect = columnBoundingRects[`column${lastPos.column}`]();
        
        console.log({
          "columnBoundingRects": {
            "column0": bRects.column0(),
            "column1": bRects.column1(),
            "column2": bRects.column2(),
            "column3": bRects.column3(),
            "column4": bRects.column4(),
            "column5": bRects.column5(),
            "column6": bRects.column6()
          },
          "boundingRect": boundingRect
        });

        res.left = boundingRect.left;
        res.top = boundingRect.top + (CARD_HEIGHT * UNCOVERED_PERCENT * CARD_SCALE) * lastPos.row;

        break;
      }
      case CardLocation.DISCARD_PILE: {
        const boundingRect = get(discardPileBoundingRect)();
        res.left = boundingRect.right - CARD_WIDTH * CARD_SCALE;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.SPADE_PILE: {
        const boundingRect = suitPileBoundingRects.spade();
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.HEART_PILE: {
        const boundingRect = suitPileBoundingRects.heart();
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.CLUB_PILE: {
        const boundingRect = suitPileBoundingRects.heart();
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
      case CardLocation.DIAMOND_PILE: {
        const boundingRect = suitPileBoundingRects.heart();
        res.left = boundingRect.left;
        res.top = boundingRect.top;
        break;
      }
    }

    return res;
  }

  onDestroy() {
    if (this.movesSub) this.movesSub();
    if (this.preRedoSub) this.preRedoSub();
  }
}