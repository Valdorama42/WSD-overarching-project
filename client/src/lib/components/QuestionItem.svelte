<script>
    import { upvoteQuestion, deleteQuestion } from "$lib/api.js";
    export let q;
    export let courseId;
  
    const upvote = async (e) => {
      e.preventDefault();
      await upvoteQuestion(courseId, q.id);
      location.reload();
    };
  
    const deleteQ = async (e) => {
      e.preventDefault();
      await deleteQuestion(courseId, q.id);
      location.reload();
    };
  </script>
  
  <div class="flex items-center space-x-2 justify-between">
    <label for="title" class="text-lime-700 text-xl font-bold">{q.title}</label>
    <span>Upvotes: {q.upvotes}</span>
    <button 
      on:click={upvote}
      class="bg-lime-50 text-lime-500 px-2 py-1 rounded hover:bg-lime-200 focus:outline-none">
      Upvote
    </button>
    <button 
      on:click={deleteQ}
      class="bg-red-100 text-red-500 px-2 py-1 rounded hover:bg-red-200 focus:outline-none">
      Delete
    </button>
  </div>
  <div>
    <p class="text-lime-700 text-lg font-bold">{q.text}</p>
  </div>