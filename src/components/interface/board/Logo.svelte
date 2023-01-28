<script lang="ts">
  import { Controller } from "../../../Controller";
  import { isSmallDevice } from "../../../Stores";
  import MediaQuery from "../MediaQuery.svelte";
  import Pannel from "../Pannel.svelte";

</script>

<div class="game-logo">
  <MediaQuery query="{Controller.ORIENTATION_QUERY}" let:matches>
    {#if matches && !$isSmallDevice}
      <Pannel padding="0px 14px" height="51px">
        <div class="wrapper">
          <img src="/assets/pixel-crown.png" alt="logo" height="53px">
          <!-- svelte-ignore missing-declaration -->
          <div style="margin-left: 20px;">Utitled Card Game - v{__APP_VERSION__}</div>
        </div>
      </Pannel>
    {:else}
      <Pannel padding="0px 0px" width="51px" height="51px">
        <div class="wrapper">
          <!-- svelte-ignore missing-declaration -->
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

      padding-right: 1vw;
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
      width: 51px;
      height: 51px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
  }
</style>