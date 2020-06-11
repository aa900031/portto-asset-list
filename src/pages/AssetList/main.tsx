import './main.scss';
import { defineComponent } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { createAssetDetailRoute } from '../AssetDetail/route';
import { useAssetList } from '../../services/asset-list';
import { AssetCard } from '../../components/AssetCard/main';
import { LoadMoreList } from '../../components/LoadMoreList/main';

export default defineComponent({
  name: 'AssetList',

  setup() {
    const { params } = useRoute()
    const { isFetching, currentData, fetchNext } = useAssetList(params.id as string)
    const handleLoadMore = () => {
      fetchNext()
    }

    return () => (
      <div class="asset-list-page">
        <LoadMoreList onLoadMore={handleLoadMore}>
          {
            currentData.value.map(item => {
              const key = item.tokenId
              const to = createAssetDetailRoute(item.address, item.tokenId)

              return (
                <RouterLink key={key} to={to}>
                  <AssetCard data={item}></AssetCard>
                </RouterLink>
              )
            })
          }
          {
            isFetching.value ? <div>Loading...</div> : null
          }
        </LoadMoreList>
      </div>
    )
  }
})
