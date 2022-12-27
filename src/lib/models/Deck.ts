import type { PlayingCard } from "./PlayingCard";
import { Stack } from "../data-structs/Stack";
import type { GameBoard } from "./GameBoard";
import { discardPileList, drawPileList } from "../../Stores";
import { get } from "svelte/store";

/**
 * Class representing a deck of cards.
 */
export class Deck {
  private _drawPile: Stack<PlayingCard>;
  private _discardPile: Stack<PlayingCard>;

  constructor(cards:Stack<PlayingCard>) {
    this._drawPile = cards;
    this._discardPile = new Stack<PlayingCard>();
    
    this.updateStores();
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
    
    this.updateStores();
  }

  /**
   * Draws the top card of the draw pile.
   */
  drawCard() {
    const card = this._drawPile.pop();
    card.revealed = true;
    this._discardPile.push(card);
    
    this.updateStores();
  }

  /**
   * Recycles the discard into the draw pile.
   */
  recycleDeck() {
    for (let i = 0; i < this._discardPile.size(); i++) {
      const card = this._discardPile.pop();
      card.revealed = false;
      this._drawPile.push(card);
    }
    this._discardPile = new Stack<PlayingCard>();
    
    this.updateStores();
  }

  /**
   * Plays the current card.
   */
  playCurrentCard() {
    this._discardPile.pop();
    this.updateStores();
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

    this.updateStores();
  }

  /**
   * Updates the stores associated with the draw pile.
   */
  private updateStores(): void {
    // const drwCard = this._drawPile.peek();
    // if (drwCard) drawCard.set(JSON.parse(JSON.stringify(drwCard)));

    // const dscCard = this._discardPile.peek();
    // if (dscCard) discardCard.set(JSON.parse(JSON.stringify(dscCard)));
    drawPileList.set(this._drawPile.toArray());
    discardPileList.set(this._discardPile.toArray());
    // console.log({
    //   "drawPile": get(drawPileList),
    //   "discardPile": get(discardPileList)
    // })
  }
}