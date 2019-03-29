// 配置API接口地址
var root = 'http://www.chong10010.cn:8088'
var qs = require('querystring')   // qs序列化，解决data传参，后台无法接受的问题
// 引用axios
import axios from 'axios'
import {getCookie} from './utils'

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}


function apiAxios (method, api, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root + api,
    withCredentials: false,
    headers:{
      "Authorization": "Bearer " + getCookie("key")
    }
  })
  .then(function (res) {
      success(res.data)
  })
  .catch(function (err) {
    let res = err.response
    if (err) {
//  	failure(err)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  get: function (params, api, success, failure) {
    return apiAxios('GET', api, params, success, failure)
  },
  post: function (params, api, success, failure) {
    return apiAxios('POST', api, params, success, failure)
  },
  put: function (params, api, success, failure) {
    return apiAxios('PUT', api, params, success, failure)
  },
  delete: function (params, api, success, failure) {
    return apiAxios('DELETE', api, params, success, failure)
  },
  updatas:function(e,success){
  	return updata(e,success)
  }
}

