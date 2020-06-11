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
    const address: string = params.address as string;
    const { isFetching, currentData, fetchNext } = useAssetList(address)
    const handleLoadMore = () => {
      fetchNext()
    }

    return () => (
      <div class="asset-list">
        <h1 class="asset-list__title"><code>{ address }</code>的資產列表</h1>
        <div class="asset-list__list">
          <LoadMoreList onLoadMore={handleLoadMore}>
            {
              currentData.value.map(item => {
                const key = item.tokenId
                const to = createAssetDetailRoute(item.address, item.tokenId)

                return (
                  <RouterLink
                    class="asset-list__item"
                    key={key}
                    to={to}
                  >
                    <AssetCard data={item}></AssetCard>
                  </RouterLink>
                )
              })
            }
            {
              isFetching.value ? <div style="width: 100%;">載入中...</div> : null
            }
          </LoadMoreList>
        </div>
      </div>
    )
  }
})
