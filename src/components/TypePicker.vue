<template>
  <div class="flex items-center justify-between">
    <div
      v-if="$slots.default"
      class="flex-1 cursor-pointer select-none"
      @click="toggle"
    >
      <slot />
    </div>

    <div
      class="h-6 flex items-center"
      @click="toggle"
    >
      <type-label
        v-if="type"
        :type="type"
        :interactive="true"
      />
      <div v-else>
        <div v-if="showNone && allowClear">
          <type-label
            type="none"
            :interactive="true"
          />
        </div>
        <div
          v-else
          class="cursor-pointer select-none italic text-gray-500"
        >
          Select a type...
        </div>
      </div>
    </div>

    <app-modal v-model="open">
      <div slot="header">
        Select Type
      </div>

      <div
        v-for="(group, index) in typesGrouped"
        :key="index"
        class="-my-4"
      >
        <div class="flex -mr-4 py-4">
          <type-label
            v-for="item in group"
            :key="item.name"
            :type="item"
            :interactive="true"
            :active="type === item"
            class="mr-4"
            @click.native="select(item)"
          />
        </div>
      </div>

      <div
        slot="footer"
        class="btn-link text-center"
        @click="close"
      >
        Cancel
      </div>
    </app-modal>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import AppModal from '../components/AppModal';
  import TypeLabel from './TypeLabel';

  export default {
    name: 'TypePicker',

    components: {
      AppModal,
      TypeLabel,
    },

    props: {
      value: {
        type: Object,
        default: null,
      },

      allowClear: {
        type: Boolean,
        default: false,
      },

      showNone: {
        type: Boolean,
        default: false,
      },

      exclude: {
        type: [Object, String],
        default: null,
      },
    },

    data() {
      return {
        open: false,
        type: this.value,
      };
    },

    computed: {
      resolvedExclude() {
        return data.getType(this.exclude);
      },

      types() {
        let result = _.values(data.types);

        if (this.resolvedExclude) {
          result = _.reject(result, item => item === this.resolvedExclude);
        }

        if (this.showNone) {
          result.unshift('none');
        }

        return result;
      },

      typesGrouped() {
        return _.chunk(this.types, 2);
      },
    },

    watch: {
      value(newValue) {
        this.type = newValue;
      },

      type() {
        this.$emit('input', this.type);
      },
    },

    methods: {
      toggle() {
        this.open = !this.open;
      },

      close() {
        this.open = false;
      },

      select(type) {
        this.open = false;

        if (this.allowClear && (this.type === type || type === 'none')) {
          this.type = null;
        } else {
          this.type = type;
        }

        this.$emit('select', this.type);
      },
    },
  };
</script>
