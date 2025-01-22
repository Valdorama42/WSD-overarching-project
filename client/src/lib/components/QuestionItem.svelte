<script>
    import { useQState } from "$lib/states/questionState.svelte.js";

    let qState = useQState();

    let { q } = $props();
</script>

<label for={q.id}>{q.title}</label>
<label for={q.iq}>Upvotes: {q.count}</label>
<button onclick={() => qState.upVote(q.id)}>Upvote</button>
<button onclick={() => qState.delete(q.id)}>Delete</button>
<div><label for={q.id}>{q.text}</label></div>