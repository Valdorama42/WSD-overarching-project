<script>
    export let data; // 'data' comes from load()
    let courseId = data.id;
    import Questions from '$lib/components/Questions.svelte';
  </script>
  
  <!-- Optionally, you might display the course name if you have it -->
  <h1>Course {courseId}</h1>
  
  <Questions {courseId} />