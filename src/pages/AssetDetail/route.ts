import { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

export const ROUTE_NAME_ASSET_DETAIL_PAGE = 'asset-detail'

export const ROUTE_PATH_ASSET_DETAIL_PAGE = '/asset/:address/:tokenId'

export const routes: RouteRecordRaw[] = [{
  name: ROUTE_NAME_ASSET_DETAIL_PAGE,
  path: ROUTE_PATH_ASSET_DETAIL_PAGE,
  component: () => import('./main')
}]

export const createAssetDetailRoute = (address: string, tokenId: string): RouteLocationRaw => {
  return {
    name: ROUTE_NAME_ASSET_DETAIL_PAGE,
    params: { address, tokenId }
  }
}
