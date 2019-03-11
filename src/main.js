import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios' //引入axios请求模块
import vueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './registerServiceWorker'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueAxios, axios)
Vue.use(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
