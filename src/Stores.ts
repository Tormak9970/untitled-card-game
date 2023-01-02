import { writable, type Writable } from "svelte/store";
import type { LinkedList } from "./lib/data-structs/LinkedList";
import { Difficulty } from "./lib/models/Difficulty";
import type { PlayingCard } from "./lib/models/PlayingCard";

type CardColumn = LinkedList<PlayingCard>[];

// Universal stores
export const draggingSuit = writable(null);
export const draggingMoreThenOne = writable(false);

// UI stores
export const renderedList = writable({});

// Game State stores
export const highScore = writable(0);
export const moves:Writable<string[]> = writable([]);

export const cardColumns:Writable<CardColumn> = writable([]);
export const drawPileList:Writable<PlayingCard[]> = writable([]);
export const discardPileList:Writable<PlayingCard[]> = writable([]);

// Draw/Discard pile stores
export const discardId = writable(0);
export const drawPileBoundingRect:Writable<() => DOMRect> = writable(null);
export const discardPileBoundingRect:Writable<() => DOMRect> = writable(null);

// Ace piles stores
export const shouldCalcDrop = writable(true);
export const spadesPileId = writable(0);
export const spadesPileList:Writable<PlayingCard[]> = writable([]);
export const heartsPileId = writable(0);
export const heartsPileList:Writable<PlayingCard[]> = writable([]);
export const clubsPileId = writable(0);
export const clubsPileList:Writable<PlayingCard[]> = writable([]);
export const diamondPileId = writable(0);
export const diamondsPileList:Writable<PlayingCard[]> = writable([]);


// Settings stores
export const difficulty:Writable<Difficulty> = writable(Difficulty.INTERMEDIATE);

export const dropZoneStyle = {
  "border": '1px solid #d87e08',
  "borderRadius": "4px",
  "backgroundColor": "rgba(216, 126, 8, 0.2)"
};
export const discardZoneStyle = {
  "border": 'none',
  "borderRadius": "4px",
  "backgroundColor": "transparent"
}