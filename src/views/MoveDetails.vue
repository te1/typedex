<template>
  <div v-if="move">
    <app-heading class="mb-2">{{ move.caption }}</app-heading>

    <div v-if="details">
      <div class="box-heading">Move</div>
      <div class="box -mx-2 mb-4 p-2">
        <div class="mb-2 flex justify-between">
          <div>Type</div>
          <type-label :type="move.type" />
        </div>

        <div class="mb-2 flex justify-between">
          <div>Category</div>
          <category-label :category="move.damageCategory" />
        </div>

        <div
          v-if="move.power"
          class="mb-2 flex justify-between"
        >
          <div>Power</div>
          <div class="font-semibold tracking-wider">{{ move.power }}</div>
        </div>

        <div
          v-if="move.accuracy"
          class="mb-2 flex justify-between"
        >
          <div>Accuracy</div>
          <div class="font-semibold tracking-wider">{{ move.accuracy }}</div>
        </div>

        <div
          v-if="move.pp"
          class="mb-2 flex justify-between"
        >
          <div>PP</div>
          <div class="font-semibold tracking-wider">{{ move.pp }}</div>
        </div>

        <div
          v-if="details.priority != null"
          class="mb-2 flex justify-between"
        >
          <div>Priority</div>
          <div class="font-semibold tracking-wider">{{ details.priority }}</div>
        </div>

        <div
          v-if="generation"
          class="mb-2 flex justify-between"
        >
          <div>Introduced in</div>
          <div class="font-semibold tracking-wider">
            {{ generation.caption }}
          </div>
        </div>
      </div>

      <div class="box -mx-2 mb-4 p-2">
        <div
          v-if="details.effect.short"
          class="mb-4"
        >
          {{ details.effect.short }}
        </div>

        <div
          v-if="details.effect.full"
          class="mb-4"
        >
          {{ details.effect.full }}
        </div>

        <div v-if="flavorText">
          {{ flavorText.text }}
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>

    <damage-done :type="move.type" />
  </div>
  <div
    v-else
    class="text-center"
  >
    <fa-icon
      :icon="['far', 'frown']"
      class="mt-8 mb-4 text-gray-500"
      style="font-size: 100px;"
    />

    <div class="text-2xl font-semibold tracking-wider text-gray-500">
      Move not found
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import data from '../services/data';
  import TypeLabel from '../components/type/TypeLabel';
  import CategoryLabel from '../components/type/CategoryLabel';
  import DamageDone from '../components/damage/DamageDone';

  export default {
    name: 'MoveDetails',

    components: {
      TypeLabel,
      CategoryLabel,
      DamageDone,
    },

    data() {
      return {
        move: this.getMoveFromRoute(this.$route),
        details: null,
      };
    },

    computed: {
      generation() {
        if (!this.details) {
          return null;
        }
        return data.getGeneration(this.details.gen);
      },

      flavorText() {
        if (!this.details) {
          return null;
        }

        return _.find(this.details.flavorTexts, {
          versionGroup: 'ultra-sun-ultra-moon',
        });
      },
    },

    watch: {
      move() {
        this.fetch();
      },
    },

    created() {
      this.fetch();
    },

    activated() {
      this.move = this.getMoveFromRoute(this.$route);
    },

    methods: {
      getMoveFromRoute(route) {
        let move;

        if (route && route.params && route.params.move) {
          move = data.getMove(route.params.move);
        }

        return move;
      },

      async fetch() {
        this.details = await data.getMoveDetails(this.move);
      },
    },
  };
</script>
