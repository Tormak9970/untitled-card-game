import { getMany, setMany } from 'idb-keyval';
import type { GameSave } from "../models/GameSave";

/**
 * Manages saving and loading game data
 */
export class SaveController {
  gameSave:GameSave;

  constructor() {

  }

  async getData(keys:string[]): Promise<string[]> {
    return await getMany(keys);
  }

  async setData(data:[string, string][]): Promise<boolean> {
    let success = false;
    await setMany(data).then(() => { success = true; });
    return success;
  }

  saveGame() {

  }

  saveGameToFile() {

  }

  loadGame() {

  }

  loadGameFromFile() {
    
  }
}