<!-- eslint-disable vue/no-v-html -->

<template>
  <div v-if="fallback">
    <fa-icon
      :icon="fallback"
      :style="fallbackStyles"
      class="block"
    />
  </div>
  <div
    v-else
    class="fill-current"
    v-html="svg"
  />
</template>

<script>
  import _ from 'lodash';
  import data from '../../services/data';

  export default {
    name: 'CategoryIcon',

    props: {
      category: {
        type: [Object, String],
        required: true,
      },

      width: {
        type: Number,
        default: null,
      },

      height: {
        type: Number,
        default: null,
      },
    },

    data() {
      return {
        svgs: {},
      };
    },

    computed: {
      resolvedCategory() {
        return data.getCategory(this.category);
      },

      fallback() {
        let category = this.resolvedCategory;

        if (!category) {
          return 'question';
        }

        if (_.includes(_.map(data.categories, 'name'), category.name)) {
          return null;
        }

        switch (category.name) {
          case 'all':
            return ['far', 'square'];

          default:
            return 'question';
        }
      },

      fallbackStyles() {
        let result = {};

        if (this.width != null) {
          result.width = this.width;
        }

        if (this.height != null) {
          result.height = this.height;
        }

        return result;
      },

      svg() {
        let html = this.svgs[this.resolvedCategory.name];

        if (html && this.width != null) {
          html = html.replace(/^<svg/, `<svg width="${this.width}"`);
        }

        if (html && this.height != null) {
          html = html.replace(/^<svg/, `<svg height="${this.height}"`);
        }

        return html;
      },
    },

    created() {
      _.forEach(data.categories, category => {
        this.svgs[
          category.name
        ] = require(`!!raw-loader!../../assets/categories/${category.name}.svg`).default;
      });
    },
  };
</script>
