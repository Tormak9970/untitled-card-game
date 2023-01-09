<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Controller } from "./Controller";
  import GameBoard from "./components/GameBoard.svelte";
  import Interface from "./components/Interface.svelte";
  
  onMount(() => {
    Controller.init();
    setTimeout(() => {
      Controller.saveGame(true);
    }, 1000);
  });

  onDestroy(() => {
    Controller.cleanUp();
  })
</script>

<main>
  <div class="board-cont">
    <GameBoard />
  </div>
  <div class="ui">
    <Interface />
  </div>
</main>
<SvelteToast />

<style>
  @import "/theme.css";

  main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--font-color);
  }

  .board-cont {
    width: calc(100% - 15vh);
    height: calc(100% - 15vh);

    border-radius: 8px;
  }

  .ui {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0px;
    left: 0px;
    
    pointer-events: none;
  }
</style>