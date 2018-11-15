import axios from 'axios';
import qs from 'qs';
import util from '../utils';
import { host } from '../utils/constants';
import router from '../router';
import store from '../store';

// axios.interceptors.response.use((response) => {
//   if (response && response.data && response.data.status === -11) {
//     router.push({ path: '/login' })
//   }
//   return response
// }, (error) => {
//   return Promise.reject(error)
// })

axios.interceptors.request.use(function (config) {
  Object.assign(config.headers, {
    'apiversion': '3.0',
    'platform': 'H5'
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

const apiBase = (promises, config) => {
  return promises
  .then((res) => {
    if (res && res.status === 200) {
      if (res.data.status === -11 && config.allowDirect !== false) {
        store.dispatch('clearUserInfo')
        store.dispatch('clearFinanceInfo')
        store.dispatch('clearShoppingInfo')
        if (router.currentRoute.path.indexOf('login') === -1) {
          let routerParas = {
            path: '/login'
          }
          Object.assign(routerParas, {
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          router.replace(routerParas)
        }
      }
      config.success && config.success(res.data)
      return Promise.resolve(res.data)
    }
  })
  .catch((error) => {
    if (config.failure) {
      config.failure(error)
    } else {
      console.log('error: ' + JSON.stringify(error))
    }
  })
}

const formatParams = (params) => {
  if (params) {
    params = util.filterNull(params)
  }
  return params
}

export default {
  get: (config) => {
    let params = formatParams(config.params)
    const promises = params ? axios.get(host + config.endpoint, params) : axios.get(host + config.endpoint)
    return apiBase(promises, config)
  },
  post: (config) => {
    let params = formatParams(config.params)
    const promises = axios.post(host + config.endpoint, qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return apiBase(promises, config)
  },
  postWithJson: (config) => {
    let params = formatParams(config.params)
    const promises = axios.post(host + config.endpoint, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return apiBase(promises, config)
  }
}
