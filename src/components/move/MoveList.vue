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
          v-model="filter.type"
          allow-clear
          show-all
          class="mb-2"
          trigger-classes="w-48"
        >
          Type
        </type-picker>

        <div class="flex justify-between items-baseline">
          <div>
            Results
          </div>

          <div class="font-semibold tracking-wider">
            {{ filteredMoves.length }}
          </div>
        </div>
      </div>
    </div>

    <app-heading class="mb-2">Moves</app-heading>

    <div class="box mb-4 p-2">
      <move-card
        v-for="item in filteredMoves"
        :key="item.obj.caption"
        :move="item.obj"
        :fuzzy-result="item"
        class="cursor-pointer hover:opacity-75"
        @click.native="select(item.obj)"
      />
    </div>

    <div
      v-if="!filteredMoves.length"
      class="text-center"
    >
      <fa-icon
        :icon="['far', 'frown']"
        class="mt-8 mb-4 text-gray-500"
        style="font-size: 100px;"
      />

      <div class="text-2xl font-semibold tracking-wider text-gray-500">
        No moves found
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import fuzzysort from 'fuzzysort';
  import data from '../../services/data';
  import InputSearch from '../app/InputSearch';
  import TypePicker from '../type/TypePicker';
  import MoveCard from './MoveCard';

  export default {
    name: 'MoveList',

    components: {
      InputSearch,
      TypePicker,
      MoveCard,
    },

    data() {
      return {
        moves: data.moves,
        filter: {
          name: '',
          type: null,
        },
      };
    },

    computed: {
      filterName() {
        return _.trim(this.filter.name);
      },

      filteredMoves() {
        let filter = this.filter;
        let result = this.moves;

        if (filter.type != null) {
          result = _.filter(result, { type: filter.type.name });
        }

        if (this.filterName) {
          result = fuzzysort.go(this.filterName, result, {
            key: 'caption',
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
      select(move) {
        this.$router.push('/offense/' + move.type);
      },
    },
  };
</script>
