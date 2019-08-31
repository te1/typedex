<template>
  <v-autocomplete
    v-model="move"
    :items="moves"
    item-text="caption"
    item-value="name"
    return-object
    placeholder="Search moves..."
    no-data-text="No move found"
    @input="$emit('input', $event)"
  >
    <!-- <template v-slot:item="{ item }">{{ item.caption }}</template> -->
  </v-autocomplete>
</template>

<script>
import data from '../services/data';

export default {
  name: 'MovePicker',

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      moves: data.moves,
      move: null,
    };
  },

  watch: {
    value(newValue) {
      this.move = newValue;
    },
  },
};
</script>
