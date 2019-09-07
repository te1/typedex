<template>
  <div>
    <h2>Pokemon</h2>

    <pokemon-picker
      v-model="pokemon"
      @input="onPokemonSelected"
    />

    <type-picker
      v-model="type1"
      :exclude="type2"
      @input="onTypeSelected"
    />

    <type-picker
      v-model="type2"
      :exclude="type1"
      @input="onTypeSelected"
    />

    <div v-if="selectedTypes.length > 0">
      <h3>Damage taken</h3>

      <h4>Weak against</h4>
      <type-pill
        v-for="damage in damageTaken.weak"
        :key="damage.type"
        :type="damage.type"
        :factor="damage.factor"
      />

      <h4>Resistant against</h4>
      <type-pill
        v-for="damage in damageTaken.resistant"
        :key="damage.type"
        :type="damage.type"
        :factor="damage.factor"
      />

      <h4>Immune against</h4>
      <type-pill
        v-for="damage in damageTaken.immune"
        :key="damage.type"
        :type="damage.type"
        :factor="damage.factor"
      />
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import PokemonPicker from '../components/PokemonPicker';
  import TypePicker from '../components/TypePicker';

  export default {
    name: 'Pokemon',

    components: {
      PokemonPicker,
      TypePicker,
    },

    data() {
      return {
        pokemon: null,
        type1: null,
        type2: null,
      };
    },

    computed: {
      selectedTypes() {
        let result = [];

        if (this.type1) {
          result.push(this.type1);
        }

        if (this.type2) {
          result.push(this.type2);
        }

        return result;
      },

      damageTaken() {
        let data = {};

        _.forEach(this.selectedTypes, type => {
          _.forEach(type.damageTaken, damage => {
            if (data[damage.type] == null) {
              data[damage.type] = damage.factor;
            } else {
              data[damage.type] *= damage.factor;
            }
          });
        });

        data = _.map(data, (value, key) => {
          return {
            type: key,
            factor: value,
          };
        });

        data = _.orderBy(data, ['factor', 'type'], ['desc', 'asc']);

        let result = {};

        result.weak = _.filter(data, item => item.factor > 1);

        result.resistant = _.filter(
          data,
          item => item.factor > 0 && item.factor < 1
        );

        result.immune = _.filter(data, item => item.factor <= 0);

        return result;
      },

      pokemonType1() {
        if (this.pokemon == null) {
          return null;
        }

        if (this.pokemon.types.length > 0) {
          return data.getType(this.pokemon.types[0]);
        }

        return null;
      },

      pokemonType2() {
        if (this.pokemon == null) {
          return null;
        }

        if (this.pokemon.types.length > 1) {
          return data.getType(this.pokemon.types[1]);
        }

        return null;
      },
    },

    methods: {
      onPokemonSelected() {
        if (this.pokemon == null) {
          return;
        }

        this.type1 = this.pokemonType1;
        this.type2 = this.pokemonType2;
      },

      onTypeSelected() {
        if (this.pokemon == null) {
          return;
        }

        if (this.type1 && this.pokemonType1 !== this.type1) {
          this.pokemon = null;
        }

        if (this.type2 && this.pokemonType2 !== this.type2) {
          this.pokemon = null;
        }
      },
    },
  };
</script>
