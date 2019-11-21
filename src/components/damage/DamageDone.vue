<template>
  <div>
    <app-heading class="mb-2">Damage Done</app-heading>

    <damage-list
      :data="damageDone.strong"
      heading="It's super effective!"
      info="Strong"
      info-color="green"
      info-icon="arrow-up"
    />

    <damage-list
      :data="damageDone.weak"
      heading="It's not very effective..."
      info="Weak"
      info-color="orange"
      info-icon="arrow-down"
    />

    <damage-list
      :data="damageDone.immune"
      heading="It has no effect"
      info="Immune"
      info-color="red"
      info-icon="ban"
    />

    <damage-list
      :data="damageDone.neutral"
      heading="All the rest"
      info="Neutral"
      :info-icon="['far', 'circle']"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../../services/data';
  import DamageList from './DamageList';

  export default {
    name: 'DamageDone',

    components: {
      DamageList,
    },

    props: {
      type: {
        type: [Object, String],
        required: true,
      },
    },

    computed: {
      resolvedType() {
        return data.getType(this.type);
      },

      damageDone() {
        let data = _.map(this.resolvedType.damageDone, (factor, type) => {
          return {
            type,
            factor,
          };
        });

        data = _.orderBy(data, ['factor', 'type'], ['desc', 'asc']);

        let result = {};

        result.strong = _.filter(data, item => item.factor > 1);
        result.weak = _.filter(data, item => item.factor > 0 && item.factor < 1);
        result.immune = _.filter(data, item => item.factor <= 0);
        result.neutral = _.filter(data, item => item.factor === 1);

        return result;
      },
    },
  };
</script>
