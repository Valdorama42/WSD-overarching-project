<script>
    export let data;
    const { course, courseId } = data;
    import Questions from '$lib/components/Questions.svelte';
  </script>
  
  <h1 class="text-3xl font-bold text-lime-700 mb-4 pt-4">{course.name} (#{courseId})</h1>
  
  <div class="py-3">
    <Questions {courseId} />
  </div>
