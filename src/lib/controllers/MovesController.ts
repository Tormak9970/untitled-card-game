import { get, type Unsubscriber } from "svelte/store";
import { moves, preRedoMoves, redoDisabled, undoDisabled } from "../../Stores";

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

  private saveCurrentState() {
    const curState = {
      "boardState": ""
    }
  }

  redo() {
    const redoMoves = get(preRedoMoves);
    const previousState = redoMoves.pop();


    preRedoMoves.set([...redoMoves]);
  }

  undo() {

  }

  onDestroy() {
    if (this.movesSub) this.movesSub();
    if (this.preRedoSub) this.preRedoSub();
  }
}