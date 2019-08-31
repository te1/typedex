<template>
  <div>
    <h2>Moves</h2>

    <move-picker v-model="move" />

    <div v-if="move">
      {{ move.type }}
    </div>

    <!--
    <div class="mb-4 px-4 pt-4 pb-2 rounded bg-white shadow-md">
      <div class="flex flex-wrap justify-between">
        <type-pill
          v-for="type in allTypes"
          :key="type.id"
          :type="type"
          :selectable="true"
          :selected="isSelected(type)"
          class="flex-1 mr-2 mb-2"
          @toggle="onToggle"
        />
      </div>
    </div>

    <div v-if="selectedTypes.length">
      <h3 class="font-semibold tracking-wider mb-2">Damage taken</h3>

      <div class="px-4 pt-2 pb-4 rounded bg-white shadow-md">
        <h3 class="text-xl mb-4">Damage taken</h3>

        <div v-if="damageTaken.weak.length">
          <h4>More</h4>

          <type-pill
            v-for="damage in damageTaken.weak"
            :key="damage.type"
            :type="damage.type"
            :factor="damage.factor"
            class="mr-2 mb-2"
          />
        </div>

        <div v-if="damageTaken.resistant.length">
          <h4>Less</h4>

          <type-pill
            v-for="damage in damageTaken.resistant"
            :key="damage.type"
            :type="damage.type"
            :factor="damage.factor"
            class="mr-2 mb-2"
          />
        </div>

        <div v-if="damageTaken.immune.length">
          <h4>None</h4>

          <type-pill
            v-for="damage in damageTaken.immune"
            :key="damage.type"
            :type="damage.type"
            :factor="damage.factor"
            class="mr-2 mb-2"
          />
        </div>
      </div>
    </div>
    <div v-text="info"></div>
    -->
  </div>
</template>

<script>
import _ from 'lodash';
import data from '../services/data';
import MovePicker from '../components/MovePicker';
import TypePill from '../components/TypePill';

export default {
  name: 'Moves',

  components: {
    MovePicker,
    TypePill,
  },

  data() {
    return {
      move: null,

      allTypes: _.cloneDeep(data.types),
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

    info() {
      if (!this.selectedTypes.length) {
        return 'Select type(s) for the defending Pokemon above.';
      }

      let result = 'Damage taken for a ';

      result += this.selectedTypes[0].caption;

      if (this.selectedTypes.length >= 2) {
        result += ' / ' + this.selectedTypes[1].caption;
      }

      result += ' Pokemon by move type';

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
