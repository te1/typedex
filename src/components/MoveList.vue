<template>
  <div class="-mx-2">
    <div>
      <div class="box-heading mx-2">Filter</div>

      <div class="box p-2 mb-4">
        <type-picker
          v-model="filter.type"
          :allow-clear="true"
          :show-none="true"
        >
          Type
        </type-picker>
      </div>
    </div>

    <app-heading class="mb-2">Moves</app-heading>

    <dynamic-scroller
      :items="filteredMoves"
      :min-item-size="50"
      key-field="id"
      class="h-full"
      style="z-index: -1;"
    >
      <template v-slot="{ item, index, active }">
        <dynamic-scroller-item
          :item="item"
          :active="active"
          :data-index="index"
          class="pb-4"
        >
          <div class="box">
            <div class="box-heading mx-2">{{ item.caption }}</div>

            <div class="-mx-1 px-2 pb-2 flex items-center">
              <type-label
                class="mx-1"
                :type="item.type"
              />
              <type-label
                class="mx-1"
                :type="item.damageCategory"
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
        </dynamic-scroller-item>
      </template>
    </dynamic-scroller>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import TypePicker from './TypePicker';
  import TypeLabel from './TypeLabel';

  export default {
    name: 'MoveList',

    components: {
      TypePicker,
      TypeLabel,
    },

    data() {
      return {
        moves: data.moves,
        filter: {
          type: null,
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

        return result;
      },
    },
  };
</script>
