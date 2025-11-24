<template>
  <section
    ref="canvasRef"
    class="canvas"
    @scroll="handleScroll"
  >
    <Hero />

    <!-- <img
      class="rm"
      src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1763936610/public-web--sm/rm_2x_s4vpfa.webp"
      alt="canvas"
    /> -->
  </section>
</template>

<style scoped lang="scss">
  .canvas {
    position: relative;
    border-radius: var(--radius-inner);
    // padding: var(--border-thickness);
    width: 100%;
    height: 100%;
    background: #ffffff20;
    overflow-y: auto;
  }

  .rm {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>

<script lang="ts" setup>
  const canvasRef = ref<HTMLElement | null>(null);
  const { scrollY } = useCanvasScroll();

  const handleScroll = () => {
    if (canvasRef.value) {
      scrollY.value = canvasRef.value.scrollTop;
    }
  };
</script>
