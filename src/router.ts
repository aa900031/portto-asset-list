import { createRouter, createWebHashHistory } from 'vue-router';
import { routes as AssetListRoutes } from './pages/AssetList/route';
import { routes as AssetDetailRoutes } from './pages/AssetDetail/route';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/0x960DE9907A2e2f5363646d48D7FB675Cd2892e91/assets',
    },
    ...AssetListRoutes,
    ...AssetDetailRoutes,
  ],
})
