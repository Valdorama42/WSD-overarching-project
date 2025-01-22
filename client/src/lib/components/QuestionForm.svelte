<script>
  import { useQState } from "$lib/states/questionState.svelte.js";
  let qState = useQState();

  const addQuestion = (e) => {
    const q = Object.fromEntries(new FormData(e.target));
    q.id = crypto.randomUUID();
    qState.add(q);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addQuestion}>
  <label for="name">Question</label>
  <input id="name" name="name" type="text" placeholder="Enter a new question" />
  <div>
    <input id="done" name="done" type="checkbox" />
    <label for="done">Done</label>
  </div>
  <input type="submit" value="Add Question" />
</form>