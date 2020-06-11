import { defineComponent, ref, watch, PropType } from 'vue';
import { useIntersectionObserver } from '../../services/web-api-helper';

export const LoadMoreList = defineComponent({
  props: {
    onLoadMore: {
      type: Function as PropType<() => void>,
      required: true,
    }
  },

  setup(props, ctx) {
    const renderSlotDefault = () => ctx.slots.default!()
    const $bottom = ref<HTMLElement>(null)
    const { isIntersecting } = useIntersectionObserver($bottom)

    watch(isIntersecting, (val) => {
      val && props.onLoadMore()
    })

    return () => (
      <>
        { renderSlotDefault() }
        <div ref={$bottom}></div>
      </>
    )
  },
})
