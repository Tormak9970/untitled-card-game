import { SpriteLoader } from "./lib/SpriteLoader";

/**
 * The main controller for the game.
 */
export class Controller {
  private static spriteLoader:SpriteLoader;

  static init() {
    Controller.spriteLoader = new SpriteLoader();
  }
}