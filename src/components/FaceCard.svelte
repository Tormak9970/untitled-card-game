<script lang="ts">
  import { FaceCards } from "../lib/CardEnums";
  import { Suits } from "../lib/Suits";


  export let card:FaceCards;
  export let suit:Suits;
  
</script>

<div class="face-card">

</div>

<style>
  @import "/theme.css";

  .face-card {
    width: 306px;
    height: 504px;
  }
</style>