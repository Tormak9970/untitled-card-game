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
 * Represents possible locations of a card.
 */
export enum CardLocation {
  BOARD,
  DRAW_PILE,
  DISCARD_PILE,
  SPADE_PILE,
  HEART_PILE,
  CLUB_PILE,
  DIAMOND_PILE
}

/**
 * Represents the position of a card
 */
export type CardPosition = {
  location:CardLocation,
  row?:number,
  column?:number
}