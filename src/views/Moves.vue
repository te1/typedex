<template>
  <div>
    <move-list class="-mx-2" />
  </div>
</template>

<script>
  import MoveList from '../components/move/MoveList';

  export default {
    name: 'Moves',

    components: {
      MoveList,
    },
  };
</script>
