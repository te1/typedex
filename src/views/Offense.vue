<template>
  <div>
    <div class="box-heading">Move Type</div>
    <div class="box -mx-2 p-2">
      <type-picker
        v-model="type"
        @select="updateRoute"
      />
    </div>

    <div v-if="type">
      <type-damage-list :data="damageDone.strong">
        It's super effective!
      </type-damage-list>

      <type-damage-list :data="damageDone.weak">
        It's not very effective...
      </type-damage-list>

      <type-damage-list :data="damageDone.immune">
        It has no effect
      </type-damage-list>
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
    },
  };
</script>
