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

/**
 * The main controller for the game.
 */
export class Controller {
  static ANIM_SPEED = 150;
  static ANIM_PAUSE_LENGTH = 0;
  static DRAW_ANIM_DELAY = 50;

  private static toastController = new ToastController();
  private static saveController = new SaveController();
  private static settingsController = new SettingsController();
  private static spriteLoader = new SpriteLoader();
  private static gameController = new GameController();
  private static movesController = new MovesController();

  static init() {
    Controller.gameController.deal();
  }

  static cleanUp() {
    Controller.movesController.onDestroy();
  }

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
  static getCardBackSprite(): SpriteInfo { return Controller.spriteLoader.loadCardBack(); }
  static getAboutCardSprite(): SpriteInfo { return Controller.spriteLoader.loadAboutCard(); }

  static drawCard(): void { Controller.gameController.drawCard(); }
  static recycleDeck(): void { Controller.gameController.recycleDeck(); }
  static playCurrentCard(): void { Controller.gameController.playCurrentCard(); }

  static scoreDiscardToBoard(): void { score.update(val => val + 5); }
  static scoreCardToAcePile(): void { score.update(val => val + 10); }
  static scoreCardReveal(): void { score.update(val => val + 5); }
  static scorePileToBoard(): void { score.update(val => Math.max(val - 15, 0)); }
  static scoreBeginnerRecycle(): void { score.update(val => Math.max(val - 100, 0)); }
  static scoreTimePass(): void { score.update(val => Math.max(val - 2, 0)); }
  static scoreTime(): void { score.update(val => val + (700000 / get(gameTime))); }

  static redoMove(): void { Controller.movesController.redo(); }
  static undoMove(): void { Controller.movesController.undo(); }

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

  static checkWin(): void {
    const didWin = Object.values(Suits).every((suit:Suits) => Controller.checkAcePile(suit));

    if (didWin) {
      gameWasWon.set(true);
      isPaused.set(true);
      showGameOverModal.set(true);
      console.log("You won!")
    }
  }

  static saveSettings(toFile:boolean): void {
    if (toFile) {
      // Controller.settingsController.saveSettingsToFile();
    } else {
      // Controller.settingsController.saveSettings();
    }
  }

  static saveGame(toFile:boolean): void {
    if (toFile) {
      Controller.saveController.saveGameToFile();
    } else {
      Controller.saveController.saveGame();
    }
  }
}