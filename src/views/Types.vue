<template>
  <div>
    <h2 class="text-2xl mb-4">Types</h2>

    <type-pill
      v-for="type in types"
      :key="type.id"
      :type="type"
      :selectable="true"
      :selected="isSelected(type)"
      @toggle="onToggle"
    />

    <div v-for="damage in damageTaken">
      <type-pill :type="damage.type" :factor="damage.factor" />
    </div>
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
      types: data.types,
      selected: [],
    };
  },

  computed: {
    damageTaken() {
      let result = {};

      _.forEach(this.selected, type => {
        _.forEach(type.damageTaken, damage => {
          if (result[damage.type] == null) {
            result[damage.type] = damage.factor;
          } else {
            result[damage.type] *= damage.factor;
          }
        });
      });

      result = _.map(result, (value, key) => {
        return {
          type: key,
          factor: value,
        };
      });

      result = _.orderBy(result, ['factor', 'type'], ['desc', 'asc']);

      return result;
    },
  },

  methods: {
    isSelected(type) {
      return _.includes(this.selected, type);
    },

    onToggle({ type }) {
      if (this.isSelected(type)) {
        this.selected = _.without(this.selected, type);
      } else {
        this.selected.push(type);
      }

      if (this.selected.length > 2) {
        this.selected.shift();
      }
    },
  },
};
</script>
