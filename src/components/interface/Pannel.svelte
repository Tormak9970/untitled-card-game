<script lang="ts">
  export let title:string = "";
  export let width:string = "calc(100% - 32px)";
  export let height:string = "auto";
  export let padding:string = "14px 9px";
  export let margin:string = "7px";
  export let fillParent:boolean = false;
</script>

<div class="pannel" style="width: {width}; height: {height}; margin: {margin}; padding: {padding};{fillParent ? " flex: 1;" : ""}">
  <div class="title-cont">
    <div class="title">{title}</div>
    <div class="border-blocker" />
  </div>
  <slot />
</div>

<style>
  @import "/theme.css";

  .pannel {
    border: 1px solid #000;
    box-shadow: 0 0 4px rgb(0 0 0 / 50%);

    position: relative;

    background-color: var(--foreground);
  }

  .pannel > .title-cont {
    position: absolute;
    top: -12px;
    left: 7px;
    font-size: 13px;
  }

  .title { z-index: 1; }

  .pannel .border-blocker {
    z-index: -1;
    position: absolute;
    top: calc(50% - 1px);
    left: 0px;
    font-size: 13px;

    height: 2px;
    width: 100%;
    background-color: var(--foreground);
  }
</style>