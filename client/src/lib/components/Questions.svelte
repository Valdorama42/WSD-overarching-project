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
  
  <h2>Questions</h2>
  <h3>Add a Question</h3>
  <QuestionForm {courseId} on:questionAdded={refreshQuestions} />
  
  <h3>Existing Questions:</h3>
  <QuestionList {questions} {courseId} on:refresh={refreshQuestions} />