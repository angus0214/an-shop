<template>
  <div class="side-cart-wrap" :class="{ active: isActive }">
    <div class="side-cart">
      <div v-if="products.length > 0">
        <div
          class="text-center pa-4 d-flex justify-center"
          style="background-color:#78909C;"
        >
          <div class="white--text text-h6 font-weight-bold mr-auto">
            我的最愛
          </div>
          <v-icon large class="white--text d-sm-none" @click="hide"
            >mdi-close</v-icon
          >
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">
                  品名
                </th>
                <th class="text-left">
                  售價
                </th>
                <th class="text-left">
                  加入購物車
                </th>
                <th class="text-left">
                  刪除
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td class="pa-2">
                  <v-img
                    max-height="90"
                    max-width="90"
                    :src="product.imageUrl"
                  ></v-img>
                </td>
                <td>{{ product.title }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <v-btn color="blue-grey" depressed class="white--text" :disabled="isLoading !== -1" :loading="isLoading === product.id"  @click="addToCart(product.id,1)">
                    加入購物車
                  </v-btn>
                </td>
                <td>
                  <v-btn icon color="black" :disabled="isLoading !== -1" @click="delFav(product)">
                    <v-icon size="16">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
      </div>
      <div v-else class="d-flex flex-column px-6 justify-center h-100">
        <div class="text-h6 font-weight-bold mb-5">
          我的最愛目前沒有任何商品唷
        </div>
        <v-btn dark depressed color="blue-grey lighten-1" @click="hide"
          >前往購物</v-btn
        >
      </div>
    </div>
    <div class="overlay" @click="hide"></div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    products: Array
  },
  data () {
    return {
      carts: [],
      isLoading: -1
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.carts.forEach((el) => {
        const onePrice = el.product.price * el.qty
        total += onePrice
      })
      return total
    }
  },
  methods: {
    hide () {
      this.$emit('hideFavList')
    },
    getProducts () {
      this.$emit('getFavList')
    },
    delFav (item) {
      const storageAry = JSON.parse(localStorage.getItem('favProducts'))
      storageAry.forEach((el, index) => {
        if (el.id === item.id) {
          storageAry.splice(index, 1)
        }
      })
      localStorage.setItem('favProducts', JSON.stringify(storageAry))
      this.getProducts()
    },
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts
      })
    },
    delCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      vm.$http.delete(api).then(() => {
      })
    },
    addToCart (id, itemQty) {
      const vm = this
      vm.carts.forEach((el) => {
        if (el.product.id === id) {
          vm.delCart(el.id)
          itemQty = itemQty + el.qty
        }
      })
      vm.isLoading = id
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
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
            vm.getCarts()
          } else {
            vm.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增失敗`,
              'error',
              'mdi-alert-outline'
            )
          }
          vm.isLoading = -1
        })
    }
  },
  created () {
    this.getCarts()
  }
}
</script>

<style lang="scss">
.side-cart-wrap {
  .side-cart {
    position: fixed;
    height: 100vh;
    max-height: 100vh;
    overflow-y: scroll;
    right: 0;
    top: 0;
    background-color: #eceff1;
    z-index: 2000000;
    transform: translateX(100%);
    transition: all ease 0.7s;
  }
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    background-color: black;
    z-index: 2000;
    top: 0;
    display: none;
  }
}
.side-cart-wrap.active {
  .side-cart {
    transform: translateX(0);
    transition: all ease 0.7s;
  }
  .overlay {
    display: block;
  }
}
@media screen and (max-width: 600px) {
  .side-cart {
    width: 100vw;
  }
}
.h-100 {
  height: 100%;
}
</style>
