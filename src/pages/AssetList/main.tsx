import './main.scss';
import { ROUTE_NAME_ASSET_DETAIL_PAGE } from '../AssetDetail/route';
import { defineComponent } from 'vue';
import { useRoute, RouterLink, RouteLocationRaw } from 'vue-router';
import { useAssetList } from '../../services/asset-list';
import { AssetCard } from '../../components/AssetCard/main';
import { LoadMoreList } from '../../components/LoadMoreList/main';

const _genAssetDetailLinkById = (id: string): RouteLocationRaw => {
  return {
    name: ROUTE_NAME_ASSET_DETAIL_PAGE,
    params: { id }
  }
}

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
              const to = _genAssetDetailLinkById(item.tokenId)

              return (
                <RouterLink key={key} to={to}>
                  <AssetCard data={item}></AssetCard>
                </RouterLink>
              )
            })
          }
          {
            isFetching.value && <div>Loading...</div>
          }
        </LoadMoreList>
      </div>
    )
  }
})
