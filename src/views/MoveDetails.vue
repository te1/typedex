<template>
  <div v-if="move">
    {{ move.caption }}
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
  import data from '../services/data';
  import DamageDone from '../components/damage/DamageDone';

  export default {
    name: 'MoveDetails',

    components: {
      DamageDone,
    },

    data() {
      return {
        move: this.getMoveFromRoute(this.$route),
      };
    },

    activated() {
      this.move = this.getMoveFromRoute(this.$route);

      console.log(this.move);
    },

    methods: {
      getMoveFromRoute(route) {
        let move;

        if (route && route.params && route.params.move) {
          move = data.getMove(route.params.move);
        }

        return move;
      },
    },
  };
</script>
