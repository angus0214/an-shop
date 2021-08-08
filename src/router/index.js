import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import Products from '../views/Products.vue'
import Coupons from '../views/Coupons.vue'
import Orders from '../views/Orders.vue'
import Dashboard from '../views/Dashboard.vue'
// shop
import Shop from '../views/shop/Shop.vue'
import ShopIndex from '../views/shop/Index.vue'
import ShopProducts from '../views/shop/Products.vue'
import ShopCarts from '../views/shop/Carts.vue'
import ShopAbout from '../views/shop/About.vue'
import ShopProduct from '../views/shop/ProductInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/dashboard',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    name: 'Shop',
    component: Shop,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'ShopIndex',
        component: ShopIndex
      },
      {
        path: 'products',
        name: 'ShopProducts',
        component: ShopProducts
      },
      {
        path: 'carts',
        name: 'ShopCarts',
        component: ShopCarts
      },
      {
        path: 'about',
        name: 'About',
        component: ShopAbout
      },
      {
        path: 'product/:id',
        name: 'product',
        component: ShopProduct
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
