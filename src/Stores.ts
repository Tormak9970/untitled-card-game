import { writable, type Writable } from "svelte/store";
import type { LinkedList } from "./lib/data-structs/LinkedList";
import type { PlayingCard } from "./lib/models/PlayingCard";

export const highScore = writable(0);
export const cardColumns:Writable<LinkedList<PlayingCard>[]> = writable([]);


export const dropZoneStyle = {
  border: '2px dashed #d87e08',
  borderRadius: "4px"
};