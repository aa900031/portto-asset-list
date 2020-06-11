import { RouteRecordRaw } from 'vue-router'

export const ROUTE_NAME_ASSET_LIST_PAGE = 'asset-list'

export const ROUTE_PATH_ASSET_LIST_PAGE = '/:id/assets'

export const routes: RouteRecordRaw[] = [{
  name: ROUTE_NAME_ASSET_LIST_PAGE,
  path: ROUTE_PATH_ASSET_LIST_PAGE,
  component: () => import('./main')
}]
