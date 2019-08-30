<template>
  <v-app>
    <app-drawer v-model="showDrawer" />

    <app-bar @toggledrawer="showDrawer = !showDrawer" />

    <v-content>
      <v-container fluid>
        <div v-if="loading">Loading...</div>
        <div v-else class="px-4">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppDrawer from './components/AppDrawer';
import AppBar from './components/AppBar';
import cache from './services/cache';
import api from './services/api';
import data from './services/data';

export default {
  name: 'App',

  components: {
    AppDrawer,
    AppBar,
  },

  data() {
    return {
      showDrawer: null,
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
/* @import 'styles/app.css'; */
</style>
