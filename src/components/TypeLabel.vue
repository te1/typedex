<template>
  <div
    class="flex items-center text-white"
    :class="classes"
    :style="styles"
    :title="title"
  >
    <div class="px-1 w-8 text-center">
      <fa-icon :icon="icon" />
    </div>
    <div
      v-if="showText"
      class="-ml-2 px-2 w-24 flex-1 text-center uppercase font-semibold tracking-wider"
    >
      {{ resolvedType.caption }}
    </div>
  </div>
</template>

<script>
  import data from '../services/data';

  export default {
    name: 'TypeLabel',

    props: {
      type: {
        type: [Object, String],
        required: true,
      },

      active: {
        type: Boolean,
        default: false,
      },

      interactive: {
        type: Boolean,
        default: false,
      },

      showText: {
        type: Boolean,
        default: true,
      },

      hasFactor: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      resolvedType() {
        if (this.type === 'none') {
          return {
            name: 'none',
            caption: 'None',
            color: '#444',
          };
        }

        return data.getType(this.type);
      },

      classes() {
        let result = [];

        if (this.hasFactor) {
          result.push('rounded-l');
        } else {
          result.push('rounded');
        }

        if (this.active) {
          result.push('shadow bg-gray-300 text-gray-700');
        }

        if (this.interactive) {
          result.push('cursor-pointer select-none');
          result.push('hover:opacity-75 hover:shadow');
        }

        return result;
      },

      styles() {
        let result = {};

        if (!this.active) {
          result.backgroundColor = this.resolvedType.color;
        }

        return result;
      },

      title() {
        if (this.showText) {
          return;
        }
        return this.resolvedType.caption;
      },

      icon() {
        switch (this.resolvedType.name) {
          case 'none':
            return 'times';

          case 'bug':
            return 'bug';

          case 'dark':
            return 'adjust';

          case 'dragon':
            return 'dragon';

          case 'electric':
            return 'bolt';

          case 'fairy':
            return 'hat-wizard';

          case 'fighting':
            return 'fist-raised';

          case 'fire':
            return 'fire';

          case 'flying':
            return 'feather-alt';

          case 'ghost':
            return 'ghost';

          case 'grass':
            return 'leaf';

          case 'ground':
            return 'mountain';

          case 'ice':
            return 'snowflake';

          case 'normal':
            return 'circle';

          case 'poison':
            return 'skull';

          case 'psychic':
            return 'dizzy';

          case 'rock':
            return 'gem';

          case 'steel':
            return 'cog';

          case 'water':
            return 'tint';

          default:
            return 'question';
        }
      },
    },
  };
</script>
