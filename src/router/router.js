const router = [
    {
      path: '',
      name: 'Index',
      component: resolve => require(['@/pages/index/Index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/pages/index/Index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/movie',
      name: 'movie',
      component: resolve => require(['@/pages/movie/Movie'], resolve),
      meta: {
        title: '电影'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search/Search'], resolve),
      meta: {
        title: '搜索结果'
      }
    }
]

export default router
