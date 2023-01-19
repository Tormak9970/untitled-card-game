<script lang="ts">
  export let placeholder = "";
  export let value:string|number;
  export let width = "140px";
  export let onChange:(e:Event)=>void = () => {};
</script>

<div class="input">
  <input style="width: {width};" type="text" placeholder="{placeholder}" bind:value={value} on:change="{onChange}">
</div>

<!-- svelte-ignore css-unused-selector -->
<style>
  @import "/theme.css";

  .input {
    margin: 0px;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--font-color);

    font-size: 12px;
  }
  .input > .field-name { margin-right: 10px; }

  .input > input {
    color: var(--font-color);
    background-color: var(--background);
    border-radius: 6px;
    outline: none;
    border: 1px solid black;
    padding: 3px;
  }
  .input > input:hover {
    background-color: var(--background-hover);
  }
  .input > input:focus {
    outline: 1px solid var(--highlight);
  }
</style>