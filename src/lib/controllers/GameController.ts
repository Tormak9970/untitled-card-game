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

  /**
   * Deals the cards.
   */
  deal(): void { this.deck.dealCards(this.gameBoard); }

  /**
   * Draws the card(s).
   */
  drawCard(): void { this.deck.drawCard(); }

  /**
   * Recycles the deck.
   */
  recycleDeck(): void { this.deck.recycleDeck(); }

  /**
   * Plays the top card of the discard.
   */
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

  /**
   * Updates the internal deck based on the in memory stores.
   */
  updateFromStores(): void {
    this.deck.updateFromStores();
  }
}