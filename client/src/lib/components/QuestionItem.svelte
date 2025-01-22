<script>
    import { useQState } from "$lib/states/questionState.svelte.js";

    let qState = useQState();

    let { q } = $props();
</script>

  <input
    type="checkbox"
    onchange={() => qState.changeDone(todo.id)}
    id={q.id}
  />
  <label for={q.id}>
    {q.name} ({q.done ? "done" : "not done"})
  </label>
  <button onclick={() => qState.remove(q.id)}>Remove</button>