<template>
  <div v-if="data.length">
    <div class="box-heading">
      <slot name="default" />
    </div>

    <div class="box -mx-2 px-2 py-1">
      <div class="-mx-2 -mb-1 flex flex-wrap">
        <div
          v-for="item in data"
          :key="item.type"
          :title="getTitle(item)"
          class="flex items-center px-2 pb-1"
        >
          <type-label :type="item.type" />

          <div class="w-10 h-10 -ml-2 pb-1 flex items-center justify-center text-2xl text-white font-light rounded-full border-4 border-white bg-gray-700">
            {{ getPrettyFactor(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypeLabel from './TypeLabel';

  export default {
    name: 'TypeDamageList',

    components: {
      TypeLabel,
    },

    props: {
      data: {
        type: Array,
        required: true,
      },
    },

    methods: {
      getTitle(item) {
        let factor = this.getPrettyFactor(item);
        let type = data.getType(item.type);

        return `Deals ${factor}x damage to ${type.caption}`;
      },

      getPrettyFactor(item) {
        switch (item.factor) {
          case 0.5:
            return '½';

          case 0.25:
            return '¼';

          default:
            return item.factor;
        }
      },
    },
  };
</script>
