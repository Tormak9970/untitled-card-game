import { BaseCards, FaceCards, type Cards } from "./lib/CardEnums";
import { SpriteLoader } from "./lib/SpriteLoader";
import type { JokerTypes, Suits } from "./lib/Suits";

/**
 * The main controller for the game.
 */
export class Controller {
  private static spriteLoader = new SpriteLoader();
  static ANIM_SPEED = 150;
  static ANIM_PAUSE_LENGTH = 0;

  static init() {
    
  }

  static getSprite(card:Cards, suit:Suits|JokerTypes): SpriteInfo {
    if (Object.values(FaceCards).includes(card as FaceCards)) {
      return Controller.spriteLoader.loadFaceCard(card as FaceCards, suit);
    } else {
      return Controller.spriteLoader.loadBaseCard(card as BaseCards, suit as Suits);
    }
  }
}