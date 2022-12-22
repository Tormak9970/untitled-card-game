<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "./Controller";
  import GameBoard from "./components/GameBoard.svelte";
  
  onMount(() => {
    Controller.init();
  });
</script>

<main>
  <GameBoard />
</main>

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
</style>