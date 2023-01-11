import { get } from "svelte/store";
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