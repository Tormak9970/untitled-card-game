<script lang="ts">
  import IconButton from "../../interactables/IconButton.svelte";
  import Pannel from "../../Pannel.svelte";
  
  function githubClick() {

  }

  function hintClick() {

  }

  function settingsClick() {

  }

  function redoClick() {

  }

  function undoClick() {

  }
</script>

<div class="game-controls">
  <Pannel>
    <div class="wrapper">
      <div class="disabled undo-redo">
        <IconButton onClick={redoClick}>
          <div class="redo-icon" />
        </IconButton>
      </div>
      
      <div class="disabled undo-redo">
        <IconButton onClick={undoClick}>
          <div class="undo-icon" />
        </IconButton>
      </div>

      <IconButton onClick={githubClick}>
        <div class="github-icon" />
      </IconButton>
      
      <IconButton onClick={hintClick}>
        <div class="hint-icon" />
      </IconButton>
      
      <IconButton onClick={settingsClick}>
        <div class="setting-icon" />
      </IconButton>
    </div>
  </Pannel>
</div>

<style>
  @import "/theme.css";
  
  .game-controls {
    width: 400px;
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

  .hint-icon {
    background-image: url("/assets/ui/pixel-lightbulb.png");
    background-size: 46px;
    background-position: top -51px left -48px;
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

  .redo-icon { background-position: top -40px left 0px; }
  .undo-icon { background-position: top -40px left -40px; }

  .disabled {
    pointer-events: none;
    opacity: 0.6;
  }
</style>