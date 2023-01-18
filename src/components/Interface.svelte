<script lang="ts">
  import GameInfo from "./interface/board/game-info/GameInfo.svelte";
  import GameControls from "./interface/board/game-controls/GameControls.svelte";
  import Logo from "./interface/board/Logo.svelte";
  import Modal from "./interface/Modal.svelte";
  import { gameWasWon, showGameStartModal, showGameOverModal, showLoadGameFromFile, showLoadSettingsFromFile, showMainMenu, showOptionsMenu, showPauseMenu, showSaveGameToFile, showSaveSettingsToFile } from "../Stores";
  import PauseMenu from "./interface/menu/PauseMenu.svelte";
  import FilePicker from "./interface/FilePicker.svelte";
  import { Controller } from "../Controller";

  function saveGameToFile() {
    Controller.saveGame(true);
    $showSaveGameToFile = false;
  }
  function loadGameFromFile() {
    Controller.loadGame(true);
    $showLoadGameFromFile = false;
  }

  function saveSettingsToFile() {

  }
  function loadSettingsFromFile() {

  }
</script>

<div class="game-ui">
  <Logo />
  <GameInfo />
  <GameControls />
	<div class="rights">© Travis Lane {new Date().getFullYear()}</div>

  <!-- Main Menu Modal -->
  <Modal showing={$showMainMenu}>
    <!-- <PauseMenu /> -->
  </Modal>

  <!-- Game Start Modal -->
  <Modal showing={$showGameStartModal}>
    <!-- <PauseMenu /> -->
  </Modal>

  <!-- Pause Menu Modal -->
  <Modal showing={$showPauseMenu}>
    <PauseMenu />
  </Modal>

  <!-- Options Menu Modal -->
  <Modal showing={$showOptionsMenu}>
    <!-- <PauseMenu /> -->
  </Modal>

  <!-- Save Game Modal -->
  <Modal showing={$showSaveGameToFile}>
    <FilePicker message={"Would you like to download a save of this game?"} onConfirm={saveGameToFile} onCancel={() => { $showSaveGameToFile = false; }}/>
  </Modal>

  <!-- Load Game Modal -->
  <Modal showing={$showLoadGameFromFile}>
    <FilePicker message={"Would you like to load a game save from your computer?"} onConfirm={loadGameFromFile} onCancel={() => { $showLoadGameFromFile = false; }}/>
  </Modal>

  <!-- Save Settings Modal -->
  <Modal showing={$showSaveSettingsToFile}>
    <FilePicker message={"Would you like to download your settings?"} onConfirm={saveSettingsToFile} onCancel={() => { $showSaveSettingsToFile = false; }}/>
  </Modal>

  <!-- Load Settings Modal -->
  <Modal showing={$showLoadSettingsFromFile}>
    <FilePicker message={"Would you like to load your settings from your computer?"} onConfirm={loadSettingsFromFile} onCancel={() => { $showLoadSettingsFromFile = false; }}/>
  </Modal>

  <!-- Game End Modal -->
  <Modal showing={$showGameOverModal}>
    {#if $gameWasWon}

    {:else}

    {/if}
  </Modal>
</div>

<style>
  @import "/theme.css";

  .game-ui {
    width: 100%;
    height: 100%;

    color: var(--font-color);
  }
	.rights {
		position: absolute;
		left: 7px;
		bottom: 7px;
		font-size: 10px;
		opacity: 0.4;

		z-index: 1000;
	}

  :global(.tippy-box) {
    font-size: 16px;
  }
</style>