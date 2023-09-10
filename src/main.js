import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-slider-component/theme/antd.css'
import store from "./store"
/* import the fontawesome core */

Vue.use(store);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
