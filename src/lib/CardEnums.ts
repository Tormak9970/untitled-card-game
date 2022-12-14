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