<script lang="ts">
  import { isPaused, showLoadGameFromFile, showMainMenu, showOptionsMenu, showPauseMenu, showSaveGameToFile } from "../../../Stores";
  import Button from "../interactables/Button.svelte";
  import Pannel from "../Pannel.svelte";

  function resumeClick() {
    $isPaused = false;
    $showPauseMenu = false;
  }
  function saveClick() { $showSaveGameToFile = true; }
  function loadClick() { $showLoadGameFromFile = true; }
  function optionsClick() { $showOptionsMenu = true; }
  function mainMenuClick() { $showMainMenu = true; $showPauseMenu = false; }
</script>


<Pannel width="auto">
  <div class="pause-menu">
    <Button text="Resume" width={"100%"} onClick={resumeClick} />
    <Button text="Save" width={"100%"} onClick={saveClick} />
    <Button text="Load" width={"100%"} onClick={loadClick} />
    <Button text="Options" width={"100%"} onClick={optionsClick} />
    <Button text="Main Menu" width={"100%"} onClick={mainMenuClick} />
  </div>
</Pannel>

<style>
  @import "/theme.css";
  
  .pause-menu {
    pointer-events: all;

    display: grid;
    row-gap: 7px;
  }
</style>