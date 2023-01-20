<script lang="ts">
  import { Difficulty } from "../../lib/models/Difficulty";
  import { difficulty, isPaused, showGameStartModal } from "../../Stores";
  import Button from "./interactables/Button.svelte";
  import Pannel from "./Pannel.svelte";

  function start() {
    $showGameStartModal = false;
    $isPaused = false;
  }
</script>

<Pannel width="auto">
  <div class="game-start">
    <div class="title">Before you start</div>
    <div class="notes">
      <div>- The goal is to move all of the cards to the pile for their suit</div>
      <div>- Cards are stacked in accending order (Ace -> King)</div>
      <div></div>
    </div>
    <div class="difficulty-desc">
      <div class="selected-diff"><b>Selected Difficulty:</b> {$difficulty}</div>
      {#if $difficulty == Difficulty.BEGINNER}
        <div class="desc">
          - Cards in the draw pile flip over one at a time, but you are penalized by 100 points each time you recycle the deck.
        </div>
      {:else if $difficulty == Difficulty.INTERMEDIATE}
        <div class="desc">
          - Cards are drawn from the draw pile in sets of three, but there is no penalty for recycling the deck.
        </div>
      {:else if $difficulty == Difficulty.EXPERT}
        <div class="desc">
          - Cards are drawn in sets of three, but you are limited to a max of three cycles through the draw pile.
        </div>
      {/if}
    </div>
    <div class="buttons">
      <Button text={"Start"} width={"100%"} onClick={start}/>
    </div>
  </div>
</Pannel>

<style>
  @import "/theme.css";
  
  .game-start {
    max-width: 400px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 7px;
  }

  .notes {
    font-size: 20px;
    margin-bottom: 14px;
  }
  .notes > div {
    margin-bottom: 7px;
  }

  .difficulty-desc {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .selected-diff {
    font-size: 24px;
    margin-bottom: 7px;
  }
</style>