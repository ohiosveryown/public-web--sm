export const useCanvasScroll = () => {
  const scrollY = useState('canvas-scroll-y', () => 0)
  const shouldHideMask = computed(() => scrollY.value > 40)

  return {
    scrollY,
    shouldHideMask
  }
}

