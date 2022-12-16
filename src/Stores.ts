import { writable, type Writable } from "svelte/store";
import type { DLList } from "./lib/data-structs/DLList";
import type { PlayingCard } from "./lib/models/PlayingCard";

export const highScore = writable(0);
export const cardColumns:Writable<DLList<PlayingCard>[]> = writable([]);