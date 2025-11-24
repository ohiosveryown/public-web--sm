<template>
  <div class="app">
    <Small />
  </div>
</template>

<style scoped lang="scss">
  @use '../style/grid.scss' as *;

  .app {
    padding: 0rem;
    @include breakpoint(lg) {
      padding: 2rem;
    }
  }
</style>

<script lang="ts" setup></script>
