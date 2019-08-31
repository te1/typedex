<template>
  <v-autocomplete
    v-model="value"
    :items="moves"
    item-text="caption"
    item-value="name"
    return-object
    placeholder="Search moves..."
    no-data-text="No move found"
    @input="$emit('input', $event)"
  />
</template>

<script>
import data from '../services/data';

export default {
  name: 'MovePicker',

  data() {
    return {
      moves: data.moves,
      value: null,
    };
  },
};
</script>
