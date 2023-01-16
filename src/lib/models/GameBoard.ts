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
import { cardColumns, cardPositionLUT } from "../../Stores";
import { LinkedList } from "../data-structs/LinkedList";
import { CardLocation } from "./CardLocation";
import type { PlayingCard } from "./PlayingCard";

/**
 * Represents the current game board.
 */
export class GameBoard {

  constructor() {

  }

  /**
   * Sets up the board.
   * @param cards A list of playing cards.
   */
  setBoard(cards:PlayingCard[]) {
    const board:LinkedList<PlayingCard>[] = [];

    let cardIdx = 0;
    for (let i = 0; i < 7; i++) {
      board[i] = new LinkedList<PlayingCard>();

      for (let j = 0; j < i+1; j++) {
        const card = cards[cardIdx];

        if (i == j) card.revealed = true;

        cardPositionLUT[`${card.card}|${card.suit}`] = {
          location: CardLocation.BOARD,
          column: i,
          row: j
        }

        board[i].add(card);
        cardIdx++;
      }
    }

    cardColumns.set(board);
  }
}