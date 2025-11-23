<template>
  <section class="canvas">
    <!-- <h1>Canvas</h1> -->
    <img
      class="rm"
      src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1756947317/proportional.design-4.0/hero_2x_uajsjm.webp"
      alt="canvas"
    />
  </section>
</template>

<style scoped lang="scss">
  .canvas {
    border-radius: var(--radius-inner);
    // padding: var(--border-thickness);
    width: 100%;
    height: 100%;
    background: #ffffff20;
    overflow-y: auto;
  }

  .rm {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<script lang="ts" setup></script>
