<script lang="ts">
  import { gameWasWon } from "../../Stores";


  
</script>

<div class="game-over-modal">
  {#if $gameWasWon}

  {:else}

  {/if}
</div>

<style>
  @import "/theme.css";
  
  .game-over-modal {
    
  }
  
</style>