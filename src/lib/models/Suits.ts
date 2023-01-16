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
 * Possible card suits.
 */
export enum Suits {
  SPADE = "Spade",
  HEART = "Heart",
  CLUB = "Club",
  DIAMOND = "Diamond"
}

/**
 * Checks if a suit is a red suit.
 * @param suit The suit to check.
 * @returns True if the provided suit is red.
 */
export function isRedSuit(suit:Suits): boolean { return suit == Suits.HEART || suit == Suits.DIAMOND; }
/**
 * Checks if a suit is a black suit.
 * @param suit The suit to check.
 * @returns True if the provided suit is black.
 */
export function isBlackSuit(suit:Suits): boolean { return suit == Suits.SPADE || suit == Suits.CLUB; }

/**
 * Possible Jokers.
 */
export enum JokerTypes {
  TRUTH = "Truth",
  LIES = "Lies"
}