<script lang="ts">
  import Board from "./board/Board.svelte";
  import Deck from "./deck/Deck.svelte";
  import { CARD_WIDTH } from "../lib/SpriteLUT";
  import Piles from "./piles/Piles.svelte";
  import { difficulty } from "../Stores";
  import { Difficulty } from "../lib/models/Difficulty";
  import { Controller } from "../Controller";

  const CARD_SCALE = Controller.CARD_SCALE;
  
  const DISCARD_UNCOVERED_PERCENT = 0.3;
</script>

<div class="game-board">
  <div class="deck-cont" style="margin-right: {CARD_SCALE * CARD_WIDTH * 2 - ($difficulty == Difficulty.BEGINNER ? 0 : (CARD_WIDTH * CARD_SCALE * DISCARD_UNCOVERED_PERCENT * 2))}px;">
    <Deck scale={CARD_SCALE} uncoveredPercent={DISCARD_UNCOVERED_PERCENT}/>
  </div>
  <div class="board-cont">
    <Board scale={CARD_SCALE} />
  </div>
  <div class="piles-cont" style="margin-left: {CARD_SCALE * CARD_WIDTH}px;">
    <Piles scale={CARD_SCALE} />
  </div>
</div>

<style>
  @import "/theme.css";

  .game-board {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    color: var(--font-color);
  }

  /* .deck-cont {

  } */

  .board-cont {
    height: 100%;
  }

  /* .piles-cont {
    
  } */
</style>