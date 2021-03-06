import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios
import axios from 'axios'
// 导入全局样式
import '@/style/index.scss'
// 导入Vant组件库
import Vant from 'vant'
// 导入Vant样式
import 'vant/lib/index.css'
// 设置rem基准值
import 'amfe-flexible'
// import axios from 'axios'
import './mockjs/index'
//
import '@/assets/css/icon-font.css'
Vue.prototype.$axios = axios
// 全局挂载Vant
Vue.use(Vant)
Vue.config.productionTip = false
// Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
