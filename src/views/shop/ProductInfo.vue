<template>
  <v-container>
    <div v-if="dataLoaded" id="menu-start">
      <v-row>
        <v-col cols="12" sm="6" class="d-flex justify-center">
          <img :src="product.imageUrl" style="width:400px;height:450px;object-fit:cover">
        </v-col>
        <v-col cols="12" sm="6" class="pa-4">
          <div class="text-h4 font-weight-bold mb-2">{{ product.title }}</div>
          <v-chip-group class="mb-6">
            <v-chip
              small
              class="mr-1"
              dark
              color="blue-grey lighten-2"
              v-for="(category, index) in product.description"
              :key="index"
              >{{ category }}</v-chip
            ></v-chip-group
          >
          <div class="text-subtitle-2 grey--text  text--darken-2">
            建議售價
          </div>
          <v-divider></v-divider>
          <div class="d-flex py-3">
            <div
              class="text-h6 text-decoration-line-through grey--text mr-3 darken-2"
            >
              NT${{ product.origin_price }}
            </div>
            <div class="text-h6 blue-grey--text  text--darken-1">
              NT${{ product.price }}
            </div>
          </div>

          <v-divider></v-divider>
          <div class="mt-6">
            <v-select
              dense
              outlined
              label="請選擇數量"
              :items="selectItems"
              v-model="tempQty"
            ></v-select>
          </div>
          <div class="mb-3">
            <v-btn
              depressed
              dark
              color="blue-grey lighten-1"
              class="mr-3"
              @click="addToCart(product.id, tempQty)"
              :loading="loading.isLoading && loading.index === -2"
              >加入購物車</v-btn
            >
            <v-btn depressed to="/products">繼續購物</v-btn>
          </div>
          <v-divider></v-divider>
          <div class="mt-3">
            <div class="text-h5 font-weight-bold mb-2">注意事項</div>
            <div>{{ product.content }}</div>
          </div>
        </v-col>
        <v-col cols="12" class="my-4">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="12">
          <div class="font-weight-bold text-h6">猜你也喜歡</div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, index) in likeProducts"
          :key="index"
          class="pt-0"
        >
          <v-card
            :disabled="loading.isLoading && index == loading.index"
            :ripple="false"
            @click.native ="
              $router.push({ name: 'product', params: { id: item.id } })
            "
            class="cursor-pointer"
          >
            <v-img height="200" contain :src="item.imageUrl"></v-img>
            <div class="d-flex justify-space-between align-center">
              <v-card-title class="font-weight-bold">{{ item.title }}</v-card-title>
            </div>
            <v-card-text>$ {{ item.price }}</v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="teal darken-2"
                @click.stop="
                  $router.push({ name: 'product', params: { id: item.id } })
                "
              >
                <v-icon class="ma-1">mdi-chat-outline</v-icon>
                商品頁面
              </v-btn>
              <v-btn
                :loading="loading.isLoading && index == loading.index"
                color="brown"
                text
                class="font-weight-bold"
                @click.stop="addToCart(item.id, 1, index)"
              >
                <v-icon class="mr-1">mdi-cart-outline</v-icon>
                加入購物車
              </v-btn>
            </v-card-actions>
            <v-divider class="mx-4"></v-divider>
            <v-card-title class="text-body-1">分類標籤</v-card-title>
            <v-card-text class="d-flex flex-wrap">
              <v-chip
                class="ma-1"
                dark
                small
                v-for="(category, index) in item.description"
                :key="index"
                color="blue-grey "
                >{{ category }}</v-chip
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>此產品頁面不存在</div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      products: [],
      dataLoaded: false,
      selectItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tempQty: 1,
      loading: {
        isLoading: false,
        index: -1
      }
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${this.$route.params.id}`
      vm.$http.get(api).then((response) => {
        if (response.data.success === false) {
          vm.dataLoaded = false
        } else {
          vm.product = response.data.product
          vm.dataLoaded = true
        }
      })
    },
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
      })
    },
    addToCart (id, itemQty, index = -2) {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      vm.loading.isLoading = true
      vm.loading.index = index
      vm.$http
        .post(api, { data: { product_id: id, qty: itemQty } })
        .then((response) => {
          if (response.data.success) {
            vm.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增至購物車`,
              'success',
              'mdi-check-circle'
            )
          } else {
            vm.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增失敗`,
              'error',
              'mdi-alert-outline'
            )
          }
          vm.loading.isLoading = false
          vm.loading.index = -2
        })
    },
    goTop () {
      const el = document.getElementById('menu-start')
      el.scrollIntoView({ behavior: 'smooth' })
    }
  },
  watch: {
    $route () {
      if (this.$route.params.id) {
        this.getProduct()
        this.getProducts()
        this.goTop()
      }
    }
  },
  computed: {
    likeProducts () {
      const vm = this
      const ary = []
      if (vm.products !== 0) {
        vm.products.forEach((el) => {
          if (el.category === vm.product.category && el.id !== vm.product.id) {
            if (ary.length < 3) {
              ary.push(el)
            }
          }
        })
      }
      return ary
    }
  },
  created () {
    this.getProduct()
    this.getProducts()
  }
}
</script>
