import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './router/router.js'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
