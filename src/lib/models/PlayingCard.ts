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
}