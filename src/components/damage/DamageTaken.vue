<template>
  <div>
    <app-heading class="mb-2">Damage Taken</app-heading>

    <damage-list
      :data="damageTaken.weak"
      :attack="false"
      heading="It's super effective!"
      info="weak"
      info-color="red"
      info-icon="arrow-up"
    />

    <damage-list
      :data="damageTaken.resistant"
      :attack="false"
      heading="It's not very effective..."
      info="resistant"
      info-color="green"
      info-icon="arrow-down"
    />

    <damage-list
      :data="damageTaken.immune"
      :attack="false"
      heading="It has no effect"
      info="immune"
      info-color="green"
      info-icon="ban"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../../services/data';
  import DamageList from './DamageList';

  export default {
    name: 'DamageTaken',

    components: {
      DamageList,
    },

    props: {
      types: {
        type: Array,
        required: true,
      },
    },

    computed: {
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
  };
</script>

<style>
</style>
