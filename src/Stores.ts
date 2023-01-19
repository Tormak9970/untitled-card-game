import { writable, type Writable } from "svelte/store";
import type { LinkedList } from "./lib/data-structs/LinkedList";
import type { CardPosition } from "./lib/models/CardLocation";
import { Difficulty } from "./lib/models/Difficulty";
import type { PlayingCard } from "./lib/models/PlayingCard";

// Universal stores
export const highScore = writable(0);
export const draggingType = writable(null);
export const draggingSuit = writable(null);
export const draggingMoreThenOne = writable(false);
export const gameWasWon = writable(false);

// UI stores
export const showMainMenu = writable(false);
export const showPauseMenu = writable(false);
export const showOptionsMenu = writable(false);
export const showGameStartModal = writable(false);
export const showGameOverModal = writable(false);
export const showSaveGameToFile = writable(false);
export const showLoadGameFromFile = writable(false);
export const showSaveSettingsToFile = writable(false);
export const showLoadSettingsFromFile = writable(false);
export const isPaused = writable(false);
export const redoDisabled = writable(true);
export const undoDisabled = writable(true);

export const renderedList = writable({});

// Game state stores
export const difficulty:Writable<Difficulty> = writable(Difficulty.INTERMEDIATE);
export const score = writable(0);
export const turns = writable(0);
export const gameTime = writable(0);
export const moves:Writable<string[]> = writable([]);
export const preRedoMoves:Writable<string[]> = writable([]);

export const shouldPlayUndoAnim = writable(false);
export const shouldPlayRedoAnim = writable(false);

// Game board stores
export const cardColumns:Writable<LinkedList<PlayingCard>[]> = writable([]);
export const drawPileList:Writable<PlayingCard[]> = writable([]);
export const discardPileList:Writable<PlayingCard[]> = writable([]);

// Draw/Discard pile stores
export const discardId = writable(0);

// Layout stores
export const drawPileBoundingRect:Writable<() => DOMRect> = writable(null);
export const discardPileBoundingRect:Writable<() => DOMRect> = writable(null);

export const frontColumn = writable(-1);
export const movingToDiscard = writable(false);
export const shouldAnimateDrawPile = writable(false);
export const columnBoundingRectFuncs:{[key:string]: () => DOMRect} = {
  "column0": null,
  "column1": null,
  "column2": null,
  "column3": null,
  "column4": null,
  "column5": null,
  "column6": null
};
export const columnBoundingRects:{[key:string]: DOMRect} = {
  "column0": null,
  "column1": null,
  "column2": null,
  "column3": null,
  "column4": null,
  "column5": null,
  "column6": null
};

export const suitPileBoundingRectFuncs:{[key:string]: () => DOMRect} = {
  "spade": null,
  "heart": null,
  "club": null,
  "diamond": null,
};
export const suitPileBoundingRects:{[key:string]: DOMRect} = {
  "spade": null,
  "heart": null,
  "club": null,
  "diamond": null,
};

export const cardPositionLUT:{[id:string]:CardPosition} = {};

// Ace piles stores
export const spadesPileList:Writable<PlayingCard[]> = writable([]);
export const heartsPileList:Writable<PlayingCard[]> = writable([]);
export const clubsPileList:Writable<PlayingCard[]> = writable([]);
export const diamondsPileList:Writable<PlayingCard[]> = writable([]);

// Settings stores
export const musicVolumeSetting = writable(100);
export const sfxVolumeSetting = writable(100);
export const timedSetting = writable(true);


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