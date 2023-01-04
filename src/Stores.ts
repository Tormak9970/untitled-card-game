import { writable, type Writable } from "svelte/store";
import type { LinkedList } from "./lib/data-structs/LinkedList";
import { Difficulty } from "./lib/models/Difficulty";
import type { PlayingCard } from "./lib/models/PlayingCard";

// Universal stores
export const highScore = writable(0);
export const draggingType = writable(null);
export const draggingSuit = writable(null);
export const draggingMoreThenOne = writable(false);

// UI stores
export const renderedList = writable({});

// Game state stores
export const difficulty:Writable<Difficulty> = writable(Difficulty.INTERMEDIATE);
export const score = writable(0);
export const turns = writable(0);
export const gameTime = writable("");
export const moves:Writable<string[]> = writable([]);

// Game board stores
export const cardColumns:Writable<LinkedList<PlayingCard>[]> = writable([]);
export const drawPileList:Writable<PlayingCard[]> = writable([]);
export const discardPileList:Writable<PlayingCard[]> = writable([]);

// Draw/Discard pile stores
export const discardId = writable(0);
export const drawPileBoundingRect:Writable<() => DOMRect> = writable(null);
export const discardPileBoundingRect:Writable<() => DOMRect> = writable(null);

// Ace piles stores
export const spadesPileList:Writable<PlayingCard[]> = writable([]);
export const heartsPileList:Writable<PlayingCard[]> = writable([]);
export const clubsPileList:Writable<PlayingCard[]> = writable([]);
export const diamondsPileList:Writable<PlayingCard[]> = writable([]);


// Settings stores

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