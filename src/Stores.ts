import { writable, type Writable } from "svelte/store";
import type { PlayingCard } from "./lib/models/PlayingCard";

export const highScore = writable(0);
export const cardColumns:Writable<PlayingCard[][]> = writable([
  [],
  [],
  [],
  [],
  [],
  [],
  []
]);