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
  <label for="title">Title: </label>
  <input id="title" name="title" type="text" placeholder="Enter a title" />
  <div>
    <label for="text">Question: </label>
    <input id="text" name="text" type="text" placeholder="Enter the question" />
  </div>
    <input type="submit" value="Add Question" />
</form>