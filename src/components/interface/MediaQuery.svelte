<script lang="ts">
  import { onMount } from "svelte";

  export let query:string;

  let mql:MediaQueryList;
  let queryLstn:any;
  let wasMounted = false;
  let matches = false;

  onMount(() => { wasMounted = true; return () => { removeActiveListener(); }; });

  $: {
    if (wasMounted) { removeActiveListener(); addNewListener(query); }
  }

  function addNewListener(query:string) {
    mql = window.matchMedia(query);
    queryLstn = (v:MediaQueryList) => matches = v.matches;
    mql.addEventListener("change", queryLstn);
    matches = mql.matches;
  }

  function removeActiveListener() { if (mql && queryLstn) mql.removeEventListener('change', queryLstn); }
</script>

<slot {matches} />