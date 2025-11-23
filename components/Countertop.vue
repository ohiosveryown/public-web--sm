<template>
  <section class="countertop">
    <div class="mask"></div>

    <!-- <div class="block"></div> -->

    <div
      class="container"
      :class="{ 'has-widget': showTestWidget }"
    >
      <div class="widget-wrapper">
        <Transition name="widget-fade">
          <TestWidget v-if="showTestWidget" />
        </Transition>
      </div>

      <!-- input -->
      <div class="input-container">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Grow with Square..."
          @keydown.meta.enter="handleArrowClick"
        />

        <button
          v-show="!inputValue"
          class="input-btn"
        >
          <IconVoice />
        </button>

        <button
          v-show="inputValue"
          class="input-btn input-btn--arrow"
          @click="handleArrowClick"
        >
          <IconArrow />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .countertop {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    padding: 0 var(--border-thickness) var(--border-thickness);
    background: #000;
  }

  .container {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-inner);
    padding: 0.6rem;
    width: 100%;
    background: #ffffff28;
  }

  .widget-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s var(--ease, ease-out);
    overflow: hidden;

    > * {
      min-height: 0;
    }
  }

  .container.has-widget {
    border-radius: var(--radius-inner) var(--radius-inner) 24px 24px;
  }

  .container.has-widget .widget-wrapper {
    grid-template-rows: 1fr;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.6rem 0.6rem 1rem;
  }

  input {
    flex: 1;
  }

  .input-btn {
    display: grid;
    place-items: center;
    border-radius: 100px;
    width: 3.2rem;
    height: 3.2rem;
    background: #fff;
    opacity: 0.8;
    transition: transform var(--ease);

    &:active {
      transform: scale(0.88);
    }
  }

  .input-btn--arrow {
    opacity: 1;
  }

  // widget animation //
  .widget-fade-enter-active {
    transition: all 0.5s var(--ease, ease-out);
    transition-delay: 0.4s;
  }

  .widget-fade-leave-active {
    transition: all 0.4s var(--ease, ease-in);
  }

  .widget-fade-enter-from {
    opacity: 0;
    transform: translateY(1rem) scale(0.95);
  }

  .widget-fade-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem) scale(0.98);
  }

  // mask //
  .mask {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    background: red;

    &::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      left: 0;
      width: 100%;
      height: 0;
      padding-bottom: 21.394%; // 89/416 * 100% to maintain aspect ratio
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 416 89' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M416 89H0V0C0 22.3765 0.000296354 33.5647 3.89062 42.3027C8.41368 52.4617 16.5383 60.5863 26.6973 65.1094C35.4353 68.9997 46.6235 69 69 69H347C369.376 69 380.565 68.9997 389.303 65.1094C399.462 60.5863 407.586 52.4617 412.109 42.3027C416 33.5647 416 22.3765 416 0V89Z' fill='%23000'/%3E%3C/svg%3E");
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center bottom;
    }
  }

  // rm
  .block {
    width: 100%;
    height: 200px;
    background: green;
  }
</style>

<script lang="ts" setup>
  const inputValue = ref('')
  const showTestWidget = ref(false)

  const handleArrowClick = () => {
    showTestWidget.value = true
    inputValue.value = ''
  }
</script>
