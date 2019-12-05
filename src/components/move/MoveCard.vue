<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="flex items-center justify-between mb-2 pb-2 last:mb-0 last:pb-0 border-b last:border-b-0">
    <div>
      <div
        class="box-heading mb-0"
        v-html="caption"
      />

      <div
        v-if="flag"
        class="text-sm -mt-1"
      >
        <span>
          {{ flag }}
        </span>
        <span
          v-if="exclusives"
          class="text-gray-500"
        >
          {{ exclusives }}
        </span>
      </div>
    </div>

    <type-label :type="move.type" />
  </div>
</template>

<script>
  import fuzzysort from 'fuzzysort';
  import TypeLabel from '../type/TypeLabel';

  export default {
    name: 'MoveCard',

    components: {
      TypeLabel,
    },

    props: {
      move: {
        type: Object,
        required: true,
      },

      fuzzyResult: {
        type: Object,
        required: false,
        default: null,
      },
    },

    computed: {
      caption() {
        if (this.fuzzyResult && this.fuzzyResult.target) {
          return fuzzysort.highlight(
            this.fuzzyResult,
            '<span class="bg-gray-300 text-gray-600 rounded">',
            '</span>'
          );
        }
        return this.move.caption;
      },

      flag() {
        switch (this.move.flag) {
          case 'max':
            return 'Max Move';

          case 'gmax':
            return 'G-Max Move';

          case 'z':
            return 'Z-Move';

          default:
            return null;
        }
      },

      exclusives() {
        if (!this.move.exclusive || !this.move.exclusive.length) {
          return false;
        }
        return this.move.exclusive.join(', ');
      },
    },
  };
</script>
