<template>
  <div>
    <h2 class="text-2xl mb-4">Atack</h2>

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

    <div v-if="selectedType" class="flex content-between">
      <!-- <h3 class="text-xl mb-4">Damage taken</h3> -->

      <div v-if="damageDone.strong.length" class="flex flex-col mr-2">
        <h4>More</h4>

        <type-pill
          v-for="damage in damageDone.strong"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>

      <div v-if="damageDone.resistant.length" class="flex flex-col mr-2">
        <h4>Less</h4>

        <type-pill
          v-for="damage in damageDone.resistant"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>

      <div v-if="damageDone.immune.length" class="flex flex-col mr-2">
        <h4>None</h4>

        <type-pill
          v-for="damage in damageDone.immune"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
          class="mb-2"
        />
      </div>
    </div>
    <div v-else>Select attack type</div>
  </div>
</template>

<script>
import _ from 'lodash';
import data from '../services/data';
import TypePill from '../components/TypePill';

export default {
  name: 'Pokemon',

  components: {
    TypePill,
  },

  data() {
    return {
      allTypes: _.cloneDeep(data.types),
      selectedType: null,
    };
  },

  computed: {
    damageDone() {
      let data = _.map(this.selectedType.damageDone, item =>
        _.pick(item, ['type', 'factor'])
      );

      data = _.orderBy(data, ['factor', 'type'], ['desc', 'asc']);

      let result = {};

      result.strong = _.filter(data, item => item.factor > 1);

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
      return this.selectedType === type;
    },

    onToggle({ type }) {
      if (this.isSelected(type)) {
        this.selectedType = null;
      } else {
        this.selectedType = type;
      }
    },
  },
};
</script>
