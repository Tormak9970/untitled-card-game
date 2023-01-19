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
import type { Unsubscriber } from "svelte/store";
import { cardColumns, clubsPileList, diamondsPileList, difficulty, discardPileList, drawPileList, gameTime, heartsPileList, moves, preRedoMoves, renderedList, score, spadesPileList, turns } from "../../Stores";
import type { LinkedList } from "../data-structs/LinkedList";
import type { Difficulty } from "./Difficulty";
import type { PlayingCard } from "./PlayingCard";

/**
 * Class representing the game's save data
 */
export class GameSettings {
  // General data
  difficulty:Difficulty;
  difficultySub:Unsubscriber;
  score:number;
  scoreSub:Unsubscriber;
  turns:number;
  turnsSub:Unsubscriber;
  gameTime:number;
  gameTimeSub:Unsubscriber;

  constructor() {
    this.genSubs();
  }

  private genSubs(): void {
    this.difficultySub = difficulty.subscribe((value) => { this.difficulty = value; });
    this.scoreSub = score.subscribe((value) => { this.score = value; });
    this.turnsSub = turns.subscribe((value) => { this.turns = value; });
    this.gameTimeSub = gameTime.subscribe((value) => { this.gameTime = value; });
  }

  /**
   * Removes all subscriptions registed by this game save.
   */
  destroySubs(): void {
    if(this.difficultySub) this.difficultySub();
    if(this.scoreSub) this.scoreSub();
    if(this.turnsSub) this.turnsSub();
    if(this.gameTimeSub) this.gameTimeSub();
  }

  /**
   * Gets a cleaned up json representation of this game save.
   * @returns A clean json representation of this game save.
   */
  toJSON() {
    return {
      "difficulty": this.difficulty,
      "score": this.score,
      "turns": this.turns,
      "gameTime": this.gameTime
    }
  }
}