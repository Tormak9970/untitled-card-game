<script lang="ts">
  import { isPaused, showGameStartModal, showLoadGameFromFile, showMainMenu, showOptionsMenu } from "../../../../Stores";
  import Button from "../../interactables/Button.svelte";
  import Pannel from "../../Pannel.svelte";

  function resumeClick() {
    $isPaused = false;
    $showMainMenu = false;
  }
  function newGameClick() {
    $showMainMenu = false;
    $showGameStartModal = true;
  }
  function loadClick() { $showLoadGameFromFile = true; }
  function optionsClick() { $showOptionsMenu = true; }
</script>

<div class="main-menu">
  <!-- Title -->
  <Pannel width="auto">
    <div class="main-menu-cont">
      <!-- Difficulty Selector -->
      <Button text="Resume" width={"100%"} onClick={resumeClick} />
      <Button text="New Game" width={"100%"} onClick={newGameClick} />
      <Button text="Load" width={"100%"} onClick={loadClick} />
      <Button text="Options" width={"100%"} onClick={optionsClick} />
    </div>
  </Pannel>
</div>

<style>
  @import "/theme.css";
  
  .main-menu {
    width: 100%;
    height: 100%;

    background-color: var(--background);
  }
  
  .main-menu-cont {
    max-width: 300px;
    pointer-events: all;

    display: grid;
    row-gap: 7px;
  }
</style>