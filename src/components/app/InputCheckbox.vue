<template>
  <div>
    <label class="flex items-center justify-between">
      <input
        v-model="bool"
        type="checkbox"
        class="opacity-0 absolute"
      >
      <div class="select-none">
        <slot />
      </div>
      <fa-icon
        :icon="icon"
        class="cursor-pointer hover:opacity-50"
        style="height: 24px; width: 24px;"
      />
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        bool: this.value,
      };
    },

    computed: {
      icon() {
        if (this.bool) {
          return ['far', 'check-square'];
        }
        return ['far', 'square'];
      },
    },

    watch: {
      value(newValue) {
        this.bool = newValue;
      },

      bool() {
        this.$emit('input', this.bool);
      },
    },
  };
</script>
