<template>
  <div class="side-cart-wrap" :class="{ active: isActive }">
    <div class="side-cart">
      <div v-if="carts.length > 0">
        <div
          class="text-center pa-4 d-flex justify-center"
          style="background-color:#78909C;"
        >
          <div class="white--text text-h6 font-weight-bold mr-auto">
            我的購物車
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
                  數量
                </th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in carts" :key="index">
                <td class="pa-2">
                  <v-img
                    max-height="90"
                    max-width="90"
                    :src="product.product.imageUrl"
                  ></v-img>
                </td>
                <td>{{ product.product.title }}</td>
                <td>{{ product.product.price }}</td>
                <td>{{ product.qty }}</td>
                <td>
                  <v-btn icon color="black" @click="delCart(product.id)">
                    <v-icon size="16">mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-divider></v-divider>
        <div class="text-right pa-5" style="background-color:#ffffff">
          總計 : {{ totalPrice }}
        </div>
        <div class="py-2 px-2">
          <v-btn
            dark
            block
            depressed
            color="blue-grey lighten-1"
            to="/carts"
            @click="hide"
            >結帳去</v-btn
          >
        </div>
      </div>
      <div v-else class="d-flex flex-column px-6 justify-center h-100">
        <div class="text-h6 font-weight-bold mb-5">
          目前沒有任何商品唷
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
    carts: Array
  },
  computed: {
    totalPrice () {
      let total = 0
      this.carts.forEach(function (el) {
        const onePrice = el.product.price * el.qty
        total += onePrice
      })
      return total
    }
  },
  methods: {
    hide () {
      this.$emit('hideCart')
    },
    updateCarts () {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const vm = this
      this.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts
        console.log(vm.carts)
      })
    },
    delCart (id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      const vm = this
      this.$http.delete(api).then((response) => {
        console.log(response)
        vm.updateCarts()
      })
    }
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
