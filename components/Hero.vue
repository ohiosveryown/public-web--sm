<template>
  <section class="hero">
    <video
      class="hero-video"
      autoplay
      loop
      muted
      playsinline
      src="https://res.cloudinary.com/dn1q8h2ga/video/upload/v1764011403/public-web--sm/square-tease-0_w48pon.mp4"
    />
    <div class="content">
      <h1 class="exact-block">From your corner to every corner.</h1>
      <h2 class="cash-sans">
        Whatever your flavor of business, build and grow on your terms.
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .hero {
    position: relative;
    // display: flex;
    // flex-direction: column;
    // align-items: flex-start;
    // justify-content: center;
    overflow: hidden;
    height: 100%;
  }

  .hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 2.4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 14rem 2rem 0;
  }

  h1 {
    font-size: 6.4rem;
    line-height: 0.88;
    text-align: center;
    letter-spacing: -0.01rem;
  }

  h2 {
    max-width: 32ch;
    font-size: 1.8rem;
    line-height: 1.2;
    opacity: 0.8;
    text-align: center;
  }
</style>
