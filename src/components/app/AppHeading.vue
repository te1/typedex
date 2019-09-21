<template>
  <div class="flex justify-between">
    <div class="h-0 my-auto pt-1 flex-1 border-b border-gray-500" />
    <div class="mx-3 text-gray-600 text-lg font-semibold tracking-widest">
      <slot />
    </div>
    <div class="h-0 my-auto pt-1 flex-1 border-b border-gray-500" />
  </div>
</template>

<script>
  export default {
    name: 'AppHeading',
  };
</script>
