<script lang="ts">
    import { Controller } from "../../../../Controller";
  import MediaQuery from "../../MediaQuery.svelte";
import Pannel from "../../Pannel.svelte";
  import ScoreTracker from "./ScoreTracker.svelte";
  import Timer from "./Timer.svelte";
  import Turns from "./Turns.svelte";

</script>

<div class="game-info">
  <MediaQuery query="{Controller.ORIENTATION_QUERY}" let:matches>
    {#if matches}
      <Pannel>
        <div class="wrapper">
          <Timer />
          <ScoreTracker />
          <Turns />
        </div>
      </Pannel>
    {:else}
      <Pannel padding="11px">
        <div class="wrapper">
          <Timer />
          <ScoreTracker />
          <Turns />
        </div>
      </Pannel>
    {/if}
  </MediaQuery>
</div>

<style>
  @import "/theme.css";

  @media (orientation:landscape) {
    .game-info {
      width: 500px;
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
  }

  @media (orientation:portrait) {
    .game-info {
      width: 100%;
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

      display: grid;
      grid-template-columns: repeat(4, auto);
      column-gap: 4vw;

      font-size: 80%;
    }
  }
</style>