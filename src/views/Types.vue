<template>
  <div>
    <h2 class="text-2xl mb-4">Types</h2>

    <type-pill
      v-for="type in allTypes"
      :key="type.id"
      :type="type"
      :selectable="true"
      :selected="isSelected(type)"
      @toggle="onToggle"
    />

    <h3 class="text-xl mb-4">Damage taken</h3>

    <h4>Weak against</h4>
    <type-pill
      v-for="damage in damageTaken.weak"
      :key="damage.type"
      :type="damage.type"
      :factor="damage.factor"
    />

    <h4>Resistant against</h4>
    <type-pill
      v-for="damage in damageTaken.resistant"
      :key="damage.type"
      :type="damage.type"
      :factor="damage.factor"
    />

    <h4>Immune against</h4>
    <type-pill
      v-for="damage in damageTaken.immune"
      :key="damage.type"
      :type="damage.type"
      :factor="damage.factor"
    />
  </div>
</template>

<script>
import _ from 'lodash';
import data from '../services/data';
import TypePill from '../components/TypePill.vue';

export default {
  name: 'Types',

  components: {
    TypePill,
  },

  data() {
    return {
      allTypes: data.types,
      selectedTypes: [],
    };
  },

  computed: {
    damageTaken() {
      let data = {};

      _.forEach(this.selectedTypes, type => {
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
    isSelected(type) {
      return _.includes(this.selectedTypes, type);
    },

    onToggle({ type }) {
      if (this.isSelected(type)) {
        this.selectedTypes = _.without(this.selectedTypesTypes, type);
      } else {
        this.selectedTypes.push(type);
      }

      if (this.selectedTypes.length > 2) {
        this.selectedTypes.shift();
      }
    },
  },
};
</script>
