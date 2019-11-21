<template>
  <div>
    <app-bar />

    <div class="container mx-auto px-4 py-2">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
  import AppBar from './components/app/AppBar';
  import cache from './services/cache';
  import api from './services/api';
  import data from './services/data';

  export default {
    name: 'App',

    components: {
      AppBar,
    },

    data() {
      return {
        loading: true,
      };
    },

    async created() {
      window.cache = cache;
      window.api = api;
      window.data = data;

      // await cache.clear();

      await Promise.all([
        data.loadTypes(),
        data.loadMoves(),
        // data.loadPokemon(),
      ]);

      this.loading = false;
    },
  };
</script>

<style>
  @import 'styles/app.css';
</style>
