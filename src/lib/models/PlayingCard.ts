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
import type { Cards } from "./CardEnums";
import type { JokerTypes, Suits } from "./Suits";

/**
 * Class representing a playing card.
 */
export class PlayingCard {
  card:Cards;
  suit:Suits|JokerTypes;
  revealed:boolean

  constructor(card:Cards, suit:Suits|JokerTypes, revealed:boolean) {
    this.card = card;
    this.suit = suit;
    this.revealed = revealed;
  }

  /**
   * Creates a PlayingCard instance from a json object.
   * @param json The json object.
   * @returns A new PlayingCard instance.
   */
  static fromJson(json:any): PlayingCard {
    return new PlayingCard(json.card, json.suit, json.revealed);
  }
}