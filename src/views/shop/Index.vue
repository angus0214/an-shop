<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="bg banner-main">
          <v-col class="d-flex h-100" cols="12" sm="6" md="4">
            <div class="banner-card d-flex justify-center align-start ml-sm-16  flex-column">
              <div class="text-h3 font-weight-bold">Watches</div>
              <div class="my-3 text-subtitle-1 font-weight-bold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
                modi minima consequuntur nulla nostrum ducimus! Expedita
                consequuntur officiis fugiat, voluptatum sint magnam vel autem
                nihil, neque consequatur, dignissimos eum inventore?
              </div>
              <v-btn large color="blue-grey darken-1" dark @click="goProducts">
                Shop Now
                <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="banner-left d-flex justify-center align-center cursor-pointer bg"
        @click="goProducts"
      >
        <div class="text-h2 font-weight-bold banner-text">
          Bracelet
          <div class="banner-text-underline"></div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters style="overflow:hidden">
          <v-col
            cols="12"
            class="banner-right-top d-flex justify-center align-center cursor-pointer"
            :class="{ bgScale: hover.isHover && hover.index === 2 }"
            @mouseover="
              hover.isHover = true;
              hover.index = 2;
            "
            @mouseleave="hover.isHover = false"
            @click="goProducts"
          >
            <div
              class="text-h3 font-weight-bold banner-text"
              :class="{ hover: hover.isHover && hover.index === 2 }"
            >
              Glasses
              <div class="banner-text-underline"></div>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="banner-sm-1 bg d-flex justify-center align-center cursor-pointer position-relative"
            :class="{ bgScale: hover.isHover && hover.index === 3 }"
            @mouseover="
              hover.isHover = true;
              hover.index = 3;
            "
            @mouseleave="hover.isHover = false"
            @click="goProducts"
          >
            <div
              class="banner-overlay"
              :class="{ hover: hover.isHover && hover.index === 3 }"
            ></div>
            <div
              class="text-h3 font-weight-bold banner-text"
              :class="{ hover: hover.isHover && hover.index === 3 }"
            >
              Earring
              <div class="banner-text-underline"></div>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="banner-sm-2 bg d-flex justify-center align-center cursor-pointer"
            @click="goProducts"
          >
            <div
              class="text-h3 font-weight-bold banner-text deep-orange--text text--lighten-1"
            >
              Necklace
              <div class="banner-text-underline blue-grey"></div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex justify-center align-center flex-column banner-go-shop">
          <div class="text-h4 text-md-h3 font-weight-bold white--text mb-6">目前全館優惠活動中</div>
          <v-btn color="blue-grey" class="font-wight-bold text-h6" large dark @click="goProducts">立即瀏覽更多商品</v-btn>
        </div>
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
      hover: {
        isHover: false,
        index: -1,
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
    goProducts() {
      this.$router.push({ path: '/products' });
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
  height: calc(100vh - 56px);
}
.banner-left {
  background-position: center;
  background-image: url(../../assets/banner-left.jpg);
  height: 100vh;
  .banner-text {
    color: #5d4037;
    .banner-text-underline {
      background: #607d8b;
    }
  }
  .banner-text.hover {
    color: #eceff1;
    transition: all ease 1s;
    .banner-text-underline {
      width: 100%;
      background: #eceff1;
      transition: all ease 1s;
    }
  }
}
.banner-right-top {
  background-position: center center;
  background-size: cover;
  background-image: url(../../assets/banner-right.jpg);
  height: 50vh;
  transition: all ease 1s;
  .banner-text {
    color: #26a69a;
    .banner-text-underline {
      background: #607d8b;
    }
  }
  .banner-text.hover {
    color: #eceff1;
    transition: all ease 1s;
    .banner-text-underline {
      width: 100%;
      background: #eceff1;
      transition: all ease 1s;
    }
  }
}
.banner-sm-1 {
  background-image: url(../../assets/banner-sm-1.jpg);
  height: 50vh;
  transition: all ease 1s;
  overflow: hidden;
  .banner-text {
    color: #eceff1;
    .banner-text-underline {
      background: #b0bec5;
    }
  }
  .banner-text.hover {
    color: #26a69a;
    transition: all ease 1s;
    .banner-text-underline {
      width: 100%;
      background: #607d8b;
      transition: all ease 1s;
    }
  }
}
.banner-sm-2 {
  background-position: center;
  background-image: url(../../assets/banner-sm-2.jpg);
  height: 50vh;
}
.banner-go-shop {
  background-size: cover;
  background-position: center;
  -webkit-filter: grayscale(1);
  background-image: url(../../assets/banner-go-shop.jpg);
  padding: 80px 0;
}
.banner-text {
  position: relative;
  .banner-text-underline {
    position: absolute;
    width: 30px;
    height: 5px;
    transition: all ease 1s;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.bgScale {
  transform: scaleX(1.1);
  transition: all ease 1s;
}
.banner-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 1;
  transition: all ease 1s;
}
.banner-overlay.hover {
  opacity: 0;
  transition: all ease 1s;
}
.position-relative {
  position: relative;
}
</style>
