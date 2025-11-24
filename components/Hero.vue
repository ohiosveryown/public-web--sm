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
      <h1 class="exact-block">Where Atlanta gets paid.</h1>
      <div class="social">
        <h2 class="cash-sans">
          You’re in good hands – over 2,000 businesses in Atlanta trust us to
          take payments.
        </h2>
        <img
          src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1764013036/public-web--sm/pile_3x_akcxua.webp"
          alt="Pile"
          class="pile"
        />
      </div>
      <button class="cta cash-medium">Get started</button>
      <button class="scroll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            fill="#fff"
            d="m10.833 14.655 4.828-4.827 1.178 1.178-6.25 6.25a.834.834 0 0 1-1.178 0l-6.25-6.25 1.178-1.178 4.827 4.827V3.334h1.667z"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .hero {
    position: relative;
    overflow: hidden;
    height: 100%;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.8)
      );
      z-index: 1;
      pointer-events: none;
    }
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
    z-index: 2; // Above the overlay
    display: flex;
    gap: 4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 16rem 2rem 0;
  }

  h1 {
    font-size: 6.4rem;
    line-height: 0.88;
    text-align: center;
    letter-spacing: -0.01rem;
  }

  h2 {
    max-width: 48ch;
    font-size: 1.8rem;
    line-height: 1.4;
    opacity: 0.8;
    text-align: center;
  }

  .social {
    display: flex;
    gap: 1.8rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .cta {
    background: #fff;
    color: #000;
    padding: 1.8rem 3.2rem;
    border-radius: 100px;
    font-size: 1.6rem;
  }

  .pile {
    width: auto;
    height: 2.8rem;
  }

  .scroll {
    position: absolute;
    bottom: -34rem;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    background: #ffffff40;
    border-radius: 100%;
    padding: 0;
    margin: 0;
    backdrop-filter: blur(10px);
    opacity: 0.8;
  }
</style>
