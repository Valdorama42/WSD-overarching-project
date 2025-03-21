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

<CourseForm />
  
<p>Existing courses: </p>
  
<CourseList {courses}/>