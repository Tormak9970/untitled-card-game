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
import { Controller } from "../../Controller";
import { showLoadSaveModal, showSaveToFileModal } from "../../Stores";
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

  }

  /**
   * Saves the game as a json file.
   */
  saveGameToFile() {
    const data = {
      "_version": __APP_VERSION__,
      ...this.gameSave.toJSON()
    };

    // do something to prompt user to save to computer
    showSaveToFileModal.set(true);
  }

  /**
   * Loads a saved game from indexDB.
   */
  loadGame() {

  }

  /**
   * Loads a save game from a file.
   */
  loadGameFromFile() {
    let data:any;

    // prompt user to select game save
    showLoadSaveModal.set(true);

    console.log("showing toast")
    if (data._version == __APP_VERSION__) {
      
    } else {
      Controller.showToast("Incompatible game version!", ToastType.WARNING);
    }
  }

  /**
   * Function to run when the game is closed.
   */
  onDestroy() {
    this.gameSave.destroySubs();
  }
}