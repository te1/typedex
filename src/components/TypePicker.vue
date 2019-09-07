<template>
  <div class="relative">
    <div
      class="h-6 flex items-center"
      @click="open = !open"
    >
      <type-label
        v-if="type"
        :type="type"
        :interactive="true"
      />
      <div
        v-else
        class="cursor-pointer select-none italic text-gray-500"
      >
        Select a type...
      </div>
    </div>

    <transition
      enter-active-class="transition-all transition-fastest ease-out-quad"
      leave-active-class="transition-all transition-faster ease-in-quad"
      enter-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
    >
      <div
        v-if="open"
        class="box -mx-2 mt-4 p-2 origin-top-left absolute"
      >
        <div
          v-for="(group, index) in typesGrouped"
          :key="index"
          class="-my-2"
        >
          <div class="flex -mr-2 py-2">
            <type-label
              v-for="item in group"
              :key="item.name"
              :type="item"
              :interactive="true"
              :active="type === item"
              class="mr-2"
              @click.native="select(item)"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import TypeLabel from './TypeLabel';

  export default {
    name: 'TypePicker',

    components: {
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
