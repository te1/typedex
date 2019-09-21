<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-72 sm:pr-4">
      <app-heading class="mb-2">Defense</app-heading>

      <div class="box-heading">Pokemon</div>
      <div class="box -mx-2 mb-4 p-2">
        <type-picker
          v-model="type1"
          class="mb-2"
          @select="type1Selected"
        >
          Primary Type
        </type-picker>

        <type-picker
          v-model="type2"
          :exclude="type1"
          show-none
          allow-clear
          @select="type2Selected"
        >
          Secondary Type
        </type-picker>
      </div>
    </div>

    <div
      v-if="types.length"
      class="mt-6 w-full sm:flex-1 sm:mt-0 sm:pl-4"
    >
      <damage-taken :types="types" />
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import TypePicker from '../components/type/TypePicker';
  import DamageTaken from '../components/damage/DamageTaken';

  export default {
    name: 'Defense',

    components: {
      TypePicker,
      DamageTaken,
    },

    data() {
      return {
        type1: this.getTypeFromRoute(this.$route, 'type1'),
        type2: this.getTypeFromRoute(this.$route, 'type2'),
      };
    },

    computed: {
      types() {
        let result = [];

        if (this.type1) {
          result.push(this.type1);
        }

        if (this.type2) {
          result.push(this.type2);
        }

        return result;
      },
    },

    activated() {
      this.updateRoute(this.type1, this.type2, { replace: true });
    },

    beforeRouteUpdate(to, from, next) {
      if (to.name === from.name && !to.params.type1) {
        // don't reset types when navigating from /defense/x/y to /defense
        return;
      }

      // this.type1 = this.getTypeFromRoute(to, 'type1');
      // this.type2 = this.getTypeFromRoute(to, 'type2');

      next();
    },

    methods: {
      getTypeFromRoute(route, paramName) {
        let type;

        if (route && route.params && route.params[paramName]) {
          type = data.getType(route.params[paramName]);
        }
        if (!type && paramName === 'type1') {
          type = data.getType('normal'); // fallback
        }

        return type;
      },

      updateRoute(type1, type2, opts = {}) {
        let path = '/defense/' + type1.name;

        if (type2) {
          path += '/' + type2.name;
        }

        if (this.$route.path === path) {
          return;
        }

        if (opts.replace) {
          this.$router.replace(path);
        } else {
          this.$router.push(path);
        }
      },

      type1Selected(type) {
        if (type && this.type2 === type) {
          this.type2 = null;
        }

        this.updateRoute(type, this.type2);
      },

      type2Selected(type) {
        this.updateRoute(this.type1, type);
      },
    },
  };
</script>
