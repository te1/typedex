<template>
  <v-app-bar app clipped-left dense color="primary" dark>
    <v-app-bar-nav-icon @click.stop="$emit('toggledrawer')" />
    <v-toolbar-title>typedex</v-toolbar-title>

    <div class="spacer"></div>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
};
</script>
