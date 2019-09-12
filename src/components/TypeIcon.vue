<!-- eslint-disable vue/no-v-html -->

<template>
  <fa-icon
    v-if="fallback"
    :icon="fallback"
    :style="fallbackStyles"
    class="block"
  />
  <div
    v-else
    class="fill-current"
    v-html="svg"
  />
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';

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
        let type = this.resolvedType ? this.resolvedType.name : this.type;

        if (_.includes(_.map(data.types, 'name'), type)) {
          return null;
        }

        if (type === 'none') {
          return 'times';
        }

        return 'question';
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

        if (this.width != null) {
          html = html.replace(/^<svg/, `<svg width="${this.width}"`);
        }

        if (this.height != null) {
          html = html.replace(/^<svg/, `<svg height="${this.height}"`);
        }

        return html;
      },
    },

    created() {
      _.forEach(data.types, type => {
        this.svgs[
          type.name
        ] = require(`!!raw-loader!../assets/types/${type.name}.svg`).default;
      });
    },
  };
</script>
