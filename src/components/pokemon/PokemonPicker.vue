<template>
  <v-autocomplete
    v-model="pkmn"
    :items="pokemon"
    item-text="caption"
    item-value="name"
    return-object
    label="Pokemon"
    placeholder="Search Pokemon..."
    no-data-text="No Pokemon found"
    @input="$emit('input', $event)"
  >
    <!-- <template v-slot:item="{ item }">{{ item.caption }}</template> -->
  </v-autocomplete>
</template>

<script>
  import _ from 'lodash';
  import data from '../../services/data';

  export default {
    name: 'PokemonPicker',

    props: {
      value: {
        type: Object,
        default: null,
      },
    },

    data() {
      return {
        pokemon: _.values(data.pokemon),
        pkmn: null,
      };
    },

    watch: {
      value(newValue) {
        this.pkmn = newValue;
      },
    },
  };
</script>
