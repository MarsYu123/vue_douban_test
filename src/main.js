import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import axios from 'axios' //引入axios请求模块
import vueAxios from 'vue-axios'
import nprogress from 'nprogress' //加载进度条
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/public.scss'

import './registerServiceWorker'
import './plugins/element.js'


// ==========引用通用========

import $main_function from './utils/main_function';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueAxios, axios)
Vue.use(router)
Vue.use(store)

Vue.use($main_function)

nprogress.configure({
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to,from,next)=>{
   // 每次切换页面时，调用进度条
   nprogress.start();
   // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next();
})
//当路由进入后：关闭进度条
router.afterEach(() => {  
  // 在即将进入新的页面组件前，关闭掉进度条
  nprogress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
