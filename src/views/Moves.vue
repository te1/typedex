<template>
  <div class="flex flex-col">
    <app-heading class="mb-2">Moves</app-heading>

    <move-list class="-mx-2" />
  </div>
</template>

<script>
  import MoveList from '../components/MoveList';

  export default {
    name: 'Moves',

    components: {
      MoveList,
    },
  };
</script>
