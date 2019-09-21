<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="-mx-2">
    <div>
      <div class="box-heading mx-2">Filter</div>

      <div class="box p-2 mb-4">
        <div class="flex mb-2 justify-between items-baseline">
          <div>
            Name
          </div>

          <div class="flex items-center bg-gray-300 rounded">
            <input
              v-model="filter.name"
              type="text"
              placeholder="Type here..."
              class="w-48 px-2 py-1 bg-transparent focus:outline-none font-semibold tracking-wider placeholder-gray-500 placeholder-italic placeholder-normal"
            >

            <div class="w-5 mr-2 text-center text-lg text-gray-600">
              <fa-icon
                v-if="filter.name"
                icon="times"
                class="hover:text-gray-700 cursor-pointer"
                title="Clear"
                @click="filter.name = ''"
              />
              <fa-icon
                v-else
                icon="search"
              />
            </div>
          </div>
        </div>

        <type-picker
          v-model="filter.type"
          allow-clear
          show-all
          class="mb-2"
        >
          Type
        </type-picker>

        <category-picker
          v-model="filter.category"
          allow-clear
          show-all
          class="mb-2"
        >
          Category
        </category-picker>

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

    <div
      v-for="item in filteredMoves"
      :key="item.obj.name"
      class="box flex justify-between mb-4 px-2 pt-1 pb-2 cursor-pointer hover:opacity-75"
    >
      <div>
        <div
          class="box-heading"
          v-html="getCaption(item)"
        />

        <div class="flex items-center">
          <type-label
            class="mr-2"
            :type="item.obj.type"
          />

          <category-label :category="item.obj.damageCategory" />
        </div>
      </div>

      <div class="self-center">
        <div
          v-for="stat in stats"
          :key="stat.prop"
          class="flex items-baseline justify-between leading-tight"
        >
          <template v-if="item.obj[stat.prop]">
            <div class="w-16 text-sm">
              {{ stat.caption }}
            </div>

            <div class="w-8 font-semibold tracking-wider">
              {{ item.obj[stat.prop] }}
            </div>
          </template>
        </div>
      </div>
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
  import data from '../services/data';
  import TypePicker from './TypePicker';
  import CategoryPicker from './CategoryPicker';
  import TypeLabel from './TypeLabel';
  import CategoryLabel from './CategoryLabel';

  export default {
    name: 'MoveList',

    components: {
      TypePicker,
      CategoryPicker,
      TypeLabel,
      CategoryLabel,
    },

    data() {
      return {
        moves: data.moves,
        filter: {
          name: '',
          type: null,
          category: null,
          z: false,
        },
        stats: [
          { prop: 'power', caption: 'Power' },
          { prop: 'accuracy', caption: 'Accuracy' },
          { prop: 'pp', caption: 'PP' },
        ],
      };
    },

    computed: {
      filterName() {
        return _.trim(this.filter.name);
      },

      filteredMoves() {
        let filter = this.filter;
        let result = this.moves;

        if (filter.z != null) {
          result = _.filter(result, { z: filter.z });
        }

        if (filter.type != null) {
          result = _.filter(result, { type: filter.type.name });
        }

        if (filter.category != null) {
          result = _.filter(result, { damageCategory: filter.category.name });
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
      getCaption(item) {
        if (this.filterName) {
          return fuzzysort.highlight(
            item,
            '<span class="bg-gray-300 text-gray-600 rounded">',
            '</span>'
          );
        }
        return item.obj.caption;
      },
    },
  };
</script>
