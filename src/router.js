import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/HomeView/HomeView.vue'),
    },
    // {
    //     path: '*',
    //     redirect: '/home',
    // },

    {
      path: '/market',
      redirect: '/market',
      component: () => import('./views/Layouts/app.layout.vue'),
      children: [
        {
          path: '',
          name: 'market',
          component: () => import('./views/App/market.vue'),
        },
        {
          path: '/detail/:id',
          name: 'market-detail',
          component: () => import('./views/App/market-detail.vue'),
        },
        {
          path: '/portfolio',
          name: 'portfolio',
          component: () => import('./views/App/portfolio.vue'),
        },

        {
          path: '/bridge',
          name: 'bridge',
          component: () => import('./views/TokenMove/index.vue'),
        },
        {
          path: '/deposit',
          name: 'deposit',
          component: () => import('./views/Fund/Deposit.vue'),
        },
        {
          path: '/issue',
          name: 'issue',
          component: () => import('./views/App/issue.vue'),
        },
        // {
        //   path: '/nft-detail/:id',
        //   name: 'nft-detail',
        //   component: () => import('./views/NFT/nft-detail.vue'),
        // },

        {
          path: '/nft',
          name: 'nft',
          redirect: '/nft',
          component: () => import('./views/NFT/layout.vue'),
          children: [
            {
              path: '',
              name: 'nftSale',
              component: () => import('./views/NFT/index.vue'),
            },
            // {
            //   path: 'market',
            //   name: 'nftMarket',
            //   component: () => import('./views/NFT/market.vue'),
            // },
            {
              path: 'packet',
              name: 'nftPacket',
              component: () => import('./views/NFT/packet.vue'),
            },
          ],
        },
      ],
    },
  ],
});
export const asyncRoute = [];
export const marketMakerRoute = [];
