<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { Unsubscriber } from "svelte/store";
  import { Controller } from "../../../../Controller";
  import { gameTime, isPaused } from "../../../../Stores";

  let gameTimeSub:Unsubscriber;
  let gameTimeInt: NodeJS.Timer;

  let formattedTime = "00:00:00";

  
  onMount(() => {
    gameTimeSub = gameTime.subscribe((value) => {
      let total = value;

      const hr = Math.floor(total / (60**2));
      total -= hr * 60**2;

      const min = Math.floor(total / 60);
      total -= min * 60;

      const sec = total;

      formattedTime = `${hr < 10 ? `0${hr}`: hr}:${min < 10 ? `0${min}`: min}:${sec < 10 ? `0${sec}`: sec}`;
    });

    gameTimeInt = setInterval(() => {
      if (!$isPaused) {
        $gameTime = $gameTime + 1;
        if ($gameTime % 10 == 0) Controller.scoreTimePass();
      }
    }, 1000);
  });

  onDestroy(() => {
    if (gameTimeSub) gameTimeSub();
    if (gameTimeInt) clearInterval(gameTimeInt);
  });
</script>

<div class="game-timer">
  Time: {formattedTime}
</div>

<style>
  @import "/theme.css";
  
  /* .game-timer {
    
  } */
</style>