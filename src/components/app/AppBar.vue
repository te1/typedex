<template>
  <div class="fixed top-0 w-full z-10 bg-white shadow-md">
    <div class="container mx-auto h-12 px-4 py-2 flex items-center justify-between">
      <h1 class="text-lg font-semibold tracking-wider">
        <router-link to="/">
          typedex
        </router-link>
      </h1>

      <div class="flex -mx-2">
        <router-link
          to="/offense"
          class="nav-link px-2"
        >
          Offense
        </router-link>

        <router-link
          to="/defense"
          class="nav-link px-2"
        >
          Defense
        </router-link>

        <router-link
          to="/pokemon"
          class="nav-link px-2"
        >
          Pokemon
        </router-link>

        <router-link
          to="/move"
          class="nav-link px-2"
        >
          Moves
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppBar',
  };

  // purgecss keep: router-link-active
</script>
