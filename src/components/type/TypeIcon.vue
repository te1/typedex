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
    name: 'TypeIcon',

    props: {
      type: {
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
      resolvedType() {
        return data.getType(this.type);
      },

      fallback() {
        let type = this.resolvedType;

        if (!type) {
          return 'question';
        }

        if (_.includes(_.map(data.types, 'name'), type.name)) {
          return null;
        }

        switch (type.name) {
          case 'none':
            return 'times';

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
        let html = this.svgs[this.resolvedType.name];

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
      _.forEach(data.types, type => {
        this.svgs[
          type.name
        ] = require(`!!raw-loader!../../assets/types/${type.name}.svg`).default;
      });
    },
  };
</script>
