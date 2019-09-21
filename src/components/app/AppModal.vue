<template>
  <div
    v-if="value"
    class="fixed inset-0 z-20 flex items-center md:items-start justify-center"
  >
    <div
      class="absolute inset-0 bg-gray-300 opacity-50"
      @click="close"
    />
    <div class="relative p-4 md:mt-24 max-h-screen-90 flex flex-col overflow-hidden bg-white rounded shadow">
      <div class="mb-2 text-xl text-center font-semibold tracking-wider">
        <slot name="header" />
      </div>

      <div class="mb-2 py-2 overflow-x-hidden overflow-y-auto">
        <slot />
      </div>

      <div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
  // import { Portal } from '@linusborg/vue-simple-portal';

  export default {
    name: 'AppModal',

    components: {
      // Portal,
    },

    props: {
      value: {
        type: Boolean,
        required: true,
      },
    },

    created() {
      const onEscape = e => {
        if (this.value && e.keyCode === 27) {
          this.close();
        }
      };
      document.addEventListener('keydown', onEscape);

      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', onEscape);
      });
    },

    methods: {
      close() {
        this.$emit('input', false);
      },
    },
  };
</script>
