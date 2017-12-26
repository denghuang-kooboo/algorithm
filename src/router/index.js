import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/layout/index'
import LayoutTest from 'components/layout-test'

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
      path: '/test',
      name: 'test',
      component: LayoutTest
    }
  ]
})
