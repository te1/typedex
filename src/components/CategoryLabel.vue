<template>
  <div
    v-if="resolvedCategory"
    class="flex items-center rounded text-white"
    :class="classes"
    :style="styles"
    :title="title"
  >
    <category-icon
      :category="resolvedCategory"
      :width="16"
      :height="16"
      class="p-1"
    />
    <div
      v-if="!hideText"
      class="-ml-2 px-2 w-24 flex-1 text-center uppercase font-semibold tracking-wider"
    >
      {{ resolvedCategory.caption }}
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import CategoryIcon from '../components/CategoryIcon';

  export default {
    name: 'CategoryLabel',

    components: {
      CategoryIcon,
    },

    props: {
      category: {
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

      hideText: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      resolvedCategory() {
        return data.getCategory(this.category);
      },

      classes() {
        let result = [];

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

        if (!this.active && this.resolvedCategory != null) {
          result.backgroundColor = this.resolvedCategory.color;
        }

        return result;
      },

      title() {
        if (!this.hideText || this.resolvedCategory == null) {
          return;
        }
        return this.resolvedCategory.caption;
      },
    },
  };
</script>
