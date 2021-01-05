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
            <div class="bg banner-main">
              <v-col class="d-flex h-100" cols="4">
                <div class="banner-card d-flex justify-center  flex-column">
                  <h2>Watches</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta modi minima consequuntur nulla nostrum ducimus!
                    Expedita consequuntur officiis fugiat, voluptatum sint
                    magnam vel autem nihil, neque consequatur, dignissimos eum
                    inventore?
                  </p>
                  <v-btn max-width="100px">
                    More
                    <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="8" class="pt-0 pr-0">
            <div class="bg banner-left d-flex justify-end">
              <v-col class="d-flex h-100" cols="4">
                <div class="banner-card d-flex justify-center  flex-column">
                  <h2>Rings</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta modi minima consequuntur nulla nostrum ducimus!
                    Expedita consequuntur officiis fugiat, voluptatum sint
                    magnam vel autem nihil, neque consequatur, dignissimos eum
                    inventore?
                  </p>
                  <v-btn max-width="100px">
                    More
                    <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </div>
          </v-col>
          <v-col cols="4" class="pt-0">
            <v-hover v-slot="{ hover }">
              <div class="bg banner-sm-1">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex blue-grey darken-1 banner-hover"
                  >
                    <v-btn large>
                      More
                      <v-icon size="16px">mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="4" class="pt-0 pr-0">
            <v-hover v-slot="{ hover }">
              <div class="bg banner-sm-2">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex blue-grey darken-1 banner-hover"
                  >
                    <v-btn large>
                      More
                      <v-icon size="16px">mdi-arrow-right</v-icon>
                    </v-btn>
                  </div>
                </v-expand-transition>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="8" class="pt-0">
            <div class="bg banner-right">
              <v-col class="d-flex h-100" cols="4">
                <div class="banner-card d-flex justify-center  flex-column">
                  <h2>Galsses</h2>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta modi minima consequuntur nulla nostrum ducimus!
                    Expedita consequuntur officiis fugiat, voluptatum sint
                    magnam vel autem nihil, neque consequatur, dignissimos eum
                    inventore?
                  </p>
                  <v-btn max-width="100px">
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
              <v-btn>立即瀏覽更多商品</v-btn>
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
      <v-footer padless>
        <v-card flat tile width="100%" class="blue-grey darken-1 text-center">
          <v-card-text>
            <v-btn v-for="icon in footerIcons" :key="icon" class="mx-4" icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>Angus Wu</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-main>
  </v-app>
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
      footerIcons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
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
          active: false,
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
.banner-card {
}
.banner-hover {
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
</style>
