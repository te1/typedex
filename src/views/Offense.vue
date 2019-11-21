<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-72 sm:pr-4">
      <app-heading class="mb-2">Offense</app-heading>

      <div class="box-heading">Move</div>
      <div class="box -mx-2 mb-4 p-2">
        <type-picker
          v-model="type"
          @select="typeSelected"
        >
          Type
        </type-picker>
      </div>
    </div>

    <div
      v-if="type"
      class="mt-6 w-full sm:flex-1 sm:mt-0 sm:pl-4"
    >
      <damage-done :type="type" />
    </div>
  </div>
</template>

<script>
  import data from '../services/data';
  import TypePicker from '../components/type/TypePicker';
  import DamageDone from '../components/damage/DamageDone';

  export default {
    name: 'Offense',

    components: {
      TypePicker,
      DamageDone,
    },

    data() {
      return {
        type: this.getTypeFromRoute(this.$route),
      };
    },

    activated() {
      let newType = this.getTypeFromRoute(this.$route, { useFallback: false });

      if (newType && (!this.type || this.type !== newType)) {
        this.type = newType;
      }

      this.updateRoute(this.type, { replace: true });
    },

    beforeRouteUpdate(to, from, next) {
      if (to.name === from.name && !to.params.type) {
        // don't reset type when navigating from /offense/x to /offense
        return;
      }

      // this.type = this.getTypeFromRoute(to);

      next();
    },

    methods: {
      getTypeFromRoute(route, opts = { useFallback: true }) {
        let type;

        if (route && route.params && route.params.type) {
          type = data.getType(route.params.type);
        }
        if (!type && opts.useFallback) {
          type = data.getType('normal'); // fallback
        }

        return type;
      },

      updateRoute(type, opts = {}) {
        let path = '/offense/' + type.name;

        if (this.$route.path === path) {
          return;
        }

        if (opts.replace) {
          this.$router.replace(path);
        } else {
          this.$router.push(path);
        }
      },

      typeSelected(type) {
        this.updateRoute(type);
      },
    },
  };
</script>
