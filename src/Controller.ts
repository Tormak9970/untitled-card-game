import { BaseCards, FaceCards, type Cards } from "./lib/models/CardEnums";
import { SpriteLoader } from "./lib/controllers/SpriteLoader";
import type { JokerTypes, Suits } from "./lib/models/Suits";
import { GameController } from "./lib/controllers/GameController";
import { ToastController } from "./lib/controllers/ToastController";

/**
 * The main controller for the game.
 */
export class Controller {
  static ANIM_SPEED = 150;
  static ANIM_PAUSE_LENGTH = 0;

  private static spriteLoader = new SpriteLoader();
  private static gameController = new GameController();
  private static toastController = new ToastController();

  static init() {
    Controller.gameController.deal();
  }

  static getSprite(card:Cards, suit:Suits|JokerTypes): SpriteInfo {
    if (Object.values(FaceCards).includes(card as FaceCards)) {
      return Controller.spriteLoader.loadFaceCard(card as FaceCards, suit);
    } else {
      return Controller.spriteLoader.loadBaseCard(card as BaseCards, suit as Suits);
    }
  }

  static getCardBackSprite(): SpriteInfo { return Controller.spriteLoader.loadCardBack(); }
  static getAboutCardSprite(): SpriteInfo { return Controller.spriteLoader.loadAboutCard(); }

  static drawCard(): void { Controller.gameController.drawCard(); }
}