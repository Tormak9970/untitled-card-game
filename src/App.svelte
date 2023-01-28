<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { Controller } from "./Controller";
  import GameBoard from "./components/GameBoard.svelte";
  import Interface from "./components/Interface.svelte";
  import { columnBoundingRectFuncs, columnBoundingRects, deckBoundingRectFuncs, deckBoundingRects, loaded, showMainMenu, suitPileBoundingRectFuncs, suitPileBoundingRects } from "./Stores";

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  let rerender = false;

  function onResize() {
    if ($loaded) {
      try {
        // update column bounding rects
        for (const key of Object.keys(columnBoundingRectFuncs)) {
          columnBoundingRects[key] = columnBoundingRectFuncs[key]();
        }
        
        // update suit bounding rects
        for (const key of Object.keys(suitPileBoundingRectFuncs)) {
          suitPileBoundingRects[key] = suitPileBoundingRectFuncs[key]();
        }
        
        // update deck bounding rects
        for (const key of Object.keys(deckBoundingRectFuncs)) {
          deckBoundingRects[key] = deckBoundingRectFuncs[key]();
        }

        //! this scaling is very off in portait mode. need to find a better way to calculate it
        Controller.CARD_SCALE = ((window.screen.orientation.type.indexOf("landscape") == 0) ? 0.4 * Math.min(screen.width / 1825, 1) : 0.12 * screen.width / 360);
        rerender = true;
        setTimeout(() => {
          rerender = false;
        });
      } catch (e:any) {
        console.log(e);
      }
    } else {
      console.log("not loaded yet");
    }
  }

  const debouncedResize = debounce(onResize, 300);

  onMount(() => {
    Controller.init();
    loaded.subscribe((val) => {
      if (val) {
        setTimeout(() => {
          onResize();
        }, 100);
      }
    });
  });

  onDestroy(() => {
    Controller.cleanUp();
  });
</script>

<svelte:window on:resize={debouncedResize}/>
<main>
  <div class="board-cont">
    {#if !$showMainMenu && $loaded && !rerender}
      <GameBoard />
    {/if}
  </div>
  <div class="ui">
    <Interface />
  </div>
</main>
<SvelteToast />

<style>
  @import "/theme.css";

  @media (orientation: landscape) {
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
      width: 100%;
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
  }

  @media (orientation: portrait) {
    main {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      color: var(--font-color);
    }

    .board-cont {
      width: calc(100% - 14px);
      height: calc(100% - 61px);
      border-radius: 8px;
      padding: 7px;
      margin-top: 25px;
    }

    .ui {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0px;
      left: 0px;
      
      pointer-events: none;
    }
  }
</style>