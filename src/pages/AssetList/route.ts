import { RouteRecordRaw, RouteLocationRaw } from 'vue-router'

export const ROUTE_NAME_ASSET_LIST_PAGE = 'asset-list'

export const ROUTE_PATH_ASSET_LIST_PAGE = '/:address/assets'

export const routes: RouteRecordRaw[] = [{
  name: ROUTE_NAME_ASSET_LIST_PAGE,
  path: ROUTE_PATH_ASSET_LIST_PAGE,
  component: () => import('./main')
}]

export const createAssetListRoute = (address: string): RouteLocationRaw => {
  return {
    name: ROUTE_NAME_ASSET_LIST_PAGE,
    params: { address }
  }
}
