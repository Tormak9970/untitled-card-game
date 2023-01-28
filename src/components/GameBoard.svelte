<script lang="ts">
  import Board from "./board/Board.svelte";
  import Deck from "./deck/Deck.svelte";
  import Piles from "./piles/Piles.svelte";
  import { frontColumn, isSmallDevice, movingToDiscard } from "../Stores";
  import { Controller } from "../Controller";
  import MediaQuery from "./interface/MediaQuery.svelte";

  const CARD_SCALE = Controller.CARD_SCALE;
  
  const DISCARD_UNCOVERED_PERCENT = 0.3;
</script>

<MediaQuery query="{Controller.ORIENTATION_QUERY}" let:matches>
  {#if matches}
    {#if $isSmallDevice}
      <div class="game-board">
        <div class="left">
          <div class="deck-cont" style="{($movingToDiscard) ? "z-index:100; " : ""}">
            <Deck scale={CARD_SCALE} uncoveredPercent={DISCARD_UNCOVERED_PERCENT}/>
          </div>
          <div class="piles-cont">
            <Piles scale={CARD_SCALE} />
          </div>
        </div>
        <div class="board-cont" style="{($frontColumn != -1) ? "z-index:100;" : ""}">
          <Board scale={CARD_SCALE} />
        </div>
      </div>
    {:else}
      <div class="game-board">
        <div class="deck-cont" style="{($movingToDiscard) ? "z-index:100; " : ""}">
          <Deck scale={CARD_SCALE} uncoveredPercent={DISCARD_UNCOVERED_PERCENT}/>
        </div>
        <div class="board-cont" style="{($frontColumn != -1) ? "z-index:100;" : ""}">
          <Board scale={CARD_SCALE} />
        </div>
        <div class="piles-cont">
          <Piles scale={CARD_SCALE} />
        </div>
      </div>
    {/if}
  {:else}
    <div class="game-board">
      <div class="top">
        <div class="deck-cont" style="{($movingToDiscard) ? "z-index:100; " : ""}">
          <Deck scale={CARD_SCALE} uncoveredPercent={DISCARD_UNCOVERED_PERCENT}/>
        </div>
        <div class="piles-cont">
          <Piles scale={CARD_SCALE} />
        </div>
      </div>
      <div class="board-cont" style="{($frontColumn != -1) ? "z-index:100;" : ""}">
        <Board scale={CARD_SCALE} />
      </div>
    </div>
  {/if}
</MediaQuery>

<style>
  @import "/theme.css";

  @media (orientation: landscape) and (min-height: 810px) {
    .game-board {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: space-around;

      color: var(--font-color);
    }

    .board-cont { height: 100%; margin-top: 3.5px; }

    .piles-cont {
      margin-top: 7px;
      margin-left: 7px;
    }

    .deck-cont {
      margin-right: 7px;
    }
  }

  @media (orientation: landscape) and (max-height: 809px) {
    .game-board {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      justify-content: space-around;

      color: var(--font-color);
    }

    .board-cont { height: 100%; margin-top: 3.5px; }

    .piles-cont {
      margin-top: 7px;
      margin-left: 7px;
    }

    .deck-cont {
      margin-right: 7px;
    }

    .left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  @media (orientation: portrait) {
    .game-board {
      margin-top: 40px;
      width: 100%;
      height: calc(100% - 40px);

      display: flex;
      flex-direction: column;
      align-items: center;

      color: var(--font-color);
    }

    .top {
      width: 100%;
      padding: 0vw 1.944vw;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .board-cont { width: 100%; }
  }
</style>