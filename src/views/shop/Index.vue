<template>
  <v-container  class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="bg banner-main">
          <v-col class="d-flex h-100" cols="12" sm="6" md="6">
            <div
              class="banner-card d-flex justify-center align-start pa-5 pa-sm-0 ml-sm-16  flex-column"
            >
              <div class="text-h3 font-weight-bold">An Shop 飾品選貨店</div>
              <div class="my-12 text-subtitle-1 font-weight-bold">
                本店產品皆由專人親自到國外選貨帶回，每一件品項都由我們用心挑選，幫助你找到最適合自己的飾品
              </div>
              <div class="mb-3 text-h6 font-weight-bold">
                立即用最獨一無二的飾品點綴您身上每一處細節
              </div>
              <v-btn large color="blue-grey darken-1" dark @click="goProducts">
                馬上選購
                <v-icon size="16px" class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </div>
      </v-col>
      <v-col cols="12">
        <div
          class="d-flex justify-center align-center flex-column banner-go-shop"
        >
          <div class="text-h4 text-md-h3 font-weight-bold white--text mb-6 pa-4 pa-sm-0">
            目前全館
            <span class="red--text text-h3 font-weight-bold">9折</span>
            優惠活動中
          </div>
          <v-btn
            color="blue-grey"
            class="font-wight-bold text-h6"
            large
            dark
            @click="goProducts"
            >立即瀏覽更多商品</v-btn
          >
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        style="overflow:hidden"
      >
      <div
        class="banner-left d-flex justify-center align-center cursor-pointer bg"
        :class="{ bgScale: hover.isHover && hover.index === 1 }"
        @mouseover="
          hover.isHover = true;
          hover.index = 1;
        "
        @mouseleave="hover.isHover = false"
        @click="goProducts"
        >
        <div
        class="text-h2 font-weight-bold banner-text"
        :class="{ hover: hover.isHover && hover.index === 1 }">
          Bracelet
          <div class="banner-text-underline"></div>
        </div>
      </div>

      </v-col>
      <v-col cols="12" md="6">
        <v-row no-gutters>
          <v-col
            cols="12"
            style="overflow:hidden"
          >
          <div
            class="banner-right-top d-flex justify-center align-center cursor-pointer"
            :class="{ bgScale: hover.isHover && hover.index === 2 }"
            @mouseover="
              hover.isHover = true;
              hover.index = 2;
            "
            @mouseleave="hover.isHover = false"
            @click="goProducts">
            <div
              class="text-h3 font-weight-bold banner-text"
              :class="{ hover: hover.isHover && hover.index === 2 }"
            >
              Glasses
              <div class="banner-text-underline"></div>
            </div>
          </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            style="overflow:hidden"
          >
          <div
            class="banner-sm-1 bg d-flex justify-center align-center cursor-pointer position-relative"
            :class="{ bgScale: hover.isHover && hover.index === 3 }"
            @mouseover="
              hover.isHover = true;
              hover.index = 3;
            "
            @mouseleave="hover.isHover = false"
            @click="goProducts">
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
          </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            style="overflow:hidden"
          >
          <div
            class="banner-sm-2 bg d-flex justify-center align-center cursor-pointer"
            :class="{ bgScale: hover.isHover && hover.index === 4 }"
            @mouseover="
              hover.isHover = true;
              hover.index = 4;
            "
            @mouseleave="hover.isHover = false"
            @click="goProducts"
            >
            <div
              class="text-h3 font-weight-bold banner-text"
              :class="{ hover: hover.isHover && hover.index === 4 }"
            >
              Necklace
              <div
                class="banner-text-underline"
                :class="{ hover: hover.isHover && hover.index === 4 }">
              </div>
            </div>
          </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters> </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }
      },
      products: {
        data: []
      },
      hover: {
        isHover: false,
        index: -1
      }
    }
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`
      vm.$http.get(api).then((response) => {
        vm.products.data = response.data.products
      })
    },
    goProducts () {
      this.$router.push({ path: '/products' })
    }
  },
  created () {
    this.getProducts()
  }
}
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
  transition: all ease 1s;
  .banner-text {
    color: #5d4037;
    .banner-text-underline {
      background: #607d8b;
    }
  }
  .banner-text.hover {
    color: #607d8b;
    transition: all ease 1s;
    .banner-text-underline {
      width: 100%;
      background: #5d4037;
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
  transition: all ease 1s;
   .banner-text {
    color: #FB8C00;
    .banner-text-underline {
      background: #607D8B;
    }
  }
  .banner-text.hover {
    color: #607D8B;
    transition: all ease 1s;
    .banner-text-underline {
      width: 100%;
      background: #FB8C00;
      transition: all ease 1s;
    }
  }
}
.banner-go-shop {
  background-attachment: fixed;
  background-position: center;
  background-image: url(../../assets/banner-go-shop.jpg);
  padding: 80px 0;
  will-change : transform;
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
  transform: scale(1.1);
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
