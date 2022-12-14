import { cardColumns } from "../../Stores";
import type { PlayingCard } from "./PlayingCard";

/**
 * Represents the current game board.
 */
export class GameBoard {

  constructor() {

  }

  setBoard(cards:PlayingCard[]) {
    const board:PlayingCard[][] = [];

    let cardIdx = 0;
    for (let i = 0; i < 7; i++) {
      board[i] = [];
      for (let j = 0; j < i+1; j++) {
        const card = cards[cardIdx];

        if (i == j) card.revealed = true;

        board[i][j] = card;
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