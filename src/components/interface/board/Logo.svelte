<script lang="ts">
    import { Controller } from "../../../Controller";
  import MediaQuery from "../MediaQuery.svelte";
import Pannel from "../Pannel.svelte";

</script>

<div class="game-logo">
  <MediaQuery query="{Controller.ORIENTATION_QUERY}" let:matches>
    {#if matches}
      <Pannel padding="0px 14px">
        <div class="wrapper">
          <img src="/assets/pixel-crown.png" alt="logo" height="53px">
          <div style="margin-left: 20px;">Utitled Card Game - v{__APP_VERSION__}</div>
        </div>
      </Pannel>
    {:else}
      <Pannel padding="0px 0px" width="53px">
        <div class="wrapper">
          <img src="/assets/pixel-crown.png" alt="logo" height="53px" use:Controller.tippy={{content: `Utitled Card Game - v${__APP_VERSION__}`, placement: "right"}}>
        </div>
      </Pannel>
    {/if}
  </MediaQuery>
</div>

<style>
  @import "/theme.css";

  @media (orientation:landscape) {
    .game-logo {
      width: 500px;
      position: absolute;
      pointer-events: auto;

      left: 0px;

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
      justify-content: flex-start;
    }
  }

  @media (orientation:portrait) {
    .game-logo {
      width: auto;
      position: absolute;
      pointer-events: auto;

      left: 0px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .wrapper {
      width: 53px;
      height: 53px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
</style>