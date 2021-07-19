<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar flat dark color="blue-grey darken-1" class=" px-2 px-sm-8">
      <v-icon class="mr-4 d-none d-sm-block">mdi-store</v-icon>
      <v-icon class="mr-4  d-sm-none" @click="sideBarActive = true"
        >mdi-menu</v-icon
      >
      <v-toolbar-title>An - Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-for="(item, index) in nav"
        :key="index"
        class="d-none d-sm-block"
      >
        <v-btn
          color="blue-grey darken-1"
          depressed
          :to="item.to"
          :title="item.title"
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
      <v-btn icon class="ml-10" @click="getFavList">
        <v-icon color="red darken-1">mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="getCarts">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-toolbar>
    <SideCart
      :carts="carts"
      :isActive="sideCartActive"
      @hideCart="hideSideCart"
    ></SideCart>
    <SideBar :isActive="sideBarActive" @hideBar="hideSideBar"></SideBar>
    <FavList :isActive="favListActive" @hideFavList="hideFavList" @getFavList="getFavList" :products="favList"></FavList>
  </v-card>
</template>
<script>
import SideCart from './SideCart';
import SideBar from './SideBar';
import FavList from './FavList';
export default {
  components: {
    SideCart,
    SideBar,
    FavList,
  },
  data() {
    return {
      nav: [
        {
          text: 'Home',
          title: 'Back to Home page',
          active: true,
          to: '/index',
        },
        {
          text: 'Shop',
          title: 'Go to Shopping',
          active: false,
          to: '/products',
        },
        {
          text: 'About',
          title: 'Back to Home page',
          active: false,
        },
      ],
      carts: [],
      favList: [],
      sideCartActive: false,
      sideBarActive: false,
      favListActive: false,
    };
  },
  methods: {
    hideSideCart() {
      this.sideCartActive = false;
    },
    hideSideBar() {
      this.sideBarActive = false;
    },
    hideFavList() {
      this.favListActive = false;
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts;
        vm.sideCartActive = true;
      });
    },
    getFavList() {
      let storageAry = JSON.parse(localStorage.getItem('favProducts')) || [];
      this.favList = storageAry;
      this.favListActive = true;
    },
  },
};
</script>
