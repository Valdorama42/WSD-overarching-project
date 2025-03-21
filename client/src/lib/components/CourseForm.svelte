<script>
    import { addCourse } from "$lib/courseapi.js";
  
    let name = "";
  
    const addNewCourse = async (e) => {
      e.preventDefault();
      await addCourse({ name });
      e.target.reset();
      location.reload();
    };
    
  </script>

<form onsubmit={addNewCourse}>
    <label for="name">Course Name: </label>
    <div>
        <input
            type="text"
            bind:value={ name }
            name="name"
            placeholder="Course name"
            required
        />
    </div>
    <button type="submit">Add Course</button>
  </form>