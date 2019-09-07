<template>
  <div>
    <div class="box-heading">Pokemon</div>
    <div class="box -mx-2 p-2">
      <div class="mb-2 flex items-center justify-between">
        <div>Primary Type</div>
        <type-picker
          v-model="type1"
          :exclude="type2"
        />
      </div>

      <div class="flex items-center justify-between">
        <div>Secondary Type</div>
        <type-picker
          v-model="type2"
          :exclude="type1"
          :show-none="true"
          :allow-clear="true"
        />
      </div>
    </div>

    <div v-if="types.length">
      <type-damage-list
        :data="damageTaken.weak"
        :attack="false"
      >
        It's super effective!
      </type-damage-list>

      <type-damage-list
        :data="damageTaken.resistant"
        :attack="false"
      >
        It's not very effective...
      </type-damage-list>

      <type-damage-list
        :data="damageTaken.immune"
        :attack="false"
      >
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
    name: 'Defense',

    components: {
      TypePicker,
      TypeDamageList,
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

      damageTaken() {
        let data = {};

        _.forEach(this.types, type => {
          _.forEach(type.damageTaken, damage => {
            if (data[damage.type] == null) {
              data[damage.type] = damage.factor;
            } else {
              data[damage.type] *= damage.factor;
            }
          });
        });

        data = _.map(data, (value, key) => {
          return {
            type: key,
            factor: value,
          };
        });

        data = _.orderBy(data, ['factor', 'type'], ['desc', 'asc']);

        let result = {};

        result.weak = _.filter(data, item => item.factor > 1);
        result.resistant = _.filter(
          data,
          item => item.factor > 0 && item.factor < 1
        );
        result.immune = _.filter(data, item => item.factor <= 0);

        return result;
      },
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
    },
  };
</script>
