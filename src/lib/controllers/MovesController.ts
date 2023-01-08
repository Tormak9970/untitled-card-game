import { get, type Unsubscriber, type Writable } from "svelte/store";
import { cardColumns, clubsPileList, diamondsPileList, discardPileList, drawPileList, heartsPileList, moves, preRedoMoves, redoDisabled, renderedList, spadesPileList, undoDisabled } from "../../Stores";
import { LinkedList, LinkedNode } from "../data-structs/LinkedList";
import { MoveStates } from "../models/MoveStates";
import { PlayingCard } from "../models/PlayingCard";

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
    curState[MoveStates.DISCARD_PILE] = get(diamondsPileList);
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
          cardColumns.set((value as any[]).map((val) => {
            return new LinkedList<PlayingCard>(LinkedNode.fromJSON<PlayingCard>(val.first));
          }));
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
    const redoMoves = get(preRedoMoves);
    const previousState = redoMoves.pop();
    const currentState = this.saveCurrentState();
    
    this.parseStateString(previousState);

    moves.set([...get(moves), currentState]);
    preRedoMoves.set([...redoMoves]);
  }

  undo() {
    const undoMoves = get(moves);
    const previousState = undoMoves.pop();
    const currentState = this.saveCurrentState();
    
    this.parseStateString(previousState);

    preRedoMoves.set([...get(preRedoMoves), currentState]);
    moves.set([...undoMoves]);
  }

  onDestroy() {
    if (this.movesSub) this.movesSub();
    if (this.preRedoSub) this.preRedoSub();
  }
}