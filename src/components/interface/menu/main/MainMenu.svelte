<script lang="ts">
    import { getMany } from "idb-keyval";
  import { afterUpdate, onMount } from "svelte";
  import { Controller } from "../../../../Controller";
  import { Difficulty } from "../../../../lib/models/Difficulty";
  import { difficulty, isPaused, showGameStartModal, showLoadGameFromFile, showMainMenu, showOptionsMenu, showPauseMenu } from "../../../../Stores";
  import Button from "../../interactables/Button.svelte";
  import DropDown from "../../interactables/DropDown.svelte";
  import Pannel from "../../Pannel.svelte";

  let savedDiffs:string[] = [];
  let currDiff: string = "";
  let options = [];

  async function resumeClick() {
    await Controller.loadGame(false);
    $isPaused = false;
    $showMainMenu = false;
  }
  function newGameClick() {
    Controller.clearSavedGame($difficulty, false);
    Controller.startGame();
    $showMainMenu = false;
    $showGameStartModal = true;
  }
  function loadClick() { $showLoadGameFromFile = true; }
  function optionsClick() { $showOptionsMenu = true; }

  afterUpdate(() => {
    if (currDiff != $difficulty) {
      $difficulty = currDiff as Difficulty;
    }
  });

  onMount(async () => {
    options = Object.values(Difficulty);
    currDiff = $difficulty;

    const diffs = Object.values(Difficulty);
    const results = await getMany(diffs.map((diff:Difficulty) => `difficulty: ${diff}`));

    results.forEach((val:string, i:number) => {
      if (val) {
        savedDiffs.push(diffs[i]);
      }
    });

    savedDiffs = [...savedDiffs];
  });
</script>

<div class="main-menu">
  <div class="title">Untitled Card Game</div>
  <div class="sub-title">A Solitaire Game</div>
  <div class="buttons">
    <Pannel width="auto">
      <div class="main-menu-cont">
        <DropDown bind:value={currDiff} options={options} />
        {#if savedDiffs.includes(currDiff)}
          <Button text="Resume" width={"100%"} onClick={resumeClick} />
        {/if}
        <Button text="New Game" width={"100%"} onClick={newGameClick} />
        <Button text="Load" width={"100%"} onClick={loadClick} />
        <Button text="Options" width={"100%"} onClick={optionsClick} />
      </div>
    </Pannel>
  </div>
</div>

<style>
  @import "/theme.css";
  
  .main-menu {
    width: 100%;
    height: 100%;

    background-color: var(--background);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 34px;
    margin-bottom: 10px;
  }

  .sub-title {
    margin-bottom: 24px;
  }

  .buttons {
    width: 220px;
  }
  
  .main-menu-cont {
    max-width: 300px;
    pointer-events: all;

    display: grid;
    row-gap: 7px;
  }
</style>