import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// 定义路由文件位置
import index from '@/components/index'
import test from '@/components/test'
import model from '@/components/model'
import top from '@/components/top'
import classify from '@/components/classify'
import filmReview from '@/components/filmReview'
import tv from '@/components/tv'
import searchResults from '@/components/search_results'
import move_detail from '@/components/move_detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/top',
      name: 'top',
      component: top
    },
    {
      path: '/filmReview',
      name: 'filmReview',
      component: filmReview
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/tv',
      name: 'tv',
      component: tv
    },
    {
      path: '/search_results',
      name: 'searchResults',
      component: searchResults
    },
    {
      path: '/move_detail',
      name: 'move_detail',
      component: move_detail
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
