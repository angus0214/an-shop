import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';
import Products from '../views/Products.vue';
import Coupons from '../views/Coupons.vue';
import Orders from '../views/Orders.vue';
import Dashboard from '../views/Dashboard.vue';
// shop
import Shop from '../views/shop/Shop.vue';
import ShopIndex from '../views/shop/Index.vue';
import ShopProducts from '../views/shop/Products.vue';
import ShopCarts from '../views/shop/Carts.vue';
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
    path: '/admin',
    name: 'Admin',
    component: Admin,
    // meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
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
      },
    ],
  },
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    redirect:'/index',
    children:[
      {
        path: 'index',
        name: 'ShopIndex',
        component: ShopIndex,
      },
      {
        path: 'products',
        name: 'ShopProducts',
        component: ShopProducts,
      },
      {
        path: 'carts',
        name: 'ShopCarts',
        component: ShopCarts,
      }
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
