<template>
  <div class="-mx-2">
    <div>
      <div class="box-heading mx-2">Filter</div>

      <div class="box p-2 mb-4">
        <div class="flex mb-2 justify-between items-baseline">
          <div>
            Name
          </div>

          <input-search
            v-model="filter.name"
            placeholder="Enter name here..."
            class="w-48"
          />
        </div>

        <type-picker
          v-model="filter.type1"
          allow-clear
          show-all
          class="mb-2"
          trigger-classes="w-48"
          @select="type1Selected"
        >
          Primary Type
        </type-picker>

        <type-picker
          v-model="filter.type2"
          :exclude="filter.type1"
          allow-clear
          show-all
          class="mb-2"
          trigger-classes="w-48"
        >
          Secondary Type
        </type-picker>

        <input-checkbox
          v-model="filter.normal"
          class="mb-2"
        >
          Normal Form
        </input-checkbox>

        <input-checkbox
          v-model="filter.alternate"
          class="mb-2"
        >
          Alternate Form
        </input-checkbox>

        <input-checkbox
          v-model="filter.regional"
          class="mb-2"
        >
          Regional Form
        </input-checkbox>

        <input-checkbox
          v-model="filter.gmax"
          class="mb-2"
        >
          G-Max Form
        </input-checkbox>

        <input-checkbox
          v-model="filter.mega"
          class="mb-2"
        >
          Mega Evolution
        </input-checkbox>

        <div class="flex justify-between items-baseline">
          <div>
            Results
          </div>

          <div class="font-semibold tracking-wider">
            {{ filteredPokemon.length }}
          </div>
        </div>
      </div>
    </div>

    <app-heading class="mb-2">Pokemon</app-heading>

    <div
      v-if="filteredPokemon.length"
      class="box mb-4 p-2"
    >
      <pokemon-card
        v-for="item in filteredPokemon"
        :key="item.obj.id"
        :pokemon="item.obj"
        :fuzzy-result="item"
        class="cursor-pointer hover:opacity-75"
        @click.native="select(item.obj)"
      />
    </div>

    <div
      v-if="!filteredPokemon.length"
      class="text-center"
    >
      <fa-icon
        :icon="['far', 'frown']"
        class="mt-8 mb-4 text-gray-500"
        style="font-size: 100px;"
      />

      <div class="text-2xl font-semibold tracking-wider text-gray-500">
        No Pokemon found
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import fuzzysort from 'fuzzysort';
  import data from '../../services/data';
  import InputSearch from '../app/InputSearch';
  import InputCheckbox from '../app/InputCheckbox';
  import TypePicker from '../type/TypePicker';
  import PokemonCard from './PokemonCard';

  export default {
    name: 'PokemonList',

    components: {
      InputSearch,
      InputCheckbox,
      TypePicker,
      PokemonCard,
    },

    data() {
      return {
        pokemon: data.pokemon,
        filter: {
          name: '',
          type1: null,
          type2: null,
          normal: true,
          alternate: false,
          regional: true,
          gmax: true,
          mega: false,
        },
      };
    },

    computed: {
      filterName() {
        return _.trim(this.filter.name);
      },

      filteredPokemon() {
        let filter = this.filter;
        let result = this.pokemon;

        if (filter.type1 != null) {
          result = _.filter(result, item =>
            _.includes(item.types, filter.type1.name)
          );
        }

        if (filter.type2 != null) {
          result = _.filter(result, item =>
            _.includes(item.types, filter.type2.name)
          );
        }

        if (filter.normal === false) {
          result = _.filter(
            result,
            item => item.form || item.regional || item.flag
          );
        }

        if (filter.alternate === false) {
          result = _.reject(result, item => item.form);
        }

        if (filter.regional === false) {
          result = _.reject(result, item => item.regional);
        }

        if (filter.gmax === false) {
          result = _.reject(result, { flag: 'gmax' });
        }

        if (filter.mega === false) {
          result = _.reject(result, { flag: 'mega' });
        }

        result = _.map(result, item => {
          item.id = this.getKey(item);
          item.fullCaption = this.getFullCaption(item);

          return item;
        });

        if (this.filterName) {
          result = fuzzysort.go(this.filterName, result, {
            key: 'fullCaption',
            allowTypo: true,
            threshold: -Infinity,
            limit: Infinity,
          });
        } else {
          result = _.map(result, item => {
            return {
              obj: item,
            };
          });
        }

        return result;
      },
    },

    methods: {
      getKey(pokemon) {
        let result = pokemon.caption;

        if (pokemon.flag) {
          result += '-' + pokemon.flag;
        }

        if (pokemon.suffix) {
          result += '-' + pokemon.suffix;
        }

        if (pokemon.regional) {
          result += '-' + pokemon.regional;
        }

        if (pokemon.form) {
          result += '-' + pokemon.form;
        }

        return result;
      },

      getFullCaption(pokemon) {
        let result = pokemon.caption;

        if (pokemon.flag === 'mega') {
          result = 'Mega ' + result;

          if (pokemon.suffix) {
            result += pokemon.suffix;
          }
        }

        if (pokemon.flag === 'gmax') {
          result = 'G-Max ' + result;
        }

        if (pokemon.regional === 'alola') {
          result = 'Alolan ' + result;
        }

        if (pokemon.regional === 'galar') {
          result = 'Galarian ' + result;
        }

        if (pokemon.form) {
          result += ' - ' + pokemon.form;
        }

        return result;
      },

      type1Selected(type) {
        if (type && this.filter.type2 === type) {
          this.filter.type2 = null;
        }
      },

      select(pokemon) {
        let type1, type2;

        if (pokemon.types.length > 0) {
          type1 = pokemon.types[0];
        }

        if (pokemon.types.length > 1) {
          type2 = pokemon.types[1];
        }

        let route = '/defense';

        if (type1) {
          route += '/' + type1;
        }

        if (type2) {
          route += '/' + type2;
        }

        this.$router.push(route);
      },
    },
  };
</script>
