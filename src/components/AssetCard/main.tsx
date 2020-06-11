import './main.scss';
import { defineComponent, PropType } from 'vue';
import { AssetItem } from '../../services/asset-list';

export const AssetCard = defineComponent({
  name: 'AssetCard',

  props: {
    data: {
      type: Object as PropType<AssetItem>,
      required: true,
    }
  },

  setup(props) {
    const { data } = props

    return () => (
      <div class="asset-card">
        <div class="asset-card__img">
          <img src={data.imageUrl} />
        </div>
        <div class="asset-card__name">{data.name}</div>
      </div>
    )
  }
})
