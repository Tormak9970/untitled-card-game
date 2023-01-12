<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Controller } from "./Controller";
  import GameBoard from "./components/GameBoard.svelte";
  import Interface from "./components/Interface.svelte";
    import { columnBoundingRectFuncs, columnBoundingRects, suitPileBoundingRectFuncs, suitPileBoundingRects } from "./Stores";

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  function onResize() {
    // update column bounding rects
    for (const key of Object.keys(columnBoundingRectFuncs)) {
      columnBoundingRects[key] = columnBoundingRectFuncs[key]();
    }
    
    // update suit bounding rects
    for (const key of Object.keys(suitPileBoundingRectFuncs)) {
      suitPileBoundingRects[key] = suitPileBoundingRectFuncs[key]();
    }
  }

  const debouncedResize = debounce(onResize, 500);

  onMount(() => {
    Controller.init();
    setTimeout(() => {
      onResize();
    }, 0);
  });

  onDestroy(() => {
    Controller.cleanUp();
  });
</script>

<svelte:window on:resize={debouncedResize}/>
<main>
  <div class="board-cont">
    <GameBoard />
  </div>
  <div class="ui">
    <Interface />
  </div>
</main>
<SvelteToast />

<style>
  @import "/theme.css";

  main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: var(--font-color);
  }

  .board-cont {
    width: calc(100% - 15vh);
    height: calc(100% - 15vh);

    border-radius: 8px;
  }

  .ui {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0px;
    left: 0px;
    
    pointer-events: none;
  }
</style>