import Vue from 'vue'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import apolloClient from './utils/apolloClient'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/application.scss'

Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
