import './main.scss';
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAssetDetail } from '../../services/asset-detail';
import { BaseImage } from '../../components/BaseImage/main';

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
          <h1 class="asset-detail__title">{detail.collectionName}</h1>

          <div class="asset-detail__content">
            <div class="asset-detail__img">
              <BaseImage src={detail.imageUrl}></BaseImage>
            </div>
            <div class="asset-detail__intro">
              <div class="asset-detail__name">{detail.name}</div>
              <div class="asset-detail__desc">{detail.desc}</div>
            </div>
          </div>

          <div class="asset-detail__footer">
            <a href={detail.permaLink} target="_blank" ref="noopener">Perma Link</a>
          </div>
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
