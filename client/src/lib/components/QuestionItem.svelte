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
  
  <div class="flex justify-between items-center">
    <div>
      <label for="title" class="text-lime-700 text-xl font-bold">{q.title}</label>
    </div>
    <div class="flex items-center space-x-2">
      <span>Upvotes: {q.upvotes}</span>
      <button 
        on:click={upvote}
        class="bg-lime-200 text-lime-600 px-2 py-1 rounded hover:bg-lime-300 focus:outline-none">
        Upvote
      </button>
      <button 
        on:click={deleteQ}
        class="bg-red-100 text-red-500 px-2 py-1 rounded hover:bg-red-200 focus:outline-none">
        Delete
      </button>
    </div>
  </div>
  <div>
    <p class="pt-4">{q.text}</p>
  </div>