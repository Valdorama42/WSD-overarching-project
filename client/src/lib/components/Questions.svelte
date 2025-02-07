<script>
    import { onMount } from "svelte";
    import QuestionForm from "./QuestionForm.svelte";
    import QuestionList from "./QuestionList.svelte";
    import { getQuestions } from "$lib/api.js";
  
    let questions = [];

    onMount(async () => {
        questions = await getQuestions();
    });
</script>
  
<h1>Questions</h1>
  
<h2>Add a Question</h2>

<QuestionForm />
  
<h2>Existing questions:</h2>
  
<QuestionList {questions}/>