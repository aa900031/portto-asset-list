import { ref, onMounted, onBeforeUnmount, Ref } from 'vue';

export const useIntersectionObserver = (
  target: Ref<HTMLElement>,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px' }
) => {
  let observer: IntersectionObserver

  const intersectionRatio = ref(0)
  const isIntersecting = ref(false);
  const isFullyInView = ref(false);
  const observe = () => {
    target.value && observer?.observe(target.value)
  }
  const unobserve = () => {
    if (!observer) return
    target.value && observer?.unobserve(target.value)
  }

  onMounted(() => {
    observer = new IntersectionObserver((_a) => {
      var entry = _a[0]
      intersectionRatio.value = entry.intersectionRatio
      if (entry.intersectionRatio > 0) {
        isIntersecting.value = true
        isFullyInView.value = entry.intersectionRatio >= 1
        return
      }
      isIntersecting.value = false
    }, options)
    observe()
  })

  onBeforeUnmount(() => {
    unobserve()
  })

  return {
    intersectionRatio,
    isIntersecting,
    isFullyInView,
    observe,
    unobserve,
  }
}
