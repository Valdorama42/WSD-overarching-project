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
    
<div>
    <h1 class="text-3xl font-bold text-lime-700 mb-4">Courses</h1> 

    <section class="mb-4">
        <CourseForm />
    </section>
    
    <section>
        <p class="text-xl font-semibold text-lime-600 border-b border-lime-300 pb-2 mb-4">
            Existing courses: 
        </p>
        <CourseList {courses}/>
    </section>
</div>