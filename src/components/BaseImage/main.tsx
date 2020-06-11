import './main.scss';
import { defineComponent } from 'vue';

export const BaseImage = defineComponent({
  name: 'BaseImage',

  setup(props, ctx) {

    return () => (
      <div class="base-image">
        <img {...ctx.attrs} />
      </div>
    )
  }
})
