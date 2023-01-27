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
      max-width: 500px;
      position: absolute;
      pointer-events: auto;

      right: 0px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .wrapper {
      width: calc(100% - 2vw);
      height: 100%;

      display: grid;
      grid-template-columns: repeat(3, auto);
      column-gap: 4vw;
      
      padding: 0px 1vw;
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
      width: calc(100% - 2vw);
      height: 100%;

      display: grid;
      grid-template-columns: repeat(3, auto);
      column-gap: 4vw;
      
      padding: 0px 1vw;

      font-size: 80%;
    }
  }
</style>