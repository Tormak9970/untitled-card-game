<script lang="ts">
  import Pannel from "../Pannel.svelte";

</script>

<div class="game-logo">
  <Pannel padding="0px 14px">
    <div class="wrapper">
      <img src="/assets/pixel-crown.png" alt="logo" height="53px">
      <div style="margin-left: 20px;">Utitled Card Game - v{__APP_VERSION__}</div>
    </div>
  </Pannel>
</div>

<style>
  @import "/theme.css";
  
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
</style>