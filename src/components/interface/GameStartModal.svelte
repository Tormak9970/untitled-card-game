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
    <div class="goal">

    </div>
    <div class="difficulty-desc">
      {#if $difficulty == Difficulty.BEGINNER}
        <div class="desc">

        </div>
      {:else if $difficulty == Difficulty.INTERMEDIATE}
        <div class="desc">
          
        </div>
      {:else if $difficulty == Difficulty.EXPERT}
        <div class="desc">
            
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
    
  }

  .goal {
    
  }

  .difficulty-desc {

  }

  .desc {

  }

  .buttons {

  }
</style>