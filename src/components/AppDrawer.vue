<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" app clipped>
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-title class="title">typedex</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppDrawer',

  props: {
    value: {
      type: Boolean,
    },
  },

  data() {
    return {
      items: [
        { title: 'Home', to: '/' },
        { title: 'Pokemon', to: '/pokemon' },
        { title: 'Moves', to: '/moves' },
        { title: 'About', to: '/about' },
      ],
    };
  },
};
</script>
