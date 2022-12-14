<script lang="ts">
  import { onMount } from "svelte";
  import { Controller } from "./Controller";
  import { BaseCards, FaceCards } from "./lib/CardEnums";
  import { Suits } from "./lib/Suits";
  
  import Card from "./components/cards/Card.svelte";
  
  onMount(() => {
    Controller.init();
  });
</script>

<main>
  <Card card={BaseCards.SEVEN} suit={Suits.SPADE} faceDown />
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