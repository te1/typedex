<template>
  <div
    v-if="resolvedType"
    class="flex items-center text-white"
    :class="classes"
    :style="styles"
    :title="title"
  >
    <type-icon
      :type="type"
      :width="16"
      :height="16"
      class="p-1"
    />
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
  import TypeIcon from '../components/TypeIcon';

  export default {
    name: 'TypeLabel',

    components: {
      TypeIcon,
    },

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

        if (!this.active && this.resolvedType != null) {
          result.backgroundColor = this.resolvedType.color;
        }

        return result;
      },

      title() {
        if (this.showText || this.resolvedType == null) {
          return;
        }
        return this.resolvedType.caption;
      },
    },
  };
</script>
