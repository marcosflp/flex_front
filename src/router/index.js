import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Router from 'vue-router'
import Home from '@/views/Home'
import CineDetail from '@/views/CineDetail'

Vue.use(Router)
Vue.use(VueAxios, axios)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

      children: [
        {
          path: ':type/:id',
          name: 'cine-detail',
          component: CineDetail
        }
      ]
    }
  ]
})
