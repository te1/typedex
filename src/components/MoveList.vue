<template>
  <div class="-mx-2">
    <div>
      <div class="box-heading mx-2">Filter</div>

      <div class="box p-2 mb-4">
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
        >
          Category
        </category-picker>
      </div>
    </div>

    <app-heading class="mb-2">Moves</app-heading>

    <div
      v-for="item in filteredMoves"
      :key="item.name"
      class="box flex justify-between mb-4 px-2 pt-1 pb-2 cursor-pointer hover:opacity-75"
    >
      <div>
        <div class="box-heading">{{ item.caption }}</div>

        <div class="flex items-center">
          <type-label
            class="mr-2"
            :type="item.type"
          />

          <category-label :category="item.damageCategory" />
        </div>
      </div>

      <div class="self-center">
        <div
          v-for="stat in stats"
          :key="stat.prop"
          class="flex items-baseline justify-between leading-tight"
        >
          <template v-if="item[stat.prop]">
            <div class="w-16 text-sm">
              {{ stat.caption }}
            </div>

            <div class="w-8 font-semibold tracking-wider">
              {{ item[stat.prop] }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
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

        return result;
      },
    },
  };
</script>
