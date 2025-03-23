<script>
    import "../app.css";
    let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
    <header class="bg-gradient-to-b from-lime-400 via-lime-500 to-lime-600 text-white p-4">
        <div class="container mx-auto text-center">
          <h1 class="text-4xl font-bold">My App</h1>
          <nav class="space-x-4">
            <a href="/" class="text-lg hover:underline">Home</a>
            <a href="/courses" class="text-lg hover:underline">Courses</a>
          </nav>
        </div>
    </header>

    <main class="container mx-auto pb-16">
        {@render children()}
    </main>

  <footer class="bg-lime-100 text-lime-800 p-4 fixed bottom-0 left-0 right-0">
    <div class="container mx-auto text-center">
      &copy; {new Date().getFullYear()} My App. All rights reserved.
    </div>
  </footer>
</div>