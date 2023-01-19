<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "../../../../Controller";
  import { musicVolumeSetting, sfxVolumeSetting, showOptionsMenu, timedSetting } from "../../../../Stores";
  import Button from "../../interactables/Button.svelte";
  import Checkbox from "../../interactables/Checkbox.svelte";
  import InputField from "../../interactables/InputField.svelte";
  import Slider from "../../interactables/Slider.svelte";
  import Pannel from "../../Pannel.svelte";
  import Option from "./Option.svelte";

  let musicVolume = 100;
  let sfxVolume = 100;
  let timed = true;

  $: changed = musicVolume != $musicVolumeSetting || sfxVolume != $sfxVolumeSetting || timed != $timedSetting;

  function navBack() {
    $showOptionsMenu = false;
  }

  function apply() {
    $musicVolumeSetting = musicVolume;
    $sfxVolumeSetting = sfxVolume;
    $timedSetting = timed;

    Controller.saveSettings(false);
    $showOptionsMenu = false;
  }

  onMount(() => {
    musicVolume = $musicVolumeSetting;
    sfxVolume = $sfxVolumeSetting;
    timed = $timedSetting;
  });
</script>


<Pannel width="auto">
  <div class="options-menu">
    <div class="options">
      <Option name="Music Volume">
        <div class="slider-pos">
          <Slider bind:value={musicVolume} width="90%"/>
          <div class="value-cont">
            <InputField bind:value={musicVolume} width={"21px"}/>
          </div>
        </div>
      </Option>
      <Option name="SFX Volume">
        <div class="slider-pos">
          <Slider bind:value={sfxVolume} width="90%"/>
          <div class="value-cont">
            <InputField bind:value={sfxVolume} width={"21px"}/>
          </div>
        </div>
      </Option>
      <Option name="Enable Timer">
        <div class="slider-pos">
          <Checkbox bind:checked={timed}/>
        </div>
      </Option>
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

    width: 400px;

    display: grid;
    row-gap: 7px;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }

  .slider-pos {
    width: 60%;

    display: flex;
    justify-content: space-between;
  }

  .value-cont {
    margin-left: 14px;
  }
</style>