<script lang="ts">
  import Pannel from "../../Pannel.svelte";
  import ScoreTracker from "./ScoreTracker.svelte";
  import Timer from "./Timer.svelte";
  import Turns from "./Turns.svelte";

  
</script>

<div class="game-info">
  <Pannel>
    <Timer />
    <ScoreTracker />
    <Turns />
  </Pannel>
</div>

<style>
  @import "/theme.css";
  
  .game-info {
    width: 400px;
    position: absolute;
    pointer-events: auto;

    right: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  
</style>