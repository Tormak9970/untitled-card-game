<script lang="ts">
  import GameInfo from "./interface/board/game-info/GameInfo.svelte";
  import GameControls from "./interface/board/game-controls/GameControls.svelte";
  import Logo from "./interface/board/Logo.svelte";
  import Modal from "./interface/Modal.svelte";
  import { showPauseMenu } from "../Stores";
  import PauseMenu from "./interface/menu/PauseMenu.svelte";

</script>

<div class="game-ui">
  <Logo />
  <GameInfo />
  <GameControls />
	<div class="rights">© Travis Lane {new Date().getFullYear()}</div>

  <!-- Pause Menu Modal -->
  <Modal showing={$showPauseMenu}>
    <PauseMenu />
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