<template>
  <div>
    <h2 class="px-2 mb-2">
      Offense
    </h2>

    <div class="px-2 py-2 flex items-center justify-between bg-white rounded shadow">
      <div>Type</div>
      <type-picker
        v-model="type"
        @select="updateRoute"
      />
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypePicker from '../components/TypePicker';

  export default {
    name: 'Offense',

    components: {
      TypePicker,
    },

    data() {
      return {
        type: this.getTypeFromRoute(this.$route),
      };
    },

    activated() {
      if (this.type && this.$route.params.type !== this.type.name) {
        this.$router.replace('/offense/' + this.type.name);
      }
    },

    beforeRouteUpdate(to, from, next) {
      this.type = this.getTypeFromRoute(to);

      next();
    },

    methods: {
      getTypeFromRoute(route) {
        let type;

        if (route && route.params && route.params.type) {
          type = data.getType(route.params.type);
        }
        if (!type) {
          type = data.getType('normal'); // fallback
        }

        return type;
      },

      updateRoute(type) {
        this.$router.push('/offense/' + type.name);
      },
    },
  };
</script>
