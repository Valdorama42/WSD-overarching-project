<script>
  import { addQuestion } from "$lib/api.js";

  let title = "";
  let text = "";

  const addNewQuestion = async (e) => {
    e.preventDefault();
    await addQuestion({ title, text });
    e.target.reset();
    location.reload();
  };
  
</script>

<form onsubmit={addNewQuestion}>
  <label for="title">Title: </label>
  <div>
    <input id="title" name="title" bind:value={title} type="text" placeholder="Enter a title" upvotes=0/>
  </div>
  <div>
    <label for="text">Question: </label>
    <div>
      <textarea id="text" name="text" bind:value={text} placeholder="Enter the question"></textarea>
    </div>
  </div>
    <input type="submit" value="Add Question" />
</form>