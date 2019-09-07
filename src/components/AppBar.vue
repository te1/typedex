<template>
  <div class="px-4 py-2 flex items-center justify-between bg-white shadow-md">
    <h1 class="text-lg font-semibold tracking-wider">
      typedex
    </h1>

    <nav>
      <!--
      <router-link to="/">
        Home
      </router-link>
      -->

      <router-link to="/offense">
        Offense
      </router-link>

      <span>|</span>

      <router-link to="/defense">
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
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'AppBar',
  };
</script>
