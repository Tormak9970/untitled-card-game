<script lang="ts">
    import { showOptionsMenu } from "../../../../Stores";
  import Button from "../../interactables/Button.svelte";
  import Checkbox from "../../interactables/Checkbox.svelte";
  import Slider from "../../interactables/Slider.svelte";
  import Pannel from "../../Pannel.svelte";
  import Option from "./Option.svelte";

  let musicVolume = 100;
  let sfxVolume = 100;
  let timed = true;

  let changed = false;

  function navBack() {
    $showOptionsMenu = false;
  }

  function apply() {
    // save settings
    $showOptionsMenu = false;
  }
</script>


<Pannel width="auto">
  <div class="options-menu">
    <div class="options">
      <Option name="Music Volume">
        <Slider bind:value={musicVolume}/>
      </Option>
      <Option name="SFX Volume">
        <Slider bind:value={sfxVolume}/>
      </Option>
      <Option name="Timed">
        <Checkbox bind:checked={timed}/>
      </Option>
      <Option name="Difficulty">
        
      </Option>
      <div class="difficulty-key">

      </div>
    </div>
    <div class="buttons">
      <Button text="Back" width="auto" onClick={navBack}/>
      <Button text="Apply" width="auto" disabled={!changed} onClick={apply}/>
    </div>
  </div>
</Pannel>

<style>
  @import "/theme.css";
  
  .options-menu {
    pointer-events: all;

    display: grid;
    row-gap: 7px;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }
</style>