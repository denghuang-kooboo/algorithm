import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/layout/index'
import SortPage from 'components/algorithm/sort-page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path: '/sort-list',
      name: 'sort',
      component: SortPage
    }
  ]
})
