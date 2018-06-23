// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Navigation from './components/Navigation'
import CineListBox from './components/CineListBox'
import BoxMovieDetail from './components/BoxMovieDetail'
import BoxTvShowDetail from './components/BoxTvShowDetail'

import CineDetail from './views/CineDetail'

Vue.config.productionTip = false

Vue.component('app-nav', Navigation)
Vue.component('cine-list-box', CineListBox)
Vue.component('cine-detail', CineDetail)
Vue.component('box-movie-detail', BoxMovieDetail)
Vue.component('box-tvshow-detail', BoxTvShowDetail)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
