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
import { get } from "svelte/store";
import { BaseCards, FaceCards, type Cards } from "./lib/models/CardEnums";
import { SpriteLoader } from "./lib/controllers/SpriteLoader";
import { Suits, type JokerTypes } from "./lib/models/Suits";
import { GameController } from "./lib/controllers/GameController";
import { ToastController } from "./lib/controllers/ToastController";
import { SaveController } from "./lib/controllers/SaveController";
import { SettingsController } from "./lib/controllers/SettingsController";
import { clubsPileList, diamondsPileList, gameTime, gameWasWon, heartsPileList, isPaused, score, showGameOverModal, spadesPileList } from "./Stores";
import { MovesController } from "./lib/controllers/MovesController";
import type { PlayingCard } from "./lib/models/PlayingCard";
import { ToastType } from "./lib/models/ToastType";

import {createTippy} from 'svelte-tippy';
import { roundArrow } from "tippy.js";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/scale-subtle.css';

/**
 * The main controller for the game.
 */
export class Controller {
  static ANIM_SPEED = 150;
  static ANIM_PAUSE_LENGTH = 0;
  static DRAW_ANIM_DELAY = 50;
  static UNCOVERED_PERCENT = 0.3;
  static CARD_SCALE = 0.4;

  static tippy = createTippy({
    animation: 'scale-subtle',
    arrow: roundArrow,
    hideOnClick: false,
    inertia: true
  });

  private static toastController = new ToastController();
  private static saveController = new SaveController();
  private static settingsController = new SettingsController();
  private static spriteLoader = new SpriteLoader();
  private static gameController = new GameController();
  private static movesController = new MovesController();

  /**
   * Initializes the controller.
   */
  static init(): void {
    Controller.gameController.deal();
  }

  /**
   * Cleans up any lingering logic (subscriptions, intervals, timeouts, etc).
   */
  static cleanUp(): void {
    Controller.movesController.onDestroy();
    Controller.saveController.onDestroy();
  }

  /**
   * Gets the sprite info for a card and suit.
   * @param card The target card.
   * @param suit The target suit.
   * @returns The sprite info for the target card and suit.
   */
  static getSprite(card:Cards, suit:Suits|JokerTypes): SpriteInfo {
    if (card == null) {
      return Controller.spriteLoader.loadSuitIcon(suit as Suits);
    } else {
      if (Object.values(FaceCards).includes(card as FaceCards)) {
        return Controller.spriteLoader.loadFaceCard(card as FaceCards, suit);
      } else {
        return Controller.spriteLoader.loadBaseCard(card as BaseCards, suit as Suits);
      }
    }
  }

  /**
   * Gets the sprite info for a card back.
   * @returns The sprite info for a card back.
   */
  static getCardBackSprite(): SpriteInfo {
    return Controller.spriteLoader.loadCardBack();
  }

  /**
   * Gets the sprite info for the "About" card.
   * @returns The sprite info for the "About" card.
   */
  static getAboutCardSprite(): SpriteInfo {
    return Controller.spriteLoader.loadAboutCard();
  }

  /**
   * Draws the card(s).
   */
  static drawCard(): void {
    Controller.gameController.drawCard();
  }

  /**
   * Recycles the deck.
   */
  static recycleDeck(): void {
    Controller.gameController.recycleDeck();
  }

  /**
   * Plays the top card of the discard pile.
   */
  static playCurrentCard(): void {
    Controller.gameController.playCurrentCard();
  }

  static scoreDiscardToBoard(): void { score.update(val => val + 5); }
  static scoreCardToAcePile(): void { score.update(val => val + 10); }
  static scoreCardReveal(): void { score.update(val => val + 5); }
  static scorePileToBoard(): void { score.update(val => Math.max(val - 15, 0)); }
  static scoreBeginnerRecycle(): void { score.update(val => Math.max(val - 100, 0)); }
  static scoreTimePass(): void { score.update(val => Math.max(val - 2, 0)); }
  static scoreTime(): void { score.update(val => val + (700000 / get(gameTime))); }

  static redoMove(): void { Controller.movesController.redo(); Controller.gameController.updateFromStores(); }
  static undoMove(): void { Controller.movesController.undo(); Controller.gameController.updateFromStores(); }
  static getLastPosition(id:string): {left:number, top:number} { return Controller.movesController.getLastPosition(id, Controller.UNCOVERED_PERCENT, Controller.CARD_SCALE); }

  /**
   * Shows a hint.
   */
  static showHint(): void {
    score.update(val => Math.max(val - 50, 0));
    // show hint
  }

  private static checkAcePile(suit:Suits): boolean {
    let pileList:PlayingCard[];
    switch(suit) {
      case Suits.SPADE:
        pileList = get(spadesPileList);
        break;
      case Suits.HEART:
        pileList = get(heartsPileList);
        break;
      case Suits.CLUB:
        pileList = get(clubsPileList);
        break;
      case Suits.DIAMOND:
        pileList = get(diamondsPileList);
        break;
    }

    return pileList.length > 0 ? pileList[pileList.length-1].card == FaceCards.KING : false;
  }

  /**
   * Checks if the game is over.
   */
  static checkWin(): void {
    const didWin = Object.values(Suits).every((suit:Suits) => Controller.checkAcePile(suit));

    if (didWin) {
      gameWasWon.set(true);
      isPaused.set(true);
      showGameOverModal.set(true);
      console.log("You won!")
    }
  }

  /**
   * Saves the current settings.
   * @param toFile Whether to save to a file.
   */
  static saveSettings(toFile:boolean): void {
    if (toFile) {
      // Controller.settingsController.saveSettingsToFile();
    } else {
      // Controller.settingsController.saveSettings();
    }
  }

  /**
   * Loads the saved settings.
   * @param fromFile Whether to load from a file.
   */
  static loadSettings(fromFile:boolean): void {
    if (fromFile) {
      // Controller.settingsController.loadSettingsFromFile();
    } else {
      // Controller.settingsController.loadSettings();
    }
  }

  /**
   * Saves the current game.
   * @param toFile Whether to save to a file.
   */
  static saveGame(toFile:boolean): void {
    if (toFile) {
      Controller.saveController.saveGameToFile();
    } else {
      Controller.saveController.saveGame();
    }
  }

  /**
   * Loads the saved game.
   * @param fromFile Whether to load from a file.
   */
  static loadGame(fromFile:boolean): void {
    if (fromFile) {
      Controller.saveController.loadGameFromFile();
    } else {
      Controller.saveController.loadGame();
    }
  }

  /**
   * Displays a toast notification.
   * @param message The message to display.
   * @param type The type of toast.
   * @param styles Any additional styles to add to the toast.
   */
  static showToast(message:string, type:ToastType, styles:Object = {}): void {
    switch (type) {
      case ToastType.INFO:
        Controller.toastController.showGenericToast(message, styles);
        break;
      case ToastType.WARNING:
        Controller.toastController.showWarningToast(message);
        break;
      case ToastType.SUCCESS:
        Controller.toastController.showSuccessToast(message);
        break;
    }
  }
}