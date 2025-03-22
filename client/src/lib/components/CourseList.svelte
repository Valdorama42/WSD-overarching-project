<script>
    import CourseItem from "./CourseItem.svelte";
    export let courses = [];
  </script>
  
  <ul class="space-y-4">
    {#each courses as course (course.id)}
      <li class="p-4 bg-lime-50 rounded shadow">
        <CourseItem {course} />
      </li>
    {/each}
  </ul>