<script lang="ts">
  import { Controller } from "../../../../Controller";
  import { isPaused, redoDisabled, showPauseMenu, undoDisabled } from "../../../../Stores";
  import IconButton from "../../interactables/IconButton.svelte";
    import MediaQuery from "../../MediaQuery.svelte";
  import Pannel from "../../Pannel.svelte";
  
  function redoClick() { Controller.redoMove(); }
  function undoClick() { Controller.undoMove(); }
  function githubClick() { window.open("https://github.com/Tormak9970/untitled-card-game", "_blank", "noreferrer noopener"); }
  function hintClick() { Controller.showHint(); }
  function settingsClick() { $isPaused = true; $showPauseMenu = true; }
</script>

<div class="game-controls">
  <MediaQuery query="{Controller.ORIENTATION_QUERY}" let:matches>
    {#if matches}
      <Pannel>
        <div class="wrapper">
          <div class="undo-redo" class:disabled={$undoDisabled}>
            <IconButton onClick={undoClick} tooltip={true} tooltipText={"Undo"}>
              <div class="undo-icon" />
            </IconButton>
          </div>
          
          <div class="undo-redo" class:disabled={$redoDisabled}>
            <IconButton onClick={redoClick} tooltip={true} tooltipText={"Redo"}>
              <div class="redo-icon" />
            </IconButton>
          </div>
    
          <IconButton onClick={githubClick} tooltip={true} tooltipText={"Github"}>
            <div class="github-icon" />
          </IconButton>
          
          <!-- <IconButton onClick={hintClick} tooltip={true} tooltipText={"Show Hint"}>
            <div class="hint-icon" />
          </IconButton> -->
          
          <IconButton onClick={settingsClick} tooltip={true} tooltipText={"Settings"}>
            <div class="setting-icon" />
          </IconButton>
        </div>
      </Pannel>
    {:else}
      <Pannel padding="10px">
        <div class="wrapper">
          <div class="undo-redo" class:disabled={$undoDisabled}>
            <IconButton onClick={undoClick} tooltip={true} tooltipText={"Undo"}>
              <div class="undo-icon" />
            </IconButton>
          </div>
          
          <div class="undo-redo" class:disabled={$redoDisabled}>
            <IconButton onClick={redoClick} tooltip={true} tooltipText={"Redo"}>
              <div class="redo-icon" />
            </IconButton>
          </div>
    
          <IconButton onClick={githubClick} tooltip={true} tooltipText={"Github"}>
            <div class="github-icon" />
          </IconButton>
          
          <!-- <IconButton onClick={hintClick} tooltip={true} tooltipText={"Show Hint"}>
            <div class="hint-icon" />
          </IconButton> -->
          
          <IconButton onClick={settingsClick} tooltip={true} tooltipText={"Settings"}>
            <div class="setting-icon" />
          </IconButton>
        </div>
      </Pannel>
    {/if}
  </MediaQuery>
</div>

<style>
  @import "/theme.css";

  @media (orientation:landscape) {
    .game-controls {
      width: 330px;
      position: absolute;
      pointer-events: auto;

      right: 0px;
      bottom: 0px;

      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    
    .wrapper {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    .github-icon {
      background-image: url("/assets/ui/pixel-github.png");
      background-size: 120px;
      background-position: top -40px left -36px;
      width: 40px;
      height: 40px;
    }

    .setting-icon {
      background-image: url("/assets/ui/pixel-cog.png");
      background-size: 40px;
      background-position: top -39px left -39px;
      width: 40px;
      height: 40px;
    }

    .undo-redo .redo-icon, .undo-redo .undo-icon { background-image: url("/assets/ui/pixel-undo-redo.png"); background-size: 80px; width: 40px; height: 40px; }
    .undo-redo:hover .redo-icon, .undo-redo:hover .undo-icon { background-image: url("/assets/ui/pixel-undo-redo-hover.png"); }

    .redo-icon { background-position: top -40px left -40px; }
    .undo-icon { background-position: top -40px left 0px; }
    .disabled { pointer-events: none; opacity: 0.6; }
  }

  @media (orientation:portrait) {
    .game-controls {
      position: absolute;
      pointer-events: auto;

      right: 0px;
      top: 0px;

      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    
    .wrapper {
      width: 100%;
      height: 100%;

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 2vw;
    }

    .github-icon {
      background-image: url("/assets/ui/pixel-github.png");
      background-size: 60px;
      background-position: top -20px left -18px;
      width: 20px;
      height: 20px;
    }

    .setting-icon {
      background-image: url("/assets/ui/pixel-cog.png");
      background-size: 20px;
      background-position: top -19px left -19px;
      width: 20px;
      height: 20px;
    }

    .undo-redo .redo-icon, .undo-redo .undo-icon {
      background-image: url("/assets/ui/pixel-undo-redo.png");
      background-size: 40px;
      width: 20px;
      height: 20px;
    }
    .undo-redo:hover .redo-icon, .undo-redo:hover .undo-icon {
      background-image: url("/assets/ui/pixel-undo-redo-hover.png");
    }

    .redo-icon { background-position: top -20px left -20px; }
    .undo-icon { background-position: top -20px left 0px; }
    .disabled { pointer-events: none; opacity: 0.6; }
  }
</style>