<script>
  import QuestionItem from "./QuestionItem.svelte";
  export let questions = [];
  export let courseId;
</script>

<ul class="space-y-4">
  {#each questions as q (q.id)}
    <li class="p-3 bg-lime-50 rounded shadow">
      <QuestionItem {q} courseId={courseId} />
    </li>
  {/each}
</ul>