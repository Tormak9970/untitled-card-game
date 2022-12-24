<script lang="ts">
  import { Controller } from "../../Controller";
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { drawStack } from "../../Stores";
  import Card from "../cards/Card.svelte";
  
  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';

  export let scale:number;

  import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
  import { onMount } from "svelte";

  $: topCard = $drawStack.size() > 0 ? $drawStack.peek() : null;

  // TODO: implement this: https://svelte.dev/tutorial/deferred-transitions
  // and this: https://svelte.dev/tutorial/animate
  
	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

  function drawCard(): void { Controller.drawCard(); }
  function recycleDiscard(): void {
    if (!topCard) {
      Controller.recycleDeck();
    }
  }

  onMount(() => {
    drawStack.subscribe((value) => {
      console.log("drawpile updated");
      topCard = value.size() > 0 ? value.peek() : null;
    });
  });
</script>

<div class="draw-pile">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="empty-pile" style="width: {CARD_WIDTH * scale + 8}px; height: {CARD_HEIGHT * scale + 8}px;">
    <div class="empty-inner" on:click|stopPropagation={recycleDiscard}>
      {#if topCard}
        <div class="card-wrapper" on:click|stopPropagation={drawCard} in:receive="{{key: `${topCard.card}|${topCard.suit}`}}" out:send="{{key: `${topCard.card}|${topCard.suit}`}}">
          <Card card={topCard.card} suit={topCard.suit} revealed={false} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
        </div>
      {:else}
        <!-- Same size as card but suggest drawing a card -->
        <Icon data={refresh} scale={4} class="icon"/>
      {/if}
    </div>
  </div>
</div>

<style>
  @import "/theme.css";

  .empty-pile {
    background-color: var(--highlight);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .empty-inner {
    width: calc(100% - 8px);
    height: calc(100% - 8px);

    background-color: var(--highlight-faded);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: pointer;
  }

  :global(.empty-inner > .icon) { color: var(--highlight); }

  :global(.empty-inner:hover > .icon) { color: var(--highlight-hover); }
</style>