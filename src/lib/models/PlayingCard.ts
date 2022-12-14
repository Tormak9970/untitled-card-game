import type { Cards } from "./CardEnums";
import type { JokerTypes, Suits } from "./Suits";

/**
 * Class representing a playing card.
 */
export class PlayingCard {
  private _card:Cards;
  private _suit:Suits|JokerTypes;
  revealed:boolean

  constructor(card:Cards, suit:Suits|JokerTypes, revealed:boolean) {
    this._card = card;
    this._suit = suit;
    this.revealed = revealed;
  }

  get card() { return this._card; }

  get suit() { return this._suit; }
}