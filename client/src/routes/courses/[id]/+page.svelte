<script>
    export let data;
    const { course, courseId } = data;
    import Questions from '$lib/components/Questions.svelte';
  </script>
  
  <h1 class="text-3xl font-bold text-lime-700 mb-4">{course.name} (Course {courseId})</h1>
  
  <div class="p-4">
    <Questions {courseId} />
  </div>
