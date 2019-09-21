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
      class="box mb-4"
    >
      <div class="box-heading mx-2">{{ item.caption }}</div>

      <div class="-mx-1 px-2 pb-2 flex items-center">
        <type-label
          class="mx-1"
          :type="item.type"
        />

        <category-label
          class="mx-1"
          :category="item.damageCategory"
        />

        <div v-if="item.power != null">
          Pwr {{ item.power }}
        </div>

        <div v-if="item.accuracy != null">
          Acc {{ item.accuracy }}
        </div>

        <div v-if="item.pp != null">
          PP {{ item.pp }}
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
        },
      };
    },

    computed: {
      filteredMoves() {
        let filter = this.filter;
        let result = this.moves;

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
