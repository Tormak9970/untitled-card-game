<script lang="ts">
  import { CARD_HEIGHT, CARD_WIDTH } from "../../lib/SpriteLUT";
  import { discardCard, discardZoneStyle } from "../../Stores";
  import Card from "../cards/Card.svelte";

  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID } from "svelte-dnd-action";

  import { getCurrentCardZoneType, getKingZoneType } from "../../UiLogic";

  import Icon from 'svelte-awesome';
  import { refresh } from 'svelte-awesome/icons';
  import { LinkedNode } from "../../lib/data-structs/LinkedList";
  import type { PlayingCard } from "../../lib/models/PlayingCard";
  import { onMount } from "svelte";

  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';

  export let scale:number;

  let items = [];
  let dropFromOthersDisabled = true;
  let dragDisabled = false;

  let type = $discardCard ? getCurrentCardZoneType($discardCard) : getKingZoneType();
  
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

  function handleDndConsider(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID); }
  function handleDndFinalize(e:any) { items = e.detail.items.filter((e: { id: string; }) => e.id != SHADOW_PLACEHOLDER_ITEM_ID); }

  onMount(() => {
    discardCard.subscribe((value) => {
      console.log("discard updated");
      if (value) {
        items[0] = {
          "id": `${value.card}|${value.suit}`,
          "data": new LinkedNode<PlayingCard>(value),
          "column": "none",
          "row": 0
        };
        items = [...items];
      }
      type = value ? getCurrentCardZoneType(value) : getKingZoneType();
      console.log(items);
    });
  });
</script>

<div class="discard-pile">
  <div class="empty-pile" style="width: {CARD_WIDTH * scale + 8}px; height: {CARD_HEIGHT * scale + 8}px;">
    <div class="empty-inner">
      <div use:dndzone="{{items, flipDurationMs: 300, dropFromOthersDisabled, dragDisabled, dropTargetStyle:discardZoneStyle, type, morphDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" style="width: {CARD_WIDTH * scale}px; height: {CARD_HEIGHT * scale}px; position:absolute; top: 0px;">
        {#each items as playingCard (playingCard.id)}
          <div class="card-wrapper">
            <Card card={playingCard.data.data.card} suit={playingCard.data.data.suit} revealed={true} scale={scale} uncoveredPercent={1.0} column={0} row={0} />
          </div>
        {/each}
      </div>
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

    position: relative;
  }
</style>