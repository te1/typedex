<template>
  <div>
    <h2 class="text-2xl mb-4">Types</h2>

    <div class="flex flex-wrap content-between mb-4">
      <type-pill
        v-for="type in allTypes"
        :key="type.id"
        :type="type"
        :selectable="true"
        :selected="isSelected(type)"
        class="mr-2 mb-2"
        @toggle="onToggle"
      />
    </div>

    <div v-if="selectedTypes.length" class="flex content-between">
      <!-- <h3 class="text-xl mb-4">Damage taken</h3> -->

      <div v-if="damageTaken.weak.length" class="flex flex-col mr-2">
        <h4>More</h4>

        <type-pill
          v-for="damage in damageTaken.weak"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>

      <div v-if="damageTaken.resistant.length" class="flex flex-col mr-2">
        <h4>Less</h4>

        <type-pill
          v-for="damage in damageTaken.resistant"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>

      <div v-if="damageTaken.immune.length" class="flex flex-col mr-2">
        <h4>None</h4>

        <type-pill
          v-for="damage in damageTaken.immune"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>
    </div>
    <div v-else>Select type(s)</div>
  </div>
</template>

<script>
import _ from 'lodash';
import data from '../services/data';
import TypePill from '../components/TypePill.vue';

export default {
  name: 'Defend',

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
        this.selectedTypes = _.without(this.selectedTypes, type);
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
