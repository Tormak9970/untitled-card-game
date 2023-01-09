import type { LinkedList } from "../data-structs/LinkedList";
import type { Difficulty } from "./Difficulty";
import type { PlayingCard } from "./PlayingCard";

/**
 * Class representing the game's save data
 */
export class GameSave {
  // General data
  difficulty:Difficulty;
  score:number;
  turns:number;
  gameTime:number;
  moves:string[];
  preRedoMoves:string[];

  // Game board data
  renderedList:boolean[];
  cardColumns:LinkedList<PlayingCard>[];
  drawPileList:PlayingCard[];
  discardPileList:PlayingCard[];
  spadesPileList:PlayingCard[];
  heartsPileList:PlayingCard[];
  clubsPileList:PlayingCard[];
  diamondsPileList:PlayingCard[];

  constructor(difficulty:Difficulty, score:number, turns:number, gameTime:number, moves:string[], preRedoMoves:string[], renderedList:boolean[], cardColumns:LinkedList<PlayingCard>[], drawPileList:PlayingCard[], discardPileList:PlayingCard[], spadesPileList:PlayingCard[], heartsPileList:PlayingCard[], clubsPileList:PlayingCard[], diamondsPileList:PlayingCard[]) {
    this.difficulty = difficulty;
    this.score = score;
    this.turns = turns;
    this.gameTime = gameTime;
    this.moves = moves;
    this.preRedoMoves = preRedoMoves;

    this.renderedList = renderedList;
    this.cardColumns = cardColumns;
    this.drawPileList = drawPileList;
    this.discardPileList = diamondsPileList;
    this.spadesPileList = spadesPileList;
    this.heartsPileList = heartsPileList;
    this.clubsPileList = clubsPileList;
    this.diamondsPileList = diamondsPileList;
  }

  private genSubs(): void {

  }

  destroySubs(): void {
    
  }

  static fromJSON(json:any) {
    return new GameSave();
  }
}