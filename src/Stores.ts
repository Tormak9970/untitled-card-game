import { writable, type Writable } from "svelte/store";
import type { LinkedList } from "./lib/data-structs/LinkedList";
import type { PlayingCard } from "./lib/models/PlayingCard";

type CardColumn = LinkedList<PlayingCard>[];

// UI Stores
export const renderedList = writable({});

// Game State Stores
export const cardColumns:Writable<CardColumn> = writable([]);
export const highScore = writable(0);
export const moves:Writable<string[]> = writable([]);


export const dropZoneStyle = {
  border: '1px solid #d87e08',
  borderRadius: "4px",
  backgroundColor: "rgba(216, 126, 8, 0.2)"
};