const router = [
    {
      path: '',
      name: 'Index',
      component: resolve => require(['@/pages/index/Index'], resolve),
      meta: {
        title: '首页'
      }
    }
]

export default router
