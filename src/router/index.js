import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import Products from '../views/Products.vue';
import Coupons from '../views/Coupons.vue';
import Orders from '../views/Orders.vue';
Vue.use(VueRouter);

const routes = [
  // {
  //   path:'*',
  //   redirect:'login'
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
      }
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
