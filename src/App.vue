<template>
  <div>
    <app-nav />

    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import AppNav from './components/AppNav';
  import cache from './services/cache';
  import api from './services/api';
  import data from './services/data';

  export default {
    name: 'App',

    components: {
      AppNav,
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

      await Promise.all([data.loadTypes(), data.loadMoves(), data.loadPokemon()]);

      this.loading = false;
    },
  };
</script>

<style>
  @import 'styles/app.css';
</style>
