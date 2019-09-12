<template>
  <div>
    <dynamic-scroller
      :items="moves"
      :min-item-size="50"
      key-field="id"
      class="h-full"
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
                :type="item.damageClass"
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
  import data from '../services/data';
  import TypeLabel from './TypeLabel';

  export default {
    name: 'MoveList',

    components: {
      TypeLabel,
    },

    data() {
      return {
        moves: data.moves,
      };
    },
  };
</script>
