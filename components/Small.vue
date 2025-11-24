<template>
  <div class="device">
    <Navigation />
    <Canvas />
    <Countertop />
  </div>
</template>

<style scoped lang="scss">
  @use '../style/grid.scss' as *;

  .device {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100dvh;
    padding: 2.4rem var(--border-thickness) var(--border-thickness);
    color: #fff;
    background: #000;
    overflow: hidden;
    position: relative;

    @include breakpoint(lg) {
      // border-radius: var(--radius-phone);
      width: 44rem;
      height: 95.6rem;
      padding: 4.8rem var(--border-thickness) var(--border-thickness);
    }
  }
</style>
