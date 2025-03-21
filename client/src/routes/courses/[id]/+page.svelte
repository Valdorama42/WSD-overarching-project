<script>
    export let data;
    const { course, courseId } = data;
    import Questions from '$lib/components/Questions.svelte';
  </script>
  
  <h1>{course.name} (Course {courseId})</h1>
  
  <Questions {courseId} />