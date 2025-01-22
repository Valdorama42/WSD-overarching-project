<script>
    import { useQState } from "$lib/states/questionState.svelte.js";

    let qState = useQState();

    let { q } = $props();
</script>

<label for={q.id}>
  {q.title} ({q.done ? "done" : "not done"})
</label>
<button>Upvote</button>
<button onclick={() => qState.remove(q.id)}>Remove</button>