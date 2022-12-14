import type { PlayingCard } from "./PlayingCard";
import { Stack } from "../data-structs/Stack";
import type { GameBoard } from "./GameBoard";

/**
 * Class representing a deck of cards.
 */
export class Deck {
  private _drawPile: Stack<PlayingCard>;
  private _discardPile: Stack<PlayingCard>;

  constructor(cards:Stack<PlayingCard>) {
    this._drawPile = cards;
    this._discardPile = new Stack<PlayingCard>();
  }

  /**
   * Deals the nessesary cards.
   */
  dealCards(gameBoard:GameBoard) {
    this.shuffleDeck();
    const cards = this._drawPile.toArray();
    const topCards = cards.slice(0, 28);
    this._drawPile = new Stack<PlayingCard>(cards.slice(28));
    
    gameBoard.setBoard(topCards);
  }

  /**
   * Draws the top card of the draw pile.
   */
  drawCard() {

  }

  /**
   * Recycles the discard into the draw pile.
   */
  recycleDeck() {
    for (let i = 0; i < this._discardPile.size(); i++) {
      const card = this._discardPile.pop();
      this._drawPile.push(card);
    }
    this._discardPile = new Stack<PlayingCard>();
  }

  /**
   * Plays the current card.
   */
  playCurrentCard() {
    const card = this._drawPile.pop();
    this._discardPile.push(card);
  }

  /**
   * Shuffles the draw pile.
   */
  shuffleDeck() {
    const cards = this._drawPile.toArray();

    for (let i = cards.length-1; i >= 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tmp = cards[j];
      cards[j] = cards[i];
      cards[i] = tmp;
    }

    this._drawPile = new Stack<PlayingCard>(cards);
  }
}