<script lang="ts">
  import { BaseCards, FaceCards } from "../../lib/models/CardEnums";
  import { Suits } from "../../lib/models/Suits";
  
  import Card from "../cards/Card.svelte";
</script>

<div class="board">
  <Card card={FaceCards.ACE} suit={Suits.SPADE} faceDown />
</div>

<style>
  @import "/theme.css";
</style>