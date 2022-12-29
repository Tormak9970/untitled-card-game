import type { BaseCards, FaceCards } from "../models/CardEnums";
import { CARD_WIDTH, ANIM_SPRITE_STRIP_WIDTH, BASE_CARD_LUT, CARD_BACK_OFFSET, ABOUT_CARD_OFFSET } from "../SpriteLUT";
import { Suits, type JokerTypes } from "../models/Suits";

/**
 * Class to handle loading the game sprites.
 */
export class SpriteLoader {
  private baseCardSpriteSheet:string = "/assets/Cards_Spritesheet.png";
  private cardSuitsSpriteSheet:string = "/assets/Cards_Suits.png";

  private assembleFacePath(card:FaceCards, suit:Suits|JokerTypes): string {
    return `/assets/Animations/${card}/${card}_${suit}_Anim.png`;
  }

  constructor() {

  }

  loadSuitIcon(suit:Suits): SpriteInfo {
    let yOffset:number = 0;

    switch(suit) {
      case Suits.HEART:
        yOffset = 0;
        break;
      case Suits.DIAMOND:
        yOffset = 110;
        break;
      case Suits.CLUB:
        yOffset = 220;
        break;
      case Suits.SPADE:
        yOffset = 330;
        break;
    }

    return {
      "url": this.cardSuitsSpriteSheet,
      "offset": {
        "x":0,
        "y": yOffset
      }
    }
  }

  loadFaceCard(card:FaceCards, suit:Suits|JokerTypes): SpriteInfo {
    return {
      "url": this.assembleFacePath(card, suit),
      "offset": {
        "x": ANIM_SPRITE_STRIP_WIDTH - CARD_WIDTH,
        "y": 0
      }
    }
  }

  loadBaseCard(card:BaseCards, suit:Suits): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": BASE_CARD_LUT[suit][card]
    }
  }

  loadCardBack(): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": CARD_BACK_OFFSET
    }
  }

  loadAboutCard(): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": ABOUT_CARD_OFFSET
    }
  }
}