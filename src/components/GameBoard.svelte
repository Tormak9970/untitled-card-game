<script lang="ts">
  import Board from "./board/Board.svelte";
  import Deck from "./deck/Deck.svelte";
  import { CARD_HEIGHT, CARD_WIDTH } from "../lib/SpriteLUT";

  const CARD_SCALE = 0.4;
</script>

<div class="game-board">
  <div class="deck-cont" style="margin-right: {CARD_SCALE * CARD_WIDTH * 3}px;">
    <Deck scale={CARD_SCALE} />
  </div>
  <div class="board-cont">
    <Board scale={CARD_SCALE} />
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

  .deck-cont {

  }

  .board-cont {
    height: 100%;
  }
</style>