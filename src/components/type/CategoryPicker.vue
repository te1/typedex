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
      class="h-8 flex items-center"
      :class="triggerClasses"
      @click="toggle"
    >
      <category-label
        v-if="category"
        :category="category"
        interactive
        class="w-full"
      />
      <div
        v-else
        class="w-full"
      >
        <div v-if="showAll && allowClear">
          <category-label
            category="all"
            interactive
          />
        </div>
        <div
          v-else
          class="cursor-pointer select-none italic text-gray-500"
        >
          Select a category...
        </div>
      </div>
    </div>

    <app-modal v-model="open">
      <div slot="header">
        Select Category
      </div>

      <div class="-my-4 overflow-hidden">
        <category-label
          v-for="item in categories"
          :key="item.name"
          :category="item"
          :active="isActive(item)"
          interactive
          class="my-4"
          @click.native="select(item)"
        />
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
  import data from '../../services/data';
  import AppModal from '../app/AppModal';
  import CategoryLabel from './CategoryLabel';

  export default {
    name: 'CategoryPicker',

    components: {
      AppModal,
      CategoryLabel,
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

      showAll: {
        type: Boolean,
        default: false,
      },

      triggerClasses: {
        type: String,
        required: false,
        default: '',
      },
    },

    data() {
      return {
        open: false,
        category: this.value,
      };
    },

    computed: {
      categories() {
        let result = _.clone(data.categories);

        if (this.showAll) {
          result.unshift('all');
        }

        return result;
      },
    },

    watch: {
      value(newValue) {
        this.category = newValue;
      },

      category() {
        this.$emit('input', this.category);
      },
    },

    methods: {
      toggle() {
        this.open = !this.open;
      },

      close() {
        this.open = false;
      },

      isActive(category) {
        return (
          this.category === category ||
          (this.category == null && category === 'all')
        );
      },

      select(category) {
        this.open = false;

        let shouldClear = this.category === category || category === 'all';

        if (shouldClear) {
          if (this.allowClear) {
            this.category = null;
          } else {
            return;
          }
        } else {
          this.category = category;
        }

        this.$emit('select', this.category);
      },
    },
  };
</script>
