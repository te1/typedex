<template>
  <div class="container mx-auto py-4">
    <h1 class="text-4xl mb-4">typedex</h1>

    <div class="mb-4">
      <router-link to="/">Home</router-link>
      <span class="px-2">|</span>
      <router-link to="/defend">Defend</router-link>
      <span class="px-2">|</span>
      <router-link to="/attack">Attack</router-link>
    </div>

    <div v-if="loading">Loading...</div>
    <router-view v-else />
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
