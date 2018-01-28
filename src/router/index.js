import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/pages/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/products',
      name: 'Products',
      component: Products,
      query: { page: '1', brand: '' }
    }
  ]
})
