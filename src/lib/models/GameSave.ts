import type { Unsubscriber } from "svelte/store";
import { cardColumns, clubsPileList, diamondsPileList, difficulty, discardPileList, drawPileList, gameTime, heartsPileList, moves, preRedoMoves, renderedList, score, spadesPileList, turns } from "../../Stores";
import type { LinkedList } from "../data-structs/LinkedList";
import type { Difficulty } from "./Difficulty";
import type { PlayingCard } from "./PlayingCard";

/**
 * Class representing the game's save data
 */
export class GameSave {
  // General data
  difficulty:Difficulty;
  difficultySub:Unsubscriber;
  score:number;
  scoreSub:Unsubscriber;
  turns:number;
  turnsSub:Unsubscriber;
  gameTime:number;
  gameTimeSub:Unsubscriber;
  moves:string[];
  movesSub:Unsubscriber;
  preRedoMoves:string[];
  preRedoMovesSub:Unsubscriber;

  // Game board data
  renderedList:{[card:string]: boolean};
  renderedListSub:Unsubscriber;
  cardColumns:LinkedList<PlayingCard>[];
  cardColumnsSub:Unsubscriber;
  drawPileList:PlayingCard[];
  drawPileListSub:Unsubscriber;
  discardPileList:PlayingCard[];
  discardPileListSub:Unsubscriber;
  spadesPileList:PlayingCard[];
  spadesPileListSub:Unsubscriber;
  heartsPileList:PlayingCard[];
  heartsPileListSub:Unsubscriber;
  clubsPileList:PlayingCard[];
  clubsPileListSub:Unsubscriber;
  diamondsPileList:PlayingCard[];
  diamondsPileListSub:Unsubscriber;

  constructor() {
    this.genSubs();
  }

  private genSubs(): void {
    this.difficultySub = difficulty.subscribe((value) => { this.difficulty = value; });
    this.scoreSub = score.subscribe((value) => { this.score = value; });
    this.turnsSub = turns.subscribe((value) => { this.turns = value; });
    this.gameTimeSub = gameTime.subscribe((value) => { this.gameTime = value; });
    this.movesSub = moves.subscribe((value) => { this.moves = value; });
    this.preRedoMovesSub = preRedoMoves.subscribe((value) => { this.preRedoMoves = value; });

    this.renderedListSub = renderedList.subscribe((value) => { this.renderedList = value; });
    this.cardColumnsSub = cardColumns.subscribe((value) => { this.cardColumns = value; });
    this.drawPileListSub = drawPileList.subscribe((value) => { this.drawPileList = value; });
    this.discardPileListSub = discardPileList.subscribe((value) => { this.discardPileList = value; });
    this.spadesPileListSub = spadesPileList.subscribe((value) => { this.spadesPileList = value; });
    this.heartsPileListSub = heartsPileList.subscribe((value) => { this.heartsPileList = value; });
    this.clubsPileListSub = clubsPileList.subscribe((value) => { this.clubsPileList = value; });
    this.diamondsPileListSub = diamondsPileList.subscribe((value) => { this.diamondsPileList = value; });
  }

  destroySubs(): void {
    if(this.difficultySub) this.difficultySub();
    if(this.scoreSub) this.scoreSub();
    if(this.turnsSub) this.turnsSub();
    if(this.gameTimeSub) this.gameTimeSub();
    if(this.movesSub) this.movesSub();
    if(this.preRedoMovesSub) this.preRedoMovesSub();

    if(this.renderedListSub) this.renderedListSub();
    if(this.cardColumnsSub) this.cardColumnsSub();
    if(this.drawPileListSub) this.drawPileListSub();
    if(this.discardPileListSub) this.discardPileListSub();
    if(this.spadesPileListSub) this.spadesPileListSub();
    if(this.heartsPileListSub) this.heartsPileListSub();
    if(this.clubsPileListSub) this.clubsPileListSub();
    if(this.diamondsPileListSub) this.diamondsPileListSub();
  }

  toJSON() {
    return {
      "difficulty": this.difficulty,
      "score": this.score,
      "turns": this.turns,
      "gameTime": this.gameTime,
      "moves": this.moves,
      "preRedoMoves": this.preRedoMoves,
    
      "renderedList": this.renderedList,
      "cardColumns": this.cardColumns,
      "drawPileList": this.drawPileList,
      "discardPileList": this.discardPileList,
      "spadesPileList": this.spadesPileList,
      "heartsPileList": this.heartsPileList,
      "clubsPileList": this.clubsPileList,
      "diamondsPileList": this.diamondsPileList
    }
  }
}