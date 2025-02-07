<script>
    import QuestionItem from "./QuestionItem.svelte";
    export let questions = [];
  </script>

  <ul>
    {#each questions as q (q.id)}
      <li>
        <QuestionItem { q } />
      </li>
    {/each}
  </ul>