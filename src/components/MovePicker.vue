<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-text="name"
    item-value="name"
    return-object
    placeholder="Search moves..."
    hide-no-data
  />
</template>

<script>
import _ from 'lodash';
import data from '../services/data';

export default {
  name: 'MovePicker',

  data() {
    return {
      allMoves: _.cloneDeep(data.moves),

      value: null,
      search: null,
      isLoading: false,
      entries: [],
    };
  },

  computed: {
    items() {
      return this.allMoves;

      return this.entries.map(entry => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description;

        return Object.assign({}, entry, { Description });
      });
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
