<script lang="ts">
  export let name:string;
  export let disabled = false;
</script>

<div class="option">
  <slot />
</div>

<style>
  @import "/theme.css";
  
  .option {
    
  }
  
</style>