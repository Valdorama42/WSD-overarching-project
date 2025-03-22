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

<form onsubmit={addNewCourse} class="flex flex-col space-y-4">
    <div>
        <label for="name" class="block text-lime-700 font-medium mb-1">Course Name: </label>
        <input
            type="text"
            bind:value={ name }
            name="name"
            placeholder="Course name"
            required
            class="w-full p-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-300"
        />
    </div>

    <button type="submit" class="self-end bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-300">
      Add Course</button>
  </form>