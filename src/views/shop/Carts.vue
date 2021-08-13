<template>
  <div>
    <v-img
      src="../../assets/banner-products.jpg"
      max-height="260"
      position="center 20%"
    >
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="stepEl">
            <v-stepper-header class="px-9">
              <v-stepper-step
                step="1"
                :complete="stepEl > 1"
                color="blue-grey lighten-1"
              >
                確認商品
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                step="2"
                color="blue-grey lighten-1"
                :complete="stepEl > 2"
              >
                填寫資料
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step
                step="3"
                color="blue-grey lighten-1"
                :complete="stepEl > 3"
              >
                完成訂購
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <div class="d-flex justify-center">
                  <v-card flat class="my-6" width="80%" v-if="carts.length > 0" :disabled="loading">
                    <v-divider></v-divider>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left  d-none d-sm-table-cell"></th>
                            <th
                              class="text-left text-body-1 text-sm-h6 font-weight-bold"
                            >
                              品名
                            </th>
                            <th
                              class="text-left text-body-1 text-sm-h6 font-weight-bold"
                            >
                              售價
                            </th>
                            <th
                              class="text-left text-body-1 text-sm-h6 font-weight-bold"
                            >
                              數量
                            </th>
                            <th class="text-left"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(product, index) in carts" :key="index">
                            <td class="pa-2 d-none d-sm-table-cell">
                              <v-img
                                max-height="90"
                                max-width="90"
                                :src="product.product.imageUrl"
                              ></v-img>
                            </td>
                            <td>{{ product.product.title }}</td>
                            <td>{{ product.product.price }}</td>
                            <td>
                              <v-text-field
                                readonly
                                color="blue-grey"
                                style="max-width:100px;text-align:center"
                                v-model="product.qty"
                                prepend-icon="mdi-minus"
                                append-outer-icon="mdi-plus"
                                @click:prepend="updateCart(product,'minus')"
                                @click:append-outer="updateCart(product,'plus')"
                                class="text-center cart-input"
                              ></v-text-field>
                            </td>
                            <td>
                              <v-btn
                                icon
                                color="black"
                                @click="delCart(product.id)"
                              >
                                <v-icon size="16">mdi-close</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-divider></v-divider>
                    <v-row class="mt-5">
                      <v-col cols="12" sm="12" md="6">
                        <div
                          class="rounded pa-3 coupon-tip blue-grey--text text--darken-2 mb-4"
                        >
                          現在輸入優惠碼 「AnShop2021」 即可享有 9 折優惠
                        </div>
                        <div>
                          <v-text-field
                            type="text"
                            color="blue-grey"
                            dense
                            solo
                            append-outer-icon="mdi-send"
                            placeholder="輸入優惠碼"
                            v-model="couponCode"
                            hide-details
                            @click:append-outer="useCoupon"
                            class="mb-2"
                          >
                          </v-text-field>
                          <span :class="couponHint.color" class="text-caption">{{couponHint.text}}</span>
                        </div>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-row>
                          <v-col
                            cols="6"
                            class="text-sm-left text-md-right text-subtitle-2"
                            >總計金額</v-col
                          >
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >$ {{ totalPrice }}</v-col
                          >
                          <v-col
                            cols="6"
                            class="text-sm-left text-md-right text-subtitle-2"
                            >優惠折抵</v-col
                          >
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >-$ {{ discount }}</v-col
                          >
                          <v-col
                            cols="6"
                            class="text-sm-left text-md-right text-subtitle-1 blue-grey--text"
                            >應付金額</v-col
                          >
                          <v-col
                            cols="6"
                            class="text-right text-subtitle-1 blue-grey--text"
                          >
                            <div v-if="final_total_price != 0">
                              $ {{ final_total_price }}
                            </div>
                            <div v-else>$ {{ totalPrice }}</div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between mt-4">
                      <v-btn
                        depressed
                        color="blue-grey lighten-5"
                        to="/products"
                        >繼續購物</v-btn
                      >
                      <v-btn
                        dark
                        depressed
                        color="blue-grey lighten-1"
                        @click="stepEl = 2"
                        >下一步</v-btn
                      >
                    </div>
                  </v-card>
                  <v-card flat class="my-6" width="80%" v-else>
                    <div
                      class="text-center blue-grey--text font-weight-bold text-h5 mb-3"
                    >
                      目前購物車沒有任何商品
                    </div>
                    <div class="d-flex justify-center">
                      <v-btn
                        dark
                        depressed
                        color="blue-grey lighten-1"
                        to="/products"
                        >前往選購</v-btn
                      >
                    </div>
                  </v-card>
                </div>
              </v-stepper-content>
              <v-stepper-content step="2">
                <div class="d-flex justify-center">
                  <v-card flat width="80%">
                    <ValidationObserver v-slot="{ valid }">
                      <v-form @submit.prevent="submit">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <div
                              class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                            >
                              收件人姓名
                            </div>
                            <validation-provider
                              v-slot="{ errors }"
                              name="姓名欄位"
                              rules="required"
                            >
                              <v-text-field
                                solo
                                dense
                                :error-messages="errors"
                                append-icon="mdi-account"
                                color="blue-grey lighten-2"
                                hint="請確認輸入姓名與身分證上一致"
                                v-model="user.name"
                              >
                              </v-text-field
                            ></validation-provider>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div
                              class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                            >
                              收件人電話
                            </div>
                            <validation-provider
                              v-slot="{ errors }"
                              name="電話號碼"
                              rules="required|numeric|min:10"
                            >
                              <v-text-field
                                solo
                                dense
                                :error-messages="errors"
                                append-icon="mdi-phone"
                                color="blue-grey lighten-2"
                                hint="屆時貨運人員會以此號碼聯絡取貨"
                                v-model="user.tel"
                              ></v-text-field
                            ></validation-provider>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <div
                              class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                            >
                              Email
                            </div>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Email"
                              rules="required|email"
                            >
                              <v-text-field
                                solo
                                dense
                                append-icon="mdi-email"
                                :error-messages="errors"
                                color="blue-grey lighten-2"
                                v-model="user.email"
                              ></v-text-field
                            ></validation-provider>
                          </v-col>
                          <v-col cols="12" sm="6"
                            ><div
                              class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                            >
                              收件地址
                            </div>
                            <validation-provider
                              v-slot="{ errors }"
                              name="地址"
                              rules="required"
                            >
                              <v-text-field
                                solo
                                dense
                                append-icon="mdi-map-marker"
                                :error-messages="errors"
                                color="blue-grey lighten-2"
                                v-model="user.address"
                              ></v-text-field
                            ></validation-provider>
                          </v-col>
                          <v-col cols="12">
                            <div
                              class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                            >
                              備註
                            </div>
                            <v-textarea
                              solo
                              color="blue-grey lighten-2"
                              name="input-7-4"
                              v-model="message"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <div class="d-flex justify-space-between">
                              <v-btn
                                @click="stepEl = 1"
                                depressed
                                color="blue-grey lighten-5"
                                >返回購物車
                              </v-btn>
                              <v-btn
                                :disabled="!valid"
                                depressed
                                class="white--text"
                                color="blue-grey lighten-1"
                                @click="createOrder"
                                >下一步
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-form>
                    </ValidationObserver>
                  </v-card>
                </div>
              </v-stepper-content>
              <v-stepper-content step="3">
                <div
                  class="d-flex justify-center"
                  v-if="order.products.length > 0"
                >
                  <v-card flat width="80%">
                    <v-expansion-panels class="mb-5">
                      <v-expansion-panel>
                        <v-expansion-panel-header
                          color="blue-grey lighten-4"
                          class="font-weight-bold blue-grey--text text--darken-4"
                        >
                          詳細訂單內容
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="py-2">
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th
                                    class="text-left d-none d-sm-table-cell"
                                  ></th>
                                  <th
                                    class="text-left text-h6 font-weight-bold"
                                  >
                                    品名
                                  </th>
                                  <th
                                    class="text-left text-h6 font-weight-bold"
                                  >
                                    售價
                                  </th>
                                  <th
                                    class="text-left text-h6 font-weight-bold"
                                  >
                                    數量
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(product, index) in order.products"
                                  :key="index"
                                >
                                  <td class="pa-2  d-none d-sm-table-cell">
                                    <v-img
                                      max-height="90"
                                      max-width="90"
                                      :src="product.product.imageUrl"
                                    ></v-img>
                                  </td>
                                  <td>{{ product.product.title }}</td>
                                  <td>{{ product.product.price }}</td>
                                  <td>{{ product.qty }}</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-divider></v-divider>

                    <div
                      class="pl-4 text-h5 blue-grey--text text--darken-2 font-weight-bold my-4"
                    >
                      訂購人資訊
                    </div>

                    <v-row>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人姓名</v-col
                      >
                      <v-col cols="6">{{ order.user.name }}</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人電話</v-col
                      >
                      <v-col cols="6">{{ order.user.tel }}</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人 Email</v-col
                      >
                      <v-col cols="6">{{ order.user.email }}</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人地址</v-col
                      >
                      <v-col cols="6">{{ order.user.address }}</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >總計金額</v-col
                      >
                      <v-col cols="6">{{ order.total }}</v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <div class="d-flex justify-end mt-4">
                      <v-btn
                        dark
                        depressed
                        color="blue-grey lighten-1"
                        @click="pay"
                        >確認付款</v-btn
                      >
                    </div>
                  </v-card>
                </div>
              </v-stepper-content>
              <v-stepper-content step="4">
                <div class="d-flex justify-center">
                  <v-card flat width="80%">
                    <div
                      class="text-center text-h5 font-weight-bold blue-grey--text mb-3"
                    >
                      {{ orderMsg.title }}
                    </div>
                    <div class="text-center mb-3">{{ orderMsg.message }}</div>
                    <div class="d-flex justify-center">
                      <v-btn
                        depresse
                        dark
                        color="blue-grey lighten-1"
                        to="/products"
                        >繼續選購</v-btn
                      >
                    </div>
                  </v-card>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      stepEl: 1,
      carts: [],
      couponCode: '',
      final_total_price: 0,
      user: {},
      message: '',
      order: {
        user: {},
        products: [],
        create_at: '',
        total: 0,
        id: ''
      },
      orderMsg: {
        title: '完成訂購',
        message: '感謝您訂購 An-Shop 產品'
      },
      loading: false,
      couponHint: {
        color: '',
        text: ''
      }
    }
  },
  methods: {
    submit (status) {
      console.log(status)
    },
    getCarts () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      vm.loading = true
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts.sort((a, b) => {
          return a.product.price - b.product.price
        })
        vm.loading = false
      })
    },
    updateCart (item, type) {
      const vm = this
      let newQty = 0
      console.log(item.qty)
      if (type === 'plus') {
        newQty = item.qty + 1
      } else {
        if (item.qty === 1) {
          return
        } else {
          newQty = item.qty - 1
        }
      }
      vm.loading = true
      vm.delCart(item.id)
      const newID = item.product.id
      console.log(newQty, newID)
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      vm.$http
        .post(api, { data: { product_id: newID, qty: newQty } })
        .then((response) => {
          vm.getCarts()
        })
    },
    useCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
      vm.loading = true
      vm.$http
        .post(api, { data: { code: vm.couponCode } })
        .then((response) => {
          if (response.data.success) {
            vm.final_total_price = response.data.data.final_total
            vm.couponHint.text = '優惠券已成功套用'
            vm.couponHint.color = 'green--text'
          } else {
            vm.couponHint.text = '找不到此優惠券'
            vm.couponHint.color = 'red--text'
          }
          vm.loading = false
        })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`
      vm.$http
        .post(api, { data: { user: vm.user }, message: vm.message })
        .then((response) => {
          if (response.data.success) {
            vm.getOrder(response.data.orderId)
            vm.stepEl = 3
          }
        })
    },
    getOrder (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${id}`
      vm.$http.get(api).then((response) => {
        vm.order.user = response.data.order.user
        vm.order.id = response.data.order.id
        vm.order.create_at = response.data.order.create_at
        vm.order.total = response.data.order.total
        for (const el in response.data.order.products) {
          vm.order.products.push(response.data.order.products[el])
        }
      })
    },
    pay () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.order.id}`
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.orderMsg.title = '完成訂購'
          vm.orderMsg.message = '感謝您訂購 An-Shop 產品'
        } else {
          vm.orderMsg.title = '訂購失敗'
          vm.orderMsg.message = '很抱歉，訂單出錯，麻煩您重新選購商品'
        }
        vm.stepEl = 4
      })
    },
    delCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
      vm.$http.delete(api).then((response) => {
        vm.getCarts()
      })
    },
    countQty (id) {
      const vm = this
      vm.carts.forEach((el) => {
        if (el.id === id) {
          el.qty += 1
        }
      })
    }
  },
  computed: {
    totalPrice () {
      let price = 0
      this.carts.forEach((el) => {
        const onePrice = el.product.price * el.qty
        price += onePrice
      })
      return price
    },
    discount () {
      const vm = this
      let dc = ''
      if (vm.final_total_price === 0) {
        dc = 0
      } else {
        dc = vm.totalPrice - vm.final_total_price
      }
      return dc
    }
  },
  created () {
    this.getCarts()
  }
}
</script>
<style>
.v-stepper__header {
  box-shadow: none !important;
}
.coupon-tip {
  background-color: #cfd8dc;
  position: relative;
}
.coupon-tip::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  left: 1px;
  top: 0;
  background-color: #78909c;
}
.cart-input input[type="text"]{
  text-align: center!important;
}
@media screen and (max-width: 600px) {
  .v-data-table__wrapper table {
    width: 100%;
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
