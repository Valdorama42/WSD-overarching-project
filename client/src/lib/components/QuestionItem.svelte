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
  
  <div>
    <label for="title">{q.title}</label>
    <span>Upvotes: {q.upvotes}</span>
    <button on:click={upvote}>Upvote</button>
    <button on:click={deleteQ}>Delete</button>
  </div>
  <div>
    <p>{q.text}</p>
  </div>