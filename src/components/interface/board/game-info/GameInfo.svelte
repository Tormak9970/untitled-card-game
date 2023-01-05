<script lang="ts">
  import Pannel from "../../Pannel.svelte";
  import ScoreTracker from "./ScoreTracker.svelte";
  import Timer from "./Timer.svelte";
  import Turns from "./Turns.svelte";

</script>

<div class="game-info">
  <Pannel>
    <div class="wrapper">
      <Timer />
      <ScoreTracker />
      <Turns />
    </div>
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
  
  .wrapper {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
</style>