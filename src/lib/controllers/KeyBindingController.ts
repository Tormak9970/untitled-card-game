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

import { isPaused, showLoadSaveModal, showPauseMenu, showSaveToFileModal } from "../../Stores";

/**
 * Class that handles keybindings.
 */
export class KeyBindingController {
  constructor() {
    document.addEventListener("keydown", this.registerBindings)
  }

  private registerBindings(e:KeyboardEvent) {
    switch(e.code) {
      case 'Escape': {
        isPaused.set(true);
        showPauseMenu.set(true);
        break;
      }
      case 'KeyS': {
        if (e.ctrlKey) {
          showSaveToFileModal.set(true);
        }
        break;
      }
      case 'KeyL': {
        if (e.ctrlKey) {
          showLoadSaveModal.set(true);
        }
        break;
      }
    }
  }

  /**
   * Function to run when the game is closed.
   */
  onDestroy() {
    document.removeEventListener("keydown", this.registerBindings);
  }
}