export enum Suits {
  SPADE = "Spade",
  HEART = "Heart",
  CLUB = "Club",
  DIAMOND = "Diamond"
}

export function isRedSuit(suit:Suits): boolean { return suit == Suits.HEART || suit == Suits.DIAMOND; }
export function isBlackSuit(suit:Suits): boolean { return suit == Suits.SPADE || suit == Suits.CLUB; }

export enum JokerTypes {
  TRUTH = "Truth",
  LIES = "Lies"
}