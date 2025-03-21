<script>
  import { addQuestion } from "$lib/api.js";
  export let courseId;

  let title = "";
  let text = "";

  const addNewQuestion = async (e) => {
    e.preventDefault();
    await addQuestion(courseId, { title, text });
    e.target.reset();
    location.reload();
  };
</script>

<form on:submit={addNewQuestion}>
  <label for="title">Title: </label>
  <div>
    <input id="title" name="title" bind:value={title} type="text" placeholder="Enter a title" />
  </div>
  <div>
    <label for="text">Question: </label>
    <div>
      <textarea id="text" name="text" bind:value={text} placeholder="Enter the question"></textarea>
    </div>
  </div>
  <input type="submit" value="Add Question" />
</form>