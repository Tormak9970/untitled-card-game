<script lang="ts">
  export let name:string;
</script>

<div class="option">
  <div class="name-cont">{name}:</div>
  <slot />
</div>

<style>
  @import "/theme.css";
  
  .option {
    width: calc(100% - 20px);

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 10px 7px;


    border-bottom: 1px solid rgb(26, 26, 26);
  }
</style>