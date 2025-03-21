<script>
    import { onMount } from "svelte";
    import CourseForm from "./CourseForm.svelte";
    import CourseList from "./CourseList.svelte";
    import { getCourses } from "$lib/courseapi.js";
  
    let courses = [];

    onMount(async () => {
        courses = await getCourses();
    });
</script>
  
<h1>Courses</h1>
  
<h2>Add a Course</h2>

<CourseForm />
  
<h2>Existing courses:</h2>
  
<CourseList {courses}/>