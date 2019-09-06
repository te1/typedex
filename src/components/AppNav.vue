<template>
  <div>
    <router-link to="/">
      Home
    </router-link>

    <router-link to="/offense">
      Offense
    </router-link>

    <router-link to="/defense">
      Defense
    </router-link>

    <router-link to="/pokemon">
      Pokemon
    </router-link>

    <router-link to="/moves">
      Moves
    </router-link>

    <router-link to="/about">
      About
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'AppNav',
  };
</script>
