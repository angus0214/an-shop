<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="pt-0">
        <div class="bg banner-main">
          <v-col class="d-flex h-100" cols="4">
            <div class="banner-card d-flex justify-center  flex-column">
              <h2>Watches</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
                modi minima consequuntur nulla nostrum ducimus! Expedita
                consequuntur officiis fugiat, voluptatum sint magnam vel autem
                nihil, neque consequatur, dignissimos eum inventore?
              </p>
              <v-btn max-width="100px" color="blue-grey darken-1" dark>
                More
                <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
      <v-col cols="8" sm="12" md="8" class="pt-0 pr-md-0">
        <div class="bg banner-left d-flex justify-end">
          <v-col class="d-flex h-100" cols="4">
            <div class="banner-card d-flex justify-center  flex-column">
              <h2>Rings</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
                modi minima consequuntur nulla nostrum ducimus! Expedita
                consequuntur officiis fugiat, voluptatum sint magnam vel autem
                nihil, neque consequatur, dignissimos eum inventore?
              </p>
              <v-btn max-width="100px" color="blue-grey darken-1" dark>
                More
                <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
      <v-col cols="4" sm="6" md="4" class="pt-0">
        <v-hover v-slot="{ hover }">
          <div class="bg banner-sm-1">
            <v-expand-transition>
              <div v-if="hover" class="d-flex blue-grey darken-1 banner-hover">
                <v-btn large>
                  More
                  <v-icon size="16px">mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </div>
        </v-hover>
      </v-col>
      <v-col cols="4" sm="6" md="4" class="pt-0 pr-md-0">
        <v-hover v-slot="{ hover }">
          <div class="bg banner-sm-2">
            <v-expand-transition>
              <div v-if="hover" class="d-flex blue-grey darken-1 banner-hover">
                <v-btn large>
                  More
                  <v-icon size="16px">mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </div>
        </v-hover>
      </v-col>
      <v-col cols="8" sm="12" md="8" class="pt-0">
        <div class="bg banner-right">
          <v-col class="d-flex h-100" cols="4">
            <div class="banner-card d-flex justify-center  flex-column">
              <h2>Galsses</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
                modi minima consequuntur nulla nostrum ducimus! Expedita
                consequuntur officiis fugiat, voluptatum sint magnam vel autem
                nihil, neque consequatur, dignissimos eum inventore?
              </p>
              <v-btn max-width="100px" color="blue-grey darken-1" dark>
                More
                <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center align-center  banner-go-shop">
          <v-btn color="blue-grey lighten-2" dark>立即瀏覽更多商品</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in products.data" :key="index"
            ><v-card class="mx-auto">
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle class="pb-0">
                Number 10
              </v-card-subtitle>
              <v-card-title>$ {{ item.price }}</v-card-title>
              <v-card-actions>
                <v-btn color="orange" text>
                  商品頁面
                </v-btn>
                <v-btn color="orange" text>
                  加入購物車
                </v-btn>
              </v-card-actions>
            </v-card></swiper-slide
          >
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
      },
      products: {
        data: [],
      },
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
<style lang="scss">
.h-100 {
  height: 100%;
}
.bg {
  background-size: cover;
  background-repeat: no-repeat;
}
.banner-main {
  background-position: right;
  background-image: url(../../assets/banner-main.jpg);
  height: 80vh;
  padding-left: 10%;
}
.banner-left {
  background-position: center;
  background-image: url(../../assets/banner-left.jpg);
  height: 60vh;
  padding-right: 10%;
}
.banner-right {
  background-position: bottom;
  background-image: url(../../assets/banner-right.jpg);
  height: 60vh;
  padding-left: 10%;
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
.banner-go-shop {
  background-size: cover;
  background-position: center;
  -webkit-filter: grayscale(1);
  background-image: url(../../assets/banner-go-shop.jpg);
  padding: 80px 0;
}
.banner-hover {
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
</style>
