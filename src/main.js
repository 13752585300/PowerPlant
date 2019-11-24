import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from'./utils/request'
import './plugins/ant-design-vue.js'
import '@/assets/less/global.less'
import moment from 'moment'

Vue.config.productionTip = false;
//将request注册为vue的属性
//可以直接使用接口
Vue.prototype.$requet=request;
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
