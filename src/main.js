// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Pagination, Upload} from 'element-ui'
import Api from './common/api'

Vue.config.productionTip = false

Vue.component(Pagination.name, Pagination);
Vue.component(Upload.name, Upload);
// Vue.use(Pagination);
// Vue.use(Upload);
//时间戳转换
import {formatDate ,dateFtt} from './common/utils'
Vue.prototype.$formatDate=formatDate
Vue.prototype.$dateFtt=dateFtt

//正则表达式
import Validate from './common/validator'
Vue.prototype.$validate=function(type,value){return Validate.validate(type,value)}

// 通用过滤器
import filters from '@/filter';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// 引入axios
Vue.prototype.$api=Api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
