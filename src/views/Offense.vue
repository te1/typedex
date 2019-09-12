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
      <app-heading class="mb-2">Damage Done</app-heading>

      <type-damage-list
        :data="damageDone.strong"
        heading="It's super effective!"
        info="Strong"
        info-color="green"
        info-icon="arrow-up"
      />

      <type-damage-list
        :data="damageDone.weak"
        heading="It's not very effective..."
        info="Weak"
        info-color="orange"
        info-icon="arrow-down"
      />

      <type-damage-list
        :data="damageDone.immune"
        heading="It has no effect"
        info="Immune"
        info-color="red"
        info-icon="ban"
      />
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import TypePicker from '../components/TypePicker';
  import TypeDamageList from '../components/TypeDamageList';

  export default {
    name: 'Offense',

    components: {
      TypePicker,
      TypeDamageList,
    },

    data() {
      return {
        type: this.getTypeFromRoute(this.$route),
      };
    },

    computed: {
      damageDone() {
        let data = _.map(this.type.damageDone, item =>
          _.pick(item, ['type', 'factor'])
        );

        data = _.orderBy(data, ['factor', 'type'], ['desc', 'asc']);

        let result = {};

        result.strong = _.filter(data, item => item.factor > 1);
        result.weak = _.filter(data, item => item.factor > 0 && item.factor < 1);
        result.immune = _.filter(data, item => item.factor <= 0);

        return result;
      },
    },

    activated() {
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
