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

import { getMany, setMany } from "idb-keyval";
import { Controller } from "../../Controller";
import { musicVolumeSetting, sfxVolumeSetting, timedSetting } from "../../Stores";
import { GameSettings } from "../models/GameSettings";
import { ToastType } from "../models/ToastType";

/**
 * Manages saving and loading user settings.
 */
export class SettingsController {
  gameSettings:GameSettings;

  constructor() {
    this.gameSettings = new GameSettings();
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
   * Saves the current settings to indexDB.
   */
  saveSettings() {
    this.setData([[`settings`, JSON.stringify({ "_version": __APP_VERSION__, ...this.gameSettings.toJSON() })]]);
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
   * Saves the settings as a json file.
   */
  saveSettingsToFile() {
    const data = {
      "_version": __APP_VERSION__,
      ...this.gameSettings.toJSON()
    };

    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(data, null, '\t')], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    link.download = this.getFileName("GameSettings");

    link.click();
    URL.revokeObjectURL(link.href);
  }

  /**
   * Loads settings from indexDB.
   */
  async loadSettings() {
    const data = await this.getData([`settings`])[0];

    this.loadSettingsFromData(data);
  }

  /**
   * Loads settings from a file.
   */
  loadSettingsFromFile() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e:any) => {
      const file = e.target.files[0]; 

      const reader = new FileReader();
      reader.readAsText(file,'UTF-8');

      reader.onload = (readerEvent) => {
        const data = JSON.parse(readerEvent.target.result as string);

        if (data._version == __APP_VERSION__) {
          this.loadSettingsFromData(data);

          Controller.showToast("Load Successful!", ToastType.SUCCESS);
        } else {
          Controller.showToast("Incompatible game version!", ToastType.WARNING);
        }
      }
    }

    input.click();
  }

  private loadSettingsFromData(data:any) {
    console.log(data);

    musicVolumeSetting.set(data.musicVolume);
    sfxVolumeSetting.set(data.sfxVolume);
    timedSetting.set(data.timed);
  }

  /**
   * Function to run when the game is closed.
   */
  onDestroy() {
    this.gameSettings.destroySubs();
  }
}