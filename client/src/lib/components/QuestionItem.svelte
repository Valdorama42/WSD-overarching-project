<script>
    import { upvoteQuestion, deleteQuestion } from "$lib/api.js";
    export let q;

    const upvote = async (e) => {
        e.preventDefault();
        await upvoteQuestion(q.id);
        location.reload();
    };

    const deleteQ = async (e) => {
        e.preventDefault();
        await deleteQuestion(q.id);
        location.reload();
    };
</script>

<label for={q.id}>{q.title}</label>
<label for={q.iq}>Upvotes: {q.upvotes}</label>
<button onclick={upvote}>Upvote</button>
<button onclick={deleteQ}>Delete</button>
<div><label for={q.id}>{q.text}</label></div>