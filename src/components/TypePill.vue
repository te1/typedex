<template>
  <div class="inline-block select-none text-gray-100">
    <div class="flex items-center">
      <div
        class="w-24 rounded uppercase font-semibold tracking-wider text-sm text-center"
        :class="classes"
        @click="toggle"
      >{{ resolvedType.caption }}</div>
      <div
        v-if="hasFactor"
        class="flex items-center justify-center w-12 h-12 -ml-3 pb-1 rounded-full text-2xl font-light bg-gray-700 border-4 border-gray-300"
      >{{ prettyFactor }}</div>
    </div>
  </div>
</template>

<script>
import data from '../services/data';

export default {
  name: 'TypePill',

  props: {
    type: {
      type: [Object, String],
      required: true,
    },

    selectable: {
      type: Boolean,
      required: false,
      default: false,
    },

    selected: {
      type: Boolean,
      required: false,
      default: false,
    },

    factor: {
      type: Number,
      required: false,
      default: null,
    },
  },

  computed: {
    resolvedType() {
      if (typeof this.type === 'string') {
        return data.getType(this.type);
      }
      return this.type;
    },

    hasFactor() {
      return this.factor != null;
    },

    prettyFactor() {
      switch (this.factor) {
        case 0.5:
          return '½';

        case 0.25:
          return '¼';

        default:
          return this.factor;
      }
    },

    classes() {
      let result = [];

      if (this.selectable) {
        result.push('hover:shadow-md');
        result.push('hover:opacity-75');
        result.push('cursor-pointer');
      } else {
        result.push('cursor-default');
      }

      if (this.selected) {
        result.push('text-' + this.resolvedType.name);
        result.push('bg-white');
        result.push('shadow-inner');
      } else {
        result.push('bg-' + this.resolvedType.name);
      }

      return result;
    },
  },

  methods: {
    toggle() {
      if (!this.selectable) {
        return;
      }

      this.$emit('toggle', { type: this.type });
    },
  },
};
</script>
