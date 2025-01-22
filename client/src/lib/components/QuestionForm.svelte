<script>
  import { useQState } from "$lib/states/questionState.svelte.js";
  let qState = useQState();

  const addQuestion = (e) => {
    const q = Object.fromEntries(new FormData(e.target));
    q.id = crypto.randomUUID();
    q.count = 0;
    qState.add(q);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addQuestion}>
  <label for="title">Title: </label>
  <div>
    <input id="title" name="title" type="text" placeholder="Enter a title" upvotes=0/>
  </div>
  <div>
    <label for="text">Question: </label>
    <div>
      <textarea id="text" name="text" placeholder="Enter the question"></textarea>
    </div>
  </div>
    <input type="submit" value="Add Question" />
</form>