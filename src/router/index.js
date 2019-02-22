import Vue from 'vue'
import Router from 'vue-router'
import router from './router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component : resolve => require( ['@/pages/main/Main'], resolve ),
    children: [
      ...router
    ]
  }
]
// 路由整合

export default new Router({
  routes
})
