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
  
  <h1>Questions</h1>
  <h2>Add a Question</h2>
  <!-- When a new question is added, refreshQuestions will be triggered -->
  <QuestionForm {courseId} on:questionAdded={refreshQuestions} />
  
  <h2>Existing Questions:</h2>
  <!-- Listen for refresh events (upvote/delete) from QuestionList -->
  <QuestionList {questions} {courseId} on:refresh={refreshQuestions} />