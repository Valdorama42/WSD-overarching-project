<script>
    import CourseItem from "./CourseItem.svelte";
    export let courses = [];
  </script>
  
  <ul>
    {#each courses as course (course.id)}
      <li>
        <CourseItem {course} />
      </li>
    {/each}
  </ul>