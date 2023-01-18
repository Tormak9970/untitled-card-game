<script lang="ts">
  import Button from "./interactables/Button.svelte";
  import Pannel from "./Pannel.svelte";

  
  export let message:string;
  export let onConfirm:() => void;
  export let onCancel:() => void;
</script>

<Pannel width="auto">
  <div class="file-picker">
    <div class="message">{message}</div>
    <div class="buttons">
      <Button text={"Confirm"} width={"auto"} onClick={onConfirm}/>
      <Button text={"Cancel"} width={"auto"} onClick={onCancel}/>
    </div>
  </div>
</Pannel>

<style>
  @import "/theme.css";
  
  .file-picker {
    max-width: 300px;
  }

  .message {
    text-align: center;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
  }
</style>