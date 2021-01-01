import Vue from 'vue'
import App from './App.vue'
// vuetify
import vuetify from './plugins/vuetify';
// vue-router
import router from './router'
// vue axios for ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// vue-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)
// event bus
import './bus'
// filter
import dateFilter from './filters/date'
Vue.filter('date', dateFilter);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(api).then(response => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});