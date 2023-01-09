import type { PlayingCard } from "./PlayingCard";
import { Stack } from "../data-structs/Stack";
import type { GameBoard } from "./GameBoard";
import { difficulty, discardPileList, drawPileList } from "../../Stores";
import { get } from "svelte/store";
import { Difficulty } from "./Difficulty";

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
    const curDiff = get(difficulty);

    let ittr = 3;
    if (curDiff == Difficulty.BEGINNER) {
      ittr = 1
    }

    for (let i = 0; i < ittr; i++) {
      try {
        const card = this._drawPile.pop();
        card.revealed = true;
        this._discardPile.push(card);
      } catch (e:any) {
        console.log("no cards left!");
        break;
      }
    }
    
    this.updateStores();
  }

  /**
   * Recycles the discard into the draw pile.
   */
  recycleDeck() {
    const discardSize = this._discardPile.size();
    for (let i = 0; i < discardSize; i++) {
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

  updateFromStores(): void {
    this._drawPile = new Stack<PlayingCard>(get(drawPileList));
    this._discardPile = new Stack<PlayingCard>(get(discardPileList));
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