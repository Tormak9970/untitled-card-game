import type { BaseCards } from "./models/CardEnums";
import type { Suits } from "./models/Suits";

type BaseCardLUT = {
  [key in Suits]: {
    [key in BaseCards]: SpriteOffset
  };
}

export const CARD_WIDTH = 360;
export const CARD_HEIGHT = 504;

export const BASE_CARD_LUT: BaseCardLUT = {
  "Heart": {
    "Two": { "x": CARD_WIDTH * 4, "y": 0 },
    "Three": { "x": CARD_WIDTH * 5, "y": 0 },
    "Four": { "x": CARD_WIDTH * 6, "y": 0 },
    "Five": { "x": CARD_WIDTH * 7, "y": 0 },
    "Six": { "x": CARD_WIDTH * 8, "y": 0 },
    "Seven": { "x": CARD_WIDTH * 9, "y": 0 },
    "Eight": { "x": CARD_WIDTH * 10, "y": 0 },
    "Nine": { "x": CARD_WIDTH * 11, "y": 0 },
    "Ten": { "x": CARD_WIDTH * 12, "y": 0 }
  },
  "Diamond": {
    "Two": { "x": CARD_WIDTH * 4, "y": CARD_HEIGHT },
    "Three": { "x": CARD_WIDTH * 5, "y": CARD_HEIGHT },
    "Four": { "x": CARD_WIDTH * 6, "y": CARD_HEIGHT },
    "Five": { "x": CARD_WIDTH * 7, "y": CARD_HEIGHT },
    "Six": { "x": CARD_WIDTH * 8, "y": CARD_HEIGHT },
    "Seven": { "x": CARD_WIDTH * 9, "y": CARD_HEIGHT },
    "Eight": { "x": CARD_WIDTH * 10, "y": CARD_HEIGHT },
    "Nine": { "x": CARD_WIDTH * 11, "y": CARD_HEIGHT },
    "Ten": { "x": CARD_WIDTH * 12, "y": CARD_HEIGHT }
  },
  "Spade": {
    "Two": { "x": CARD_WIDTH * 4, "y": CARD_HEIGHT * 2 },
    "Three": { "x": CARD_WIDTH * 5, "y": CARD_HEIGHT * 2 },
    "Four": { "x": CARD_WIDTH * 6, "y": CARD_HEIGHT * 2 },
    "Five": { "x": CARD_WIDTH * 7, "y": CARD_HEIGHT * 2 },
    "Six": { "x": CARD_WIDTH * 8, "y": CARD_HEIGHT * 2 },
    "Seven": { "x": CARD_WIDTH * 9, "y": CARD_HEIGHT * 2 },
    "Eight": { "x": CARD_WIDTH * 10, "y": CARD_HEIGHT * 2 },
    "Nine": { "x": CARD_WIDTH * 11, "y": CARD_HEIGHT * 2 },
    "Ten": { "x": CARD_WIDTH * 12, "y": CARD_HEIGHT * 2 }
  },
  "Club": {
    "Two": { "x": CARD_WIDTH * 4, "y": CARD_HEIGHT * 3 },
    "Three": { "x": CARD_WIDTH * 5, "y": CARD_HEIGHT * 3 },
    "Four": { "x": CARD_WIDTH * 6, "y": CARD_HEIGHT * 3 },
    "Five": { "x": CARD_WIDTH * 7, "y": CARD_HEIGHT * 3 },
    "Six": { "x": CARD_WIDTH * 8, "y": CARD_HEIGHT * 3 },
    "Seven": { "x": CARD_WIDTH * 9, "y": CARD_HEIGHT * 3 },
    "Eight": { "x": CARD_WIDTH * 10, "y": CARD_HEIGHT * 3 },
    "Nine": { "x": CARD_WIDTH * 11, "y": CARD_HEIGHT * 3 },
    "Ten": { "x": CARD_WIDTH * 12, "y": CARD_HEIGHT * 3 }
  }
}

export const CARD_BACK_OFFSET = { "x": CARD_WIDTH * 13, "y": 0 };
export const ABOUT_CARD_OFFSET = { "x": CARD_WIDTH * 13, "y": CARD_HEIGHT * 3 };

const NUM_FRAMES = 8;
const BASE_SHEET_WIDTH = 14;
const BASE_SHEET_HEIGHT = 4;

export const BASE_SPRITE_SHEET_WIDTH = CARD_WIDTH * BASE_SHEET_WIDTH;
export const BASE_SPRITE_SHEET_HEIGHT = CARD_HEIGHT * BASE_SHEET_HEIGHT;
export const ANIM_SPRITE_STRIP_WIDTH = CARD_WIDTH * NUM_FRAMES;