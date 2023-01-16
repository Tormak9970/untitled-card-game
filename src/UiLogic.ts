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
import type { LinkedNode } from "./lib/data-structs/LinkedList"
import { CARD_ORDER, FaceCards, getNextCard, type Cards } from "./lib/models/CardEnums"
import type { PlayingCard } from "./lib/models/PlayingCard"
import { isBlackSuit, isRedSuit, Suits } from "./lib/models/Suits"

/**
 * Checks if a move was a valid move.
 * @param parent The parent linked node.
 * @param tarElem The target linked node.
 * @returns True if the move was valid.
 */
export function validateMove(parent:LinkedNode<PlayingCard>, tarElem:LinkedNode<PlayingCard>): boolean {
  const parentIsRed = isRedSuit(parent.data.suit as Suits);
  const targetIsBlack = isBlackSuit(tarElem.data.suit as Suits);
  const validSuit = parentIsRed == targetIsBlack;

  const validCard = CARD_ORDER[parent.data.card] > CARD_ORDER[tarElem.data.card];

  return validSuit && validCard;
}

/**
 * Gets the zone type for a card.
 * @param card The target card.
 * @returns The type of the zone based on the current card.
 */
export function getZoneType(card:LinkedNode<PlayingCard>): string {
  const nextColor = (!isRedSuit(card.data.suit as Suits)) ? "Red" : "Black";
  const nextCard = getNextCard(card.data.card);
  return `${nextColor}|${nextCard}`;
}

/**
 * Gets the zone type for a face down card.
 * @param card The target card.
 * @returns The zone type for the target card.
 */
export function getHiddenZoneType(card:LinkedNode<PlayingCard>): string {
  return getCurrentCardZoneType(card.next);
}

function isLinkedNode(card:LinkedNode<PlayingCard>|PlayingCard): card is LinkedNode<PlayingCard> {
  return (card as LinkedNode<PlayingCard>).next !== undefined;
}

/**
 * Gets the zone type for a face up card.
 * @param card The target card.
 * @returns The zone type for the target card.
 */
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

/**
 * Gets the zone type for a king card.
 * @returns The zone type for the target card.
 */
export function getKingZoneType(): string {
  return `King`;
}