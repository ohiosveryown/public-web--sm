<template>
  <div class="widget">
    <div v-if="isLoading" class="widget-loading">
      <div class="loading-spinner"></div>
      <p>Thinking...</p>
    </div>
    <div v-else-if="answer" class="widget-content">
      <div class="widget-header">
        <div class="widget-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3>{{ question }}</h3>
      </div>
      <div class="widget-answer">
        <p>{{ answer }}</p>
      </div>
      <div class="widget-footer">
        <span class="widget-badge">Powered by Square Knowledge</span>
      </div>
    </div>
    <div v-else class="widget-placeholder">
      <img
        src="https://res.cloudinary.com/dn1q8h2ga/image/upload/v1763933243/public-web--sm/card_3x_tzyms0.webp"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .widget {
    border-radius: 3.8rem;
    overflow: hidden;
  }

  .widget-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    
    p {
      margin-top: 1rem;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1.4rem;
    }
  }

  .loading-spinner {
    width: 3.2rem;
    height: 3.2rem;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .widget-content {
    padding: 2.4rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
    backdrop-filter: blur(10px);
  }

  .widget-header {
    display: flex;
    align-items: flex-start;
    gap: 1.2rem;
    margin-bottom: 1.6rem;
    
    h3 {
      flex: 1;
      font-size: 1.6rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.4;
    }
  }

  .widget-icon {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
    color: #94C973;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  .widget-answer {
    margin-bottom: 1.6rem;
    
    p {
      font-size: 1.4rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      white-space: pre-wrap;
    }
  }

  .widget-footer {
    display: flex;
    justify-content: flex-end;
  }

  .widget-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    font-family: 'CashMono', monospace;
  }

  .widget-placeholder img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>

<script lang="ts" setup>
  defineProps<{
    answer?: string
    question?: string
    isLoading?: boolean
  }>()
</script>
