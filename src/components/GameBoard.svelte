<script lang="ts">
  import Board from "./board/Board.svelte";
  import Deck from "./deck/Deck.svelte";
</script>

<div class="game-board">
  <div class="deck-cont">
    <Deck />
  </div>
  <div class="board-cont">
    <Board />
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