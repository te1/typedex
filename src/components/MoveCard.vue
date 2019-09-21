<!-- eslint-disable vue/no-v-html -->

<template>
  <div class="box flex justify-between mb-4 px-2 pt-1 pb-2">
    <div>
      <div
        class="box-heading"
        v-html="caption"
      />

      <div class="flex items-center">
        <type-label
          class="mr-2"
          :type="resolvedMove.type"
        />

        <category-label :category="resolvedMove.damageCategory" />
      </div>
    </div>

    <div class="self-center">
      <div
        v-for="stat in stats"
        :key="stat.prop"
        class="flex items-baseline justify-between leading-tight"
      >
        <template v-if="resolvedMove[stat.prop]">
          <div class="w-16 text-sm">
            {{ stat.caption }}
          </div>

          <div class="w-8 font-semibold tracking-wider">
            {{ resolvedMove[stat.prop] }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import fuzzysort from 'fuzzysort';
  import data from '../services/data';
  import TypeLabel from './TypeLabel';
  import CategoryLabel from './CategoryLabel';

  export default {
    name: 'MoveCard',

    components: {
      TypeLabel,
      CategoryLabel,
    },

    props: {
      move: {
        type: [Object, String],
        required: true,
      },

      fuzzyResult: {
        type: Object,
        required: false,
        default: null,
      },
    },

    data() {
      return {
        stats: [
          { prop: 'power', caption: 'Power' },
          { prop: 'accuracy', caption: 'Accuracy' },
          { prop: 'pp', caption: 'PP' },
        ],
      };
    },

    computed: {
      resolvedMove() {
        return data.getMove(this.move);
      },

      caption() {
        if (this.fuzzyResult) {
          return fuzzysort.highlight(
            this.fuzzyResult,
            '<span class="bg-gray-300 text-gray-600 rounded">',
            '</span>'
          );
        }
        return this.resolvedMove.caption;
      },
    },
  };
</script>

