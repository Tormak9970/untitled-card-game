<script lang="ts">
import Pannel from "../../Pannel.svelte";
  
</script>

<div class="game-controls">
  <Pannel>
    <div class="wrapper">
      <!-- License declaration? -->
      <!-- Hint Button -->
      <!-- Settings Button -->
    </div>
  </Pannel>
</div>

<style>
  @import "/theme.css";
  
  .game-controls {
    width: 500px;
    position: absolute;
    pointer-events: auto;

    right: 0px;
    bottom: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
</style>