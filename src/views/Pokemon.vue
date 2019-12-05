<template>
  <div>
    <pokemon-list class="-mx-2" />
  </div>
</template>

<script>
  import PokemonList from '../components/pokemon/PokemonList';

  export default {
    name: 'Pokemon',

    components: {
      PokemonList,
    },
  };
</script>
