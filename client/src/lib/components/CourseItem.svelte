<script>
    export let course;
  </script>
  
<div class="flex items-center space-x-2 justify-between">
  <a href="/courses/{course.id}/" class="text-lime-700 text-lg font-bold hover:underline">{course.name}</a>
</div>