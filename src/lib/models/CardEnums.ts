export enum BaseCards {
  TWO = "Two",
  THREE = "Three",
  FOUR = "Four",
  FIVE = "Five",
  SIX = "Six",
  SEVEN = "Seven",
  EIGHT = "Eight",
  NINE = "Nine",
  TEN = "Ten"
}

export enum FaceCards {
  ACE = "Ace",
  JACK = "Jack",
  QUEEN = "Queen",
  KING = "King",
  JOKER = "Joker"
}

export type Cards = BaseCards | FaceCards;

type CardOrder = {
  [key in Cards]: number;
}

const CARD_ORDER: CardOrder = {
  "Joker": -1,
  "Ace": 0,
  "Two": 1,
  "Three": 2,
  "Four": 3,
  "Five": 4,
  "Six": 5,
  "Seven": 6,
  "Eight": 7,
  "Nine": 8,
  "Ten": 9,
  "Jack": 10,
  "Queen": 11,
  "King": 12
};

export function getPreviousCard(card:Cards): string {
  return card == FaceCards.KING ? "None" : Object.keys(CARD_ORDER).find((val) => CARD_ORDER[val] == CARD_ORDER[card] + 1);
}

export function getNextCard(card:Cards): string {
  return card == FaceCards.ACE ? "None" : Object.keys(CARD_ORDER).find((val) => CARD_ORDER[val] == CARD_ORDER[card] - 1);
}

export { CARD_ORDER };