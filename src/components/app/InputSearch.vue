<template>
  <div class="flex items-center bg-gray-300 rounded">
    <div class="w-5 ml-2 text-center text-lg text-gray-600">
      <fa-icon
        v-if="text"
        icon="times"
        class="hover:text-gray-700 cursor-pointer"
        title="Clear"
        @click="text = ''"
      />
      <fa-icon
        v-else
        icon="search"
      />
    </div>

    <input
      v-model="text"
      type="text"
      :placeholder="placeholder"
      class="w-full px-2 py-1 text-right bg-transparent focus:outline-none font-semibold tracking-wider placeholder-gray-500 placeholder-italic placeholder-normal"
    >
  </div>
</template>

<script>
  export default {
    name: 'InputSearch',

    props: {
      value: {
        type: String,
        required: true,
      },

      placeholder: {
        type: String,
        required: false,
        default: '',
      },
    },

    data() {
      return {
        text: this.value,
      };
    },

    watch: {
      value(newValue) {
        this.text = newValue;
      },

      text() {
        this.$emit('input', this.text);
      },
    },
  };
</script>
