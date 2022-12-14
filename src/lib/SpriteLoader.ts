import type { BaseCards, FaceCards } from "./CardEnums";
import { CARD_WIDTH, SPRITE_STRIP_WIDTH } from "./SpriteLUT";
import type { JokerTypes, Suits } from "./Suits";

/**
 * Class to handle loading the game sprites.
 */
export class SpriteLoader {
  private baseCardSpriteSheet:string = "/assets/Cards_Spritesheet.png";

  private assembleFacePath(card:FaceCards, suit:Suits|JokerTypes): string {
    return `/assets/Animations/${card}/${card}_${suit}_Anim.png`;
  }

  constructor() {

  }

  loadFaceCard(card:FaceCards, suit:Suits|JokerTypes): SpriteInfo {
    return {
      "url": this.assembleFacePath(card, suit),
      "offset": {
        "x": SPRITE_STRIP_WIDTH - CARD_WIDTH,
        "y": 0
      }
    }
  }

  loadBaseCard(card:BaseCards, suit:Suits): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": {
        "x": 0,
        "y": 0
      }
    }
  }
}