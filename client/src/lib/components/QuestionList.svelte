<script>
  import QuestionItem from "./QuestionItem.svelte";
  export let questions = [];
  export let courseId;
</script>

<ul>
  {#each questions as q (q.id)}
    <li>
      <QuestionItem {q} courseId={courseId} />
    </li>
  {/each}
</ul>