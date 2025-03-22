<script>
    import { onMount } from "svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import QuestionList from "./QuestionList.svelte";
    import { getQuestions } from "$lib/api.js";
    export let courseId;
  
    let questions = [];
  
    const refreshQuestions = async () => {
      questions = await getQuestions(courseId);
    };
  
    onMount(() => {
      refreshQuestions();
    });
  </script>
 
<div class="max-w-2xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold text-lime-700 mb-4">Questions</h2>
    <section class="mb-6">
      <h3 class="text-lg font-semibold text-lime-600 border-b border-lime-300 pb-2">Add a Question</h3>
      <QuestionForm {courseId} on:questionAdded={refreshQuestions} />
    </section>

    <section class="mb-6">
      <h3 class="text-xl font-semibold text-lime-600 border-b border-lime-300 pb-2">Existing Questions:</h3>
      <QuestionList {questions} {courseId} on:refresh={refreshQuestions} />
    </section>
</div>