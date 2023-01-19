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
import { musicVolumeSetting, sfxVolumeSetting, timedSetting } from "../../Stores";

/**
 * Class representing the game settings.
 */
export class GameSettings {
  // General data
  musicVolume:number;
  musicVolumeSub:Unsubscriber;
  sfxVolume:number;
  sfxVolumeSub:Unsubscriber;
  timed:boolean;
  timedSub:Unsubscriber;

  constructor() {
    this.genSubs();
  }

  private genSubs(): void {
    this.musicVolumeSub = musicVolumeSetting.subscribe((value) => { this.musicVolume = value; });
    this.sfxVolumeSub = sfxVolumeSetting.subscribe((value) => { this.sfxVolume = value; });
    this.timedSub = timedSetting.subscribe((value) => { this.timed = value; });
  }

  /**
   * Removes all subscriptions registed by the game settings.
   */
  destroySubs(): void {
    if(this.musicVolumeSub) this.musicVolumeSub();
    if(this.sfxVolumeSub) this.sfxVolumeSub();
    if(this.timedSub) this.timedSub();
  }

  /**
   * Gets a cleaned up json representation of the game settings.
   * @returns A clean json representation of the game settings.
   */
  toJSON() {
    return {
      "musicVolume": this.musicVolume,
      "sfxVolume": this.sfxVolume,
      "timed": this.timed
    }
  }
}