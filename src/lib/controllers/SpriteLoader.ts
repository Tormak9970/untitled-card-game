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

  /**
   * Gets the sprite info for a suit.
   * @param suit The target suit.
   * @returns The sprite info for the provided suit.
   */
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

  /**
   * Gets the sprite info for a face card and suit.
   * @param card The target card.
   * @param suit The target suit.
   * @returns The sprite info for the target card and suit.
   */
  loadFaceCard(card:FaceCards, suit:Suits|JokerTypes): SpriteInfo {
    return {
      "url": this.assembleFacePath(card, suit),
      "offset": {
        "x": ANIM_SPRITE_STRIP_WIDTH - CARD_WIDTH,
        "y": 0
      }
    }
  }

  /**
   * Gets the sprite info for a base card and suit.
   * @param card The target card.
   * @param suit The target suit.
   * @returns The sprite info for the target card and suit.
   */
  loadBaseCard(card:BaseCards, suit:Suits): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": BASE_CARD_LUT[suit][card]
    }
  }

  /**
   * Gets the sprite info for a card back.
   * @returns The sprite info for the card back.
   */
  loadCardBack(): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": CARD_BACK_OFFSET
    }
  }

  /**
   * Gets the sprite info for an "About" card.
   * @returns The sprite info for the "About" card.
   */
  loadAboutCard(): SpriteInfo {
    return {
      "url": this.baseCardSpriteSheet,
      "offset": ABOUT_CARD_OFFSET
    }
  }
}