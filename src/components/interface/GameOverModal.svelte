<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../Controller";
  import { difficulty, gameSeed, gameTime, gameWasWon, score, showGameOverModal, showMainMenu, turns } from "../../Stores";
  import Button from "./interactables/Button.svelte";
  import Pannel from "./Pannel.svelte";

  let formattedTime:string;

  function retryClick() {
    Controller.retry();
    $showGameOverModal = false;
  }
  function mainMenuClick() {
    $showMainMenu = true;
    $showGameOverModal = false;
    Controller.clearSavedGame($difficulty);
  }

  onMount(() => {
    let total = $gameTime;

    const hr = Math.floor(total / (60**2));
    total -= hr * 60**2;

    const min = Math.floor(total / 60);
    total -= min * 60;

    const sec = total;

    formattedTime = `${hr < 10 ? `0${hr}`: hr}:${min < 10 ? `0${min}`: min}:${sec < 10 ? `0${sec}`: sec}`;
  });
</script>

<Pannel width="auto">
  <div class="game-over-modal">
    {#if $gameWasWon}
      <div class="title">Congrats!</div>
      <div class="notes">
        You beat <u>Untitled Card Game</u> on the <b>{$difficulty.toLowerCase()}</b> difficulty!
      </div>
    {:else}
      <div class="title">Dang...</div>
      <div class="notes">
        Since you weren't able to beat this deal, consider trying another!
      </div>
    {/if}
    <div class="title">Stats</div>
    <div class="stats">
      <div class="stat">Difficulty: {$difficulty}</div>
      <div class="stat">Status: {@html $gameWasWon ? (`<div style="margin-left: 7px; color: #36ff04;">Complete</div>`) : (`<div style="margin-left: 7px; color: #e24a4a;">Did not finish</div>`)}</div>
      <div class="stat">Time: {formattedTime}</div>
      <div class="stat">Moves: {$turns}</div>
      <div class="stat">Score: {$score}</div>
      <div class="stat">Seed: {$gameSeed}</div>
    </div>
    <div class="buttons">
      <Button text={"Retry"} width={"auto"} onClick={retryClick}/>
      <Button text={"Main Menu"} width={"auto"} onClick={mainMenuClick}/>
    </div>
  </div>
</Pannel>

<style>
  @import "/theme.css";
  
  .game-over-modal {
    max-width: 400px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 7px;
    border-bottom: 1px solid rgb(26, 26, 26);
  }

  .notes {
    font-size: 20px;
    margin-bottom: 14px;
  }

  .stats {
    margin-bottom: 28px;
  }

  .stat {
    margin-bottom: 4px;
    display: flex;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }
</style>