import Vue from 'vue'
import App from './App.vue'
// vuetify
import vuetify from './plugins/vuetify'
// vue-router
import router from './router'
// vue axios for ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
// vue-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.css'
// vee-validate vue-18n
import VeeValidate from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n'
// event bus
import './bus'
// filter
import dateFilter from './filters/date'
Vue.use(VueAxios, axios)
Vue.use(VueAwesomeSwiper)
swiper.use([Navigation, Pagination, Autoplay])
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'change|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})
Vue.filter('date', dateFilter)
axios.defaults.withCredentials = true

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})
