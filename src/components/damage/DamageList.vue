<template>
  <div v-if="data.length">
    <div
      v-if="heading"
      class="box-heading flex justify-between"
    >
      <div>{{ heading }}</div>
      <div
        v-if="info"
        class="flex items-center"
        :class="infoClasses"
      >
        <div class="uppercase font-semibold tracking-wider">{{ info }}</div>
        <fa-icon
          v-if="infoIcon"
          :icon="infoIcon"
          class="ml-1"
        />
      </div>
    </div>

    <div class="box -mx-2 mb-4 p-2">
      <div class="-mx-2 -mb-4 flex flex-wrap">
        <div
          v-for="item in data"
          :key="item.type"
          :title="getTitle(item)"
          class="flex items-center px-2 pb-4"
        >
          <type-label :type="item.type" />
          <div class="w-12 h-8 ml-1 flex items-center justify-center font-semibold tracking-wider text-white bg-gray-700 rounded">
            {{ item.factor }}x
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import data from '../../services/data';
  import TypeLabel from '../type/TypeLabel';

  export default {
    name: 'DamageList',

    components: {
      TypeLabel,
    },

    props: {
      data: {
        type: Array,
        required: true,
      },

      heading: {
        type: String,
        default: '',
      },

      info: {
        type: String,
        default: '',
      },

      infoColor: {
        type: String,
        default: '',
      },

      infoIcon: {
        type: [String, Array],
        default: '',
      },

      attack: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      infoClasses() {
        let result = [];

        switch (this.infoColor) {
          case 'green':
            result.push('text-green-500');
            break;

          case 'orange':
            result.push('text-orange-400');
            break;

          case 'red':
            result.push('text-red-400');
            break;
        }

        return result;
      },
    },

    methods: {
      getTitle(item) {
        let factor = this.getFactorText(item);
        let type = data.getType(item.type);

        if (this.attack) {
          return `Deals ${factor} damage to ${type.caption}`;
        }
        return `Takes ${factor} damage from ${type.caption}`;
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

      getFactorText(item) {
        switch (item.factor) {
          case 0:
            return 'no';

          case 0.25:
            return 'one quarter';

          case 0.5:
            return 'half';

          case 2:
            return 'double';

          case 4:
            return 'quadruple';

          default:
            return this.getPrettyFactor(item) + 'x';
        }
      },
    },
  };
</script>
