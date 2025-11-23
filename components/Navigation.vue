<template>
  <nav>
    <Jewel />
    <button>
      <svg
        width="26"
        height="11"
        fill="none"
        viewBox="0 0 26 11"
      >
        <rect
          width="26"
          height="3"
          fill="#fff"
          rx="1.5"
        />
        <rect
          width="26"
          height="3"
          y="8"
          fill="#fff"
          rx="1.5"
        />
      </svg>
    </button>
  </nav>
</template>

<style scoped lang="scss">
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 2.2rem 1.6rem 1.6rem;
  }
</style>

<script lang="ts" setup></script>
