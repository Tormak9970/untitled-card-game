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

/**
 * List of all base cards.
 */
export enum BaseCards {
  TWO = "Two",
  THREE = "Three",
  FOUR = "Four",
  FIVE = "Five",
  SIX = "Six",
  SEVEN = "Seven",
  EIGHT = "Eight",
  NINE = "Nine",
  TEN = "Ten"
}

/**
 * List of all face cards.
 */
export enum FaceCards {
  ACE = "Ace",
  JACK = "Jack",
  QUEEN = "Queen",
  KING = "King",
  JOKER = "Joker"
}

/**
 * List of all cards.
 */
export type Cards = BaseCards | FaceCards;

type CardOrder = {
  [key in Cards]: number;
}

/**
 * Lookup table for card order.
 */
const CARD_ORDER: CardOrder = {
  "Joker": -1,
  "Ace": 0,
  "Two": 1,
  "Three": 2,
  "Four": 3,
  "Five": 4,
  "Six": 5,
  "Seven": 6,
  "Eight": 7,
  "Nine": 8,
  "Ten": 9,
  "Jack": 10,
  "Queen": 11,
  "King": 12
};

/**
 * Gets the previous card in the order.
 * @param card The current card.
 * @returns The previous card, or "None" if there is none.
 */
export function getPreviousCard(card:Cards): string {
  return card == FaceCards.KING ? "None" : Object.keys(CARD_ORDER).find((val) => CARD_ORDER[val] == CARD_ORDER[card] + 1);
}

/**
 * Gets the next card in the order.
 * @param card The current card.
 * @returns The next card, or "None" if there is none.
 */
export function getNextCard(card:Cards): string {
  return card == FaceCards.ACE ? "None" : Object.keys(CARD_ORDER).find((val) => CARD_ORDER[val] == CARD_ORDER[card] - 1);
}

export { CARD_ORDER };