<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar flat dark color="blue-grey darken-1" class="px-8">
      <v-icon class="mr-4">mdi-store</v-icon>
      <v-toolbar-title>An - Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="(item, index) in nav" :key="index">
        <v-btn
          color="blue-grey darken-1"
          depressed
          :to="item.to"
          :title="item.title"
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
      <v-btn icon class="ml-10" @click="sideCartActive = true">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <SideCart :isActive="sideCartActive" @hideCart="hideSideCart"></SideCart>
  </v-card>
</template>
<script>
import SideCart from './SideCart';
export default {
  components: {
    SideCart,
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
        },
        {
          text: 'About',
          title: 'Back to Home page',
          active: false,
        },
      ],
      sideCartActive:false,
    };
  },
  methods:{
    hideSideCart(){
      this.sideCartActive = false;
    }
  }
};
</script>
