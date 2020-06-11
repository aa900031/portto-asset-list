import './main.scss';
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAssetDetail } from '../../services/asset-detail';

export default defineComponent({
  name: 'AssetDetail',

  setup() {
    const { params } = useRoute()
    const { isFetching, currentData, fetchData } = useAssetDetail(params.address as string, params.tokenId as string)
    onMounted(() => fetchData())

    const renderDetail = () => {
      const detail = currentData.value
      if (!detail) {
        return null
      }

      return (
        <>
          <div class="asset-detail__title">{ detail.collectionName }</div>
          <img class="asset-detail__img" src={detail.imageUrl}></img>
          <div class="asset_detail__name">{ detail.name }</div>
          <div class="asset_detail__desc">{ detail.desc }</div>
          <a href={detail.permaLink} target="_blank" ref="noopener">Link</a>
        </>
      )
    }

    const renderLoading = () => {
      return isFetching.value ? <div>Loading...</div> : null
    }

    return () => (
      <div class="asset-detail">
        { renderDetail() }
        { renderLoading() }
      </div>
    )
  }
})
