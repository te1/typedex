<template>
  <div class="px-4 py-2 flex items-center justify-between bg-white shadow-md">
    <h1 class="text-lg font-semibold tracking-wider">
      typedex
    </h1>

    <div class="flex -mx-2">
      <!--
      <router-link to="/">
        Home
      </router-link>
      -->

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

      <!--
      <router-link to="/pokemon">
        Pokemon
      </router-link>

      <router-link to="/moves">
        Moves
      </router-link>

      <router-link to="/about">
        About
      </router-link>
      -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppBar',
  };
</script>
