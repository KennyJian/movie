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
    }
]

export default router
