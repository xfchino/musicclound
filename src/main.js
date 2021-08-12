import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http/http.js'
import './plugins/element.js'

// vbest ui引入
import VbestUi from 'vbest-ui'
import 'vbest-ui/dist/vbest-ui.css'
Vue.use(VbestUi)

Vue.config.productionTip = false
Vue.prototype.$http=axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
