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
 * Possible locations of a card on the board.
 */
export enum MoveStates {
  BOARD = "board",
  RENDERED_LIST = "renderedList",
  DRAW_PILE = "drawPile",
  DISCARD_PILE = "discardPile",
  SPADE_PILE = "spadePile",
  HEART_PILE = "heartPile",
  CLUB_PILE = "clubPile",
  DIAMOND_PILE = "diamondPile"
}