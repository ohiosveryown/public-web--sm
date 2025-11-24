<template>
  <section
    class="countertop"
    :class="{ 'countertop--scrolled': shouldHideMask }"
  >
    <div
      class="mask"
      :class="{ 'mask--hidden': shouldHideMask }"
    />

    <!-- <div class="block"></div> -->

    <div
      class="container"
      :class="{
        'has-widget': showTestWidget,
        'has-suggestions': filteredSuggestions.length > 0,
        'container--scrolled': shouldHideMask && !isInputFocused,
        'container--focused': isInputFocused,
      }"
    >
      <div class="widget-wrapper">
        <Transition name="widget-fade">
          <TestWidget v-if="showTestWidget" />
        </Transition>
      </div>

      <!-- suggestions -->
      <div class="suggestions-wrapper">
        <Transition name="suggestions-fade">
          <div
            v-if="filteredSuggestions.length > 0"
            class="suggestions-container"
          >
            <div class="suggestions-scroll">
              <button
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                class="suggestion-pill"
                @click="selectSuggestion(suggestion.text)"
              >
                <div class="suggestion-avatar">
                  <img
                    :src="suggestion.avatar"
                    :alt="suggestion.text"
                  />
                </div>
                <span class="suggestion-text monospace">{{
                  suggestion.text
                }}</span>
              </button>
            </div>
            <div class="suggestions-fade"></div>
          </div>
        </Transition>
      </div>

      <!-- input -->
      <div class="input-container">
        <input
          v-model="inputValue"
          type="text"
          placeholder="Grow with Square..."
          @keydown.meta.enter="handleArrowClick"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
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
    transition: background 0.2s ease;

    &--scrolled {
      background: transparent;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-inner);
    margin: 0 auto;
    padding: 0.6rem;
    width: 100%;
    background: #ffffff28;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;

    &--scrolled {
      width: 50%;
      background: #00000099;
      transform: translateY(-0.8rem);
    }

    &--focused {
      width: 100% !important;
    }
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

  .suggestions-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.4s var(--ease, ease-out);
    overflow: hidden;

    > * {
      min-height: 0;
    }
  }

  .container.has-suggestions {
    border-radius: 24px;
  }

  .container.has-suggestions .suggestions-wrapper {
    grid-template-rows: 1fr;
  }

  .suggestions-container {
    position: relative;
    overflow: hidden;
  }

  .suggestions-scroll {
    display: flex;
    gap: 0.6rem;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none; // IE/Edge

    &::-webkit-scrollbar {
      display: none; // Chrome/Safari
    }

    // Smooth scrolling
    scroll-behavior: smooth;
  }

  .suggestions-fade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6.4rem;
    pointer-events: none;
    background: linear-gradient(to right, transparent, rgba(40, 40, 40, 1));

    .container--scrolled & {
      background: linear-gradient(to right, transparent, rgba(40, 40, 40, 0.2));
    }
  }

  .suggestion-pill {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1.4rem 0.6rem 0.6rem;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    flex-shrink: 0;
  }

  .suggestion-avatar {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 100%;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .suggestion-text {
    font-size: 1.3rem;
    opacity: 0.8;
    white-space: nowrap;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.6rem 0.6rem 1rem;
  }

  input {
    flex: 1;
    min-width: 88px;
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

  // suggestions animation //
  .suggestions-fade-enter-active {
    transition: all 0.5s var(--ease, ease-out);
    transition-delay: 0.4s;
  }

  .suggestions-fade-leave-active {
    transition: all 0.2s var(--ease, ease-in);
  }

  .suggestions-fade-enter-from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }

  .suggestions-fade-leave-to {
    opacity: 0;
    transform: translateY(-0.5rem);
  }

  // mask //
  .mask {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    opacity: 1;
    transition: opacity 0.2s ease;
    pointer-events: none;

    &--hidden {
      opacity: 0;
      pointer-events: none;
    }

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
  const isInputFocused = ref(false)
  const { shouldHideMask } = useCanvasScroll()

  const suggestions = ref([
    {
      text: 'How much does Square cost',
      avatar:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234A90E2"/%3E%3Cpath d="M30 50 L45 65 L70 35" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/%3E%3C/svg%3E',
    },
    {
      text: 'does Square work',
      avatar:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23D4A574"/%3E%3Ccircle cx="50" cy="50" r="30" fill="%23C8965A"/%3E%3C/svg%3E',
    },
    {
      text: 'does Square integrate',
      avatar:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%2394C973"/%3E%3Cpath d="M50 30 L50 70 M30 50 L70 50" stroke="white" stroke-width="6" stroke-linecap="round"/%3E%3C/svg%3E',
    },
    {
      text: 'does Square accept bitcoin',
      avatar:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23B8A9C9"/%3E%3C/svg%3E',
    },
  ])

  const MIN_CHARS_FOR_SUGGESTIONS = 5

  const filteredSuggestions = computed(() => {
    if (inputValue.value.length < MIN_CHARS_FOR_SUGGESTIONS) {
      return []
    }

    const query = inputValue.value.toLowerCase().trim()
    return suggestions.value
      .filter((suggestion) => suggestion.text.toLowerCase().includes(query))
      .slice(0, 3) // Limit to 3 suggestions
  })

  const selectSuggestion = (text: string) => {
    inputValue.value = text
    // Optionally focus the input after selection
    // You could also trigger a search/submit here
  }

  const handleArrowClick = () => {
    showTestWidget.value = true
    inputValue.value = ''
  }
</script>
