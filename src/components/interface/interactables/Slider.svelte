<script lang="ts">
  import RangeInput from "./RangeInput.svelte";

  export let value:number = 0;
  export let width:string = "100px";
  export let onChange: (e: any) => void = (e) => {};

</script>

<div class="slider" style="width: {width};">
  <RangeInput bind:value="{value}" on:change={onChange}/>
</div>

<style>
  @import "/theme.css";
  
  .slider {
    --track-focus: var(--highlight-hover);
		--track-highlight-bgcolor: var(--highlight-hover);
		--track-highlight-bg: var(--highlight);
		--thumb-holding-outline: rgb(255, 102, 0, 0.3);

    --track-bgcolor: var(--background);
    --thumb-bgcolor: var(--foreground-accent);
  }
</style>