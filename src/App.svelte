<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "./Controller";
  import { FaceCards } from "./lib/CardEnums";
  import { Suits } from "./lib/Suits";
  
  import FaceCard from "./components/FaceCard.svelte";
  
  onMount(() => {
    Controller.init();
  });
</script>

<main>
  <FaceCard card={FaceCards.ACE} suit={Suits.SPADE} />
</main>

<style>
  @import "/theme.css";

  main {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    color: var(--font-color);
  }
</style>