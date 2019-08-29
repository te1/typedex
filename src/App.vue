<template>
  <div>
    <header class="flex items-baseline justify-between mb-4 px-4 py-2 bg-white">
      <h1 class="text-xl font-semibold tracking-wider">typedex</h1>

      <nav>
        <router-link class="ml-2" to="/">Home</router-link>
        <router-link class="ml-2" to="/defend">Defend</router-link>
        <router-link class="ml-2" to="/attack">Attack</router-link>
      </nav>
    </header>

    <div v-if="loading">Loading...</div>
    <div v-else class="px-4">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import cache from './services/cache';
import api from './services/api';
import data from './services/data';

export default {
  name: 'App',

  data() {
    return {
      loading: true,
    };
  },

  async created() {
    window.cache = cache;
    window.api = api;
    window.data = data;

    await data.loadTypes();

    this.loading = false;
  },
};
</script>

<style>
@import 'styles/app.css';
</style>
