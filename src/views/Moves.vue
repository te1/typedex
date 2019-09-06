<template>
  <div>
    <h2>Moves</h2>

    <move-picker v-model="move" @input="onMoveSelected" />

    <type-picker v-model="type" @input="onTypeSelected" />

    <div v-if="type">
      <h3>Damage done</h3>

      <div v-if="damageDone.strong.length">
        <h4>More</h4>

        <type-pill
          v-for="damage in damageDone.strong"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
        />
      </div>

      <div v-if="damageDone.resistant.length">
        <h4>Less</h4>

        <type-pill
          v-for="damage in damageDone.resistant"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
        />
      </div>

      <div v-if="damageDone.immune.length">
        <h4>None</h4>

        <type-pill
          v-for="damage in damageDone.immune"
          :key="damage.type"
          :type="damage.type"
          :factor="damage.factor"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import MovePicker from '../components/MovePicker';
  import TypePicker from '../components/TypePicker';
  import TypePill from '../components/TypePill';

  export default {
    name: 'Moves',

    components: {
      MovePicker,
      TypePicker,
      TypePill,
    },

    data() {
      return {
        move: null,
        type: null,
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

        result.resistant = _.filter(
          data,
          item => item.factor > 0 && item.factor < 1
        );

        result.immune = _.filter(data, item => item.factor <= 0);

        return result;
      },
    },

    methods: {
      onMoveSelected() {
        if (this.move == null) {
          return;
        }

        this.type = data.getType(this.move.type);
      },

      onTypeSelected() {
        if (this.type == null || this.move == null) {
          return;
        }

        if (this.move.type !== this.type.name) {
          this.move = null;
        }
      },
    },
  };
</script>
