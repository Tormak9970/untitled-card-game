<script lang="ts">
    import GameInfo from "./interface/board/game-info/GameInfo.svelte";
    import GameControls from "./interface/board/GameControls.svelte";

  
</script>

<div class="game-ui">
  <GameInfo />
  <GameControls />
</div>

<style>
  @import "/theme.css";

  .game-ui {
    width: 100%;
    height: 100%;

    color: var(--font-color);
  }
</style>