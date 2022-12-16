import { cardColumns } from "../../Stores";
import { DLList } from "../data-structs/DLList";
import type { PlayingCard } from "./PlayingCard";

/**
 * Represents the current game board.
 */
export class GameBoard {

  constructor() {

  }

  setBoard(cards:PlayingCard[]) {
    const board:DLList<PlayingCard>[] = [];

    let cardIdx = 0;
    for (let i = 0; i < 7; i++) {
      board[i] = new DLList<PlayingCard>();

      for (let j = 0; j < i+1; j++) {
        const card = cards[cardIdx];

        if (i == j) card.revealed = true;

        board[i].add(card);
        cardIdx++;
      }
    }

    console.log(board)
    cardColumns.set(board);
  }

  movePile() {

  }

  validateMove() {
    
  }
}