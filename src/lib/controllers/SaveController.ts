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
import { getMany, setMany } from 'idb-keyval';
import { get } from "svelte/store";
import { Controller } from "../../Controller";
import { cardColumns, clubsPileList, diamondsPileList, difficulty, discardPileList, drawPileList, gameTime, heartsPileList, moves, preRedoMoves, renderedList, score, spadesPileList, turns } from "../../Stores";
import { GameSave } from "../models/GameSave";
import { ToastType } from "../models/ToastType";

/**
 * Manages saving and loading game data
 */
export class SaveController {
  gameSave:GameSave;

  constructor() {
    this.gameSave = new GameSave();
  }

  /**
   * Loads a list of values from indexDB.
   * @param keys list of keys to load.
   * @returns a promise containing a list of the requested value.
   */
  async getData(keys:string[]): Promise<string[]> {
    return await getMany(keys);
  }

  /**
   * Saves a list of values from indexDB.
   * @param keys list of key value pairs to saves.
   * @returns a promise of wether or not the save was successful.
   */
  async setData(data:[string, string][]): Promise<boolean> {
    let success = false;
    await setMany(data).then(() => { success = true; });
    return success;
  }

  /**
   * Saves the current game to indexDB.
   */
  saveGame() {
    this.setData([[`difficulty:${get(difficulty)}`, JSON.stringify({ "_version": __APP_VERSION__, ...this.gameSave.toJSON() })]]);
  }

  private getFileName(pretext:string):string {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${pretext}__${day}.${month}.${year}__${hours}.${minutes}.${seconds}.json`;
  }

  /**
   * Saves the game as a json file.
   */
  saveGameToFile() {
    const data = {
      "_version": __APP_VERSION__,
      ...this.gameSave.toJSON()
    };

    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, '\t')], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    link.download = this.getFileName("GameSave");

    link.click();
    URL.revokeObjectURL(link.href);
  }

  /**
   * Loads a saved game from indexDB.
   */
  async loadGame() {
    const data = await this.getData([`difficutly: ${get(difficulty)}`])[0];

    this.loadGameFromData(data);
  }

  /**
   * Loads a save game from a file.
   */
  loadGameFromFile() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e:any) => {
      const file = e.target.files[0]; 

      const reader = new FileReader();
      reader.readAsText(file,'UTF-8');

      reader.onload = (readerEvent) => {
        const data = JSON.parse(readerEvent.target.result as string);

        if (data._version == __APP_VERSION__) {
          this.loadGameFromData(data);

          Controller.showToast("Load Successful!", ToastType.SUCCESS);
        } else {
          Controller.showToast("Incompatible game version!", ToastType.WARNING);
        }
      }
    }

    input.click();
  }

  private loadGameFromData(data:any) {
    console.log(data);

    difficulty.set(data.difficulty);
    score.set(data.score);
    turns.set(data.turns);
    gameTime.set(data.gameTime);
    moves.set(data.moves);
    preRedoMoves.set(data.preRedoMoves);

    renderedList.set(data.renderedList);
    cardColumns.set(data.cardColumns);
    drawPileList.set(data.drawPileList);
    discardPileList.set(data.discardPileList);
    spadesPileList.set(data.spadesPileList);
    heartsPileList.set(data.heartsPileList);
    clubsPileList.set(data.clubsPileList);
    diamondsPileList.set(data.diamondsPileList);
  }

  /**
   * Function to run when the game is closed.
   */
  onDestroy() {
    this.gameSave.destroySubs();
  }
}