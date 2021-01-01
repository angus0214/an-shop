<template>
  <v-app id="inspire">
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
        <v-btn icon class="ml-10">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" class="pt-0">
            <div class="bg banner-main"></div>
          </v-col>
          <v-col cols="8" class="pt-0 pr-0">
            <div class="bg banner-left"></div>
          </v-col>
          <v-col cols="4" class="pt-0">
            <div class="bg banner-sm-1"></div>
          </v-col>
          <v-col cols="4" class="pt-0 pr-0">
            <div class="bg banner-sm-2"></div>
          </v-col>
          <v-col cols="8" class="pt-0">
            <div class="bg banner-right"></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12"> </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      products: {
        data: [],
      },
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
          active: true,
        },
      ],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.products.data = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
<style>
.bg {
  background-size: cover;
  background-repeat: no-repeat;
}
.banner-main {
  background-position: right;
  background-image: url(../../assets/banner-main.jpg);
  height: 80vh;
}
.banner-left {
  background-position: center;
  background-image: url(../../assets/banner-left.jpg);
  height: 60vh;
}
.banner-right {
  background-position: bottom;
  background-image: url(../../assets/banner-right.jpg);
  height: 60vh;
}
.banner-sm-1 {
  background-position: center;
  background-image: url(../../assets/banner-sm-1.jpg);
  height: 60vh;
}
.banner-sm-2 {
  background-position: center;
  background-image: url(../../assets/banner-sm-2.jpg);
  height: 60vh;
}
</style>
