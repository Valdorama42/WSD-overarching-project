<script>
    import { useQState } from "$lib/states/questionState.svelte.js";
    import QuestionItem from "./QuestionItem.svelte";

    let qState = useQState();
  </script>

  <ul>
    {#each qState.questions as q}
      <li>
        <QuestionItem { q } />
      </li>
    {/each}
  </ul>