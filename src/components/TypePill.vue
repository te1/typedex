<template>
  <div>
    <span>{{ resolvedType.caption }}</span>
    <span v-if="hasFactor">{{ prettyFactor }}</span>
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
  },
};
</script>
