<script lang="ts">
  import Board from "../board/Board.svelte";
</script>

<div class="game-board">
  <Board />
</div>

<style>
  @import "/theme.css";

  .game-board {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--font-color);
  }
</style>