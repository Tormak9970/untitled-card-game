import { Stack } from "../data-structs/Stack";
import { BaseCards, FaceCards } from "../models/CardEnums";
import { Deck } from "../models/Deck";
import { GameBoard } from "../models/GameBoard";
import { PlayingCard } from "../models/PlayingCard";
import { Suits } from "../models/Suits";

/**
 * Represents the current game state.
 */
export class GameController {
  private deck:Deck;
  private gameBoard:GameBoard;

  constructor() {
    this.deck = new Deck(this.generateCardStack());
    this.gameBoard = new GameBoard();
  }

  deal(): void { this.deck.dealCards(this.gameBoard); }
  drawCard(): void { this.deck.drawCard(); }
  recycleDeck(): void { this.deck.recycleDeck(); }
  playCurrentCard(): void { this.deck.playCurrentCard(); }

  private generateCardStack():Stack<PlayingCard> {
    const cards:PlayingCard[] = [];

    for (const suit of Object.values(Suits)) {
      for (const card of Object.values(BaseCards)) {
        cards.push(new PlayingCard(card, suit, false));
      }
  
      for (const card of Object.values(FaceCards)) {
        if (card != FaceCards.JOKER) cards.push(new PlayingCard(card, suit, false));
      }
    }

    return new Stack<PlayingCard>(cards);;
  }

  updateFromStores(): void {
    this.deck.updateFromStores();
  }
}