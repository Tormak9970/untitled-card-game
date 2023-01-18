<script lang="ts">
  import Button from "../../interactables/Button.svelte";
  import Pannel from "../../Pannel.svelte";

  let changed = false;

  function navBack() {
    
  }

  function apply() {

  }
</script>


<Pannel width="auto">
  <div class="options-menu">
    <div class="options">
      
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