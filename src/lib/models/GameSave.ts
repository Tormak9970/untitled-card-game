/**
 * Untitled Card Game is a solitaire game made with TypeScript and Svelte.
 * Copyright (C) 2023 Travis Lane (Tormak)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>
 */
import { get, type Unsubscriber } from "svelte/store";
import { cardColumns, cardPositionLUT, clubsPileList, diamondsPileList, difficulty, discardPileList, drawPileList, gameSeed, gameTime, heartsPileList, moves, preRedoMoves, renderedList, score, spadesPileList, turns } from "../../Stores";
import type { LinkedList } from "../data-structs/LinkedList";
import { Difficulty } from "./Difficulty";
import type { PlayingCard } from "./PlayingCard";

/**
 * Class representing the game's save data
 */
export class GameSave {
  // General data
  seed:string;
  seedSub:Unsubscriber;
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
    this.seedSub = gameSeed.subscribe((value) => { this.seed = value; });
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

  /**
   * Removes all subscriptions registed by this game save.
   */
  destroySubs(): void {
    if(this.seedSub) this.seedSub();
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

  resetSave(): void {
    gameSeed.set("");
    difficulty.set(Difficulty.INTERMEDIATE);
    score.set(0);
    turns.set(0);
    gameTime.set(0);
    moves.set([]);
    preRedoMoves.set([]);

    renderedList.set({});
    cardColumns.set([]);
    drawPileList.set([]);
    discardPileList.set([]);
    spadesPileList.set([]);
    heartsPileList.set([]);
    clubsPileList.set([]);
    diamondsPileList.set([]);
  }

  /**
   * Gets a cleaned up json representation of this game save.
   * @returns A clean json representation of this game save.
   */
  toJSON() {
    return {
      "seed": this.seed,
      "difficulty": this.difficulty,
      "score": this.score,
      "turns": this.turns,
      "gameTime": this.gameTime,
      "moves": this.moves,
      "preRedoMoves": this.preRedoMoves,
      "cardPositionLUT": cardPositionLUT,
    
      "renderedList": get(renderedList),
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