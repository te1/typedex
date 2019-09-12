<template>
  <div>
    <recycle-scroller
      v-slot="{ item }"
      :items="moves"
      :item-size="72"
      key-field="id"
      class="h-full"
    >
      <div class="box mb-4 h-16">
        <div class="box-heading mx-2">{{ item.caption }}</div>

        <div class="px-2 pb-2 flex items-center justify-between">
          <type-label :type="item.type" />
          <div>
            {{ item.damageClass }}
          </div>
          <div>
            {{ item.power }}
          </div>
          <div>
            {{ item.accuracy }}
          </div>
          <div>
            {{ item.pp }}
          </div>
        </div>
      </div>
    </recycle-scroller>
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
