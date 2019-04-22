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
    path: '/cinema',
    name: 'cinema',
    component: resolve => require(['@/pages/cinema/Cinema'], resolve),
    meta: {
      title: '影院'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: resolve => require(['@/pages/search/Search'], resolve),
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/details',
    name: 'details',
    component: resolve => require(['@/pages/details/Details'], resolve),
    meta: {
      title: '电影详情'
    }
  },

  {
    path: '/cinemadetails',
    name: 'Cdetails',
    component: resolve => require(['@/pages/cinema/CinemaDetails'], resolve),
    meta: {
      title: '影院详情'
    }
  },
  {
    path: '/person',
    component: resolve => require(['@/pages/personCenter/index'], resolve),
    children: [
      {
        path: '/person',
        name: 'personMessage',
        component: resolve => require(['@/pages/personCenter/PersonMessage'], resolve),
        meta: {
          title: '基本信息'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: resolve => require(['@/pages/personCenter/Order'], resolve),
        meta: {
          title: '我的订单'
        }
      },
      {
        path: '/xseats',
        name: 'xaests',
        component: resolve => require(['@/pages/xseat/index'], resolve),
        meta: {
          title: '选择座位'
        }
      }
    ]
  }
]

export default router
