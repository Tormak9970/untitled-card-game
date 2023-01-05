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

  // Game board data
  cardColumns:LinkedList<PlayingCard>[];
  drawPileList:PlayingCard[];
  discardPileList:PlayingCard[];
  spadesPileList:PlayingCard[];
  heartsPileList:PlayingCard[];
  clubsPileList:PlayingCard[];
  diamondsPileList:PlayingCard[];

  // Utility data


  constructor() {

  }

  toJSON() {

  }

  static fromJSON(json:any) {

  }
}