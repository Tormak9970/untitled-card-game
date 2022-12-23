import type { LinkedNode } from "./lib/data-structs/LinkedList"
import { CARD_ORDER, FaceCards, getNextCard, type Cards } from "./lib/models/CardEnums"
import type { PlayingCard } from "./lib/models/PlayingCard"
import { isBlackSuit, isRedSuit, Suits } from "./lib/models/Suits"

export function validateMove(parent:LinkedNode<PlayingCard>, tarElem:LinkedNode<PlayingCard>): boolean {
  const parentIsRed = isRedSuit(parent.data.suit as Suits);
  const targetIsBlack = isBlackSuit(tarElem.data.suit as Suits);
  const validSuit = parentIsRed == targetIsBlack;

  const validCard = CARD_ORDER[parent.data.card] > CARD_ORDER[tarElem.data.card];

  return validSuit && validCard;
}

export function getZoneType(card:LinkedNode<PlayingCard>): string {
  const nextColor = (!isRedSuit(card.data.suit as Suits)) ? "Red" : "Black";
  const nextCard = getNextCard(card.data.card);
  return nextCard == FaceCards.KING ? getKingZoneType() : `${nextColor}|${nextCard}`;
}

export function getHiddenZoneType(card:LinkedNode<PlayingCard>): string {
  if (card.data.card == FaceCards.KING) {
    return getKingZoneType();
  } else {
    return getCurrentCardZoneType(card.next);
  }
}

function isLinkedNode(card:LinkedNode<PlayingCard>|PlayingCard): card is LinkedNode<PlayingCard> {
  return (card as LinkedNode<PlayingCard>).next !== undefined;
}

export function getCurrentCardZoneType(card:LinkedNode<PlayingCard>|PlayingCard): string {
  let currCard:Cards;
  let suit:Suits;
  if (isLinkedNode(card)) {
    currCard = card.data.card;
    suit = card.data.suit as Suits;
  } else {
    suit = card.suit as Suits
    currCard = card.card;
  }
  const currColor = isRedSuit(suit) ? "Red" : "Black";
  return currCard == FaceCards.KING ? getKingZoneType() : `${currColor}|${currCard}`;
}

export function getKingZoneType(): string {
  return `King`;
}