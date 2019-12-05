<template>
  <div id="app">
    <app-bar />

    <div class="container mx-auto px-4 py-2">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import AppBar from './components/app/AppBar';
  import data from './services/data';

  export default {
    name: 'App',

    components: {
      AppBar,
    },

    created() {
      data.loadTypes();
      data.loadMoves();
      data.loadPokemon();
    },
  };
</script>

<style>
  @import 'styles/app.css';
</style>
