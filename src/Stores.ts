import { writable } from "svelte/store";

export const CARD_WIDTH = 360;
export const CARD_HEIGHT = 504;

export const highScore = writable(0);