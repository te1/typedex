<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="flex justify-between mb-2 pb-2 last:mb-0 last:pb-0 border-b last:border-b-0">
    <div class="flex-1">
      <div class="flex">
        <div class="flex-1">
          <div
            class="box-heading mb-0"
            v-html="caption"
          />

          <div
            v-if="flag"
            class="text-sm -mt-1"
          >
            <span>
              {{ flag }}
            </span>
          </div>
        </div>

        <div
          class="w-20 h-20 mr-3 bg-contain bg-no-repeat"
          :style="'background-image: url(' + img + ')'"
        />
      </div>
    </div>

    <div>
      <type-label
        v-if="type1"
        :type="type1"
      />

      <type-label
        v-if="type2"
        :type="type2"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import fuzzysort from 'fuzzysort';
  import TypeLabel from '../type/TypeLabel';

  export default {
    name: 'PokemonCard',

    components: {
      TypeLabel,
    },

    props: {
      pokemon: {
        type: Object,
        required: true,
      },

      fuzzyResult: {
        type: Object,
        required: false,
        default: null,
      },
    },

    computed: {
      type1() {
        if (this.pokemon.types.length > 0) {
          return this.pokemon.types[0];
        }
        return null;
      },

      type2() {
        if (this.pokemon.types.length > 1) {
          return this.pokemon.types[1];
        }
        return null;
      },

      caption() {
        if (this.fuzzyResult && this.fuzzyResult.target) {
          return fuzzysort.highlight(
            this.fuzzyResult,
            '<span class="bg-gray-300 text-gray-600 rounded">',
            '</span>'
          );
        }
        return this.pokemon.fullCaption;
      },

      flag() {
        let result = [];

        switch (this.pokemon.flag) {
          case 'gmax':
            result.push('G-Max Form');
            break;

          case 'mega':
            result.push('Mega Evolution');
            break;
        }

        if (this.pokemon.regional) {
          result.push('Regional Form');
        }

        if (this.pokemon.form) {
          result.push('Alternate Form');
        }

        if (!result.length) {
          return null;
        }

        return result.join(', ');
      },

      img() {
        let name = this.pokemon.caption.toLowerCase();
        name = name.replace(/♀/, 'f');
        name = name.replace(/♂/, 'm');
        name = name.replace(/'/, '');
        name = name.replace(/\./, '');
        name = name.replace(/:/, '');
        name = name.replace(/-/, '');
        name = name.replace(/ /, '');
        name = _.deburr(name);

        if (this.pokemon.flag === 'mega') {
          name += '-mega';

          if (this.pokemon.suffix) {
            name += _.trim(this.pokemon.suffix.toLowerCase());
          }
        }

        if (this.pokemon.flag === 'gmax') {
          name += '-gmax';
        }

        if (this.pokemon.regional) {
          name += '-' + this.pokemon.regional;
        }

        let path = '/img/sprites/';
        let file = name + '.png';

        return path + file;
      },
    },
  };
</script>
