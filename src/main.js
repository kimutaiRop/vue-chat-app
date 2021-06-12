import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apolloProvider from './apollo_client'
import { DEBUG } from './settings'
import store from './store'

Vue.config.productionTip = DEBUG

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')