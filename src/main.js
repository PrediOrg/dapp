import Vue from 'vue'
import App from './views/App.vue'
import Antd from 'ant-design-vue';
import VueBus from 'vue-bus'
import VueClipboard from 'vue-clipboard2'
import store from './store'
import router from './router';
import i18n from './i18n/index'
import * as filters from '@/filter/index';
import 'ant-design-vue/dist/antd.css';
import "./assets/css/commons.scss";
import "./assets/css/home.scss";
import './assets/css/index.scss';
import './assets/css/override.scss';
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import 'swiper/dist/css/swiper.css'
import "animate.css"

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(VueBus);
Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
