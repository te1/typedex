<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" app clipped>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">Application</v-list-item-title>
        <v-list-item-subtitle>subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
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
        { title: 'Home', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Attack', icon: 'mdi-image', to: '/attack' },
        { title: 'Defend', icon: 'mdi-image', to: '/defend' },
        { title: 'About', icon: 'mdi-help-box', to: '/about' },
      ],
    };
  },
};
</script>
