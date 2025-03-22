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

<form on:submit={addNewQuestion} class="flex flex-col space-y-4">
  <div>
    <label for="title" class="block text-lime-700 font-medium mb-1">Title: </label>
    <input 
      id="title" 
      name="title" 
      bind:value={title} 
      type="text" 
      placeholder="Enter a title" 
      class="w-full p-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
      />
  </div>
  <div>
    <label for="text">Question: </label>
    <div>
      <textarea 
        id="text" 
        name="text" 
        bind:value={text} 
        placeholder="Enter the question"
        class="w-full p-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-300">
      </textarea>
    </div>
  </div>
  <input type="submit" value="Add Question" class="self-end bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-300"/>
</form>