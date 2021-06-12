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
                  <v-card flat class="my-6" width="80%">
                    <v-divider></v-divider>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left"></th>
                            <th class="text-left text-h6 font-weight-bold">
                              品名
                            </th>
                            <th class="text-left text-h6 font-weight-bold">
                              售價
                            </th>
                            <th class="text-left text-h6 font-weight-bold">
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
                            <td>
                              <v-btn-toggle active-class="none">
                                <v-btn text>
                                  <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                                <v-btn text>
                                  {{ product.qty }}
                                </v-btn>
                                <v-btn text @click="countQty(product.qty)">
                                  <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                              </v-btn-toggle>
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
                      <v-col cols="6">
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
                            outlined
                            append-outer-icon="mdi-send"
                            placeholder="輸入優惠碼"
                          >
                          </v-text-field>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <v-row>
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >總計金額</v-col
                          >
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >$ 10000</v-col
                          >
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >優惠折抵</v-col
                          >
                          <v-col cols="6" class="text-right text-subtitle-2"
                            >-$ 10999</v-col
                          >
                          <v-col
                            cols="6"
                            class="text-right text-subtitle-1 blue-grey--text"
                            >應付金額</v-col
                          >
                          <v-col
                            cols="6"
                            class="text-right text-subtitle-1 blue-grey--text"
                            >$ 100000</v-col
                          >
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
                </div>
              </v-stepper-content>
              <v-stepper-content step="2">
                <div class="d-flex justify-center">
                  <v-card flat width="80%">
                    <v-form>
                      <v-row>
                        <v-col cols="6">
                          <div
                            class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                          >
                            收件人姓名
                          </div>
                          <v-text-field
                            outlined
                            dense
                            append-icon="mdi-account"
                            color="blue-grey lighten-2"
                            hint="請確認輸入姓名與身分證上一致"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <div
                            class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                          >
                            收件人電話
                          </div>
                          <v-text-field
                            outlined
                            dense
                            append-icon="mdi-phone"
                            color="blue-grey lighten-2"
                            hint="屆時貨運人員會以此號碼聯絡取貨"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <div
                            class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                          >
                            Email
                          </div>
                          <v-text-field
                            outlined
                            dense
                            append-icon="mdi-email"
                            color="blue-grey lighten-2"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6"
                          ><div
                            class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                          >
                            收件地址
                          </div>
                          <v-text-field
                            outlined
                            dense
                            append-icon="mdi-map-marker"
                            color="blue-grey lighten-2"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <div
                            class="font-weight-bold blue-grey--text text-subtitle-1 mb-1"
                          >
                            備註
                          </div>
                          <v-textarea
                            outlined
                            color="blue-grey lighten-2"
                            name="input-7-4"
                          ></v-textarea
                        ></v-col>
                      </v-row>
                    </v-form>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between mt-4">
                      <v-btn
                        depressed
                        color="blue-grey lighten-5"
                        @click="stepEl = 1"
                        >返回</v-btn
                      >
                      <v-btn
                        dark
                        depressed
                        color="blue-grey lighten-1"
                        @click="stepEl = 3"
                        >下一步</v-btn
                      >
                    </div>
                  </v-card>
                </div>
              </v-stepper-content>
              <v-stepper-content step="3">
                <div class="d-flex justify-center">
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
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
                      <v-col cols="6">訂購人</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人電話</v-col
                      >
                      <v-col cols="6">0931000566</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人 Email</v-col
                      >
                      <v-col cols="6">google@gmail.com</v-col>
                      <v-col cols="6" class="pl-7 font-weight-bold"
                        >訂購人地址</v-col
                      >
                      <v-col cols="6">XXX</v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <div class="d-flex justify-space-between mt-4">
                      <v-btn
                        depressed
                        color="blue-grey lighten-5"
                        @click="stepEl = 1"
                        >修改資料</v-btn
                      >
                      <v-btn
                        dark
                        depressed
                        color="blue-grey lighten-1"
                        @click="stepEl = 3"
                        >確認付款</v-btn
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
export default {
  data() {
    return {
      stepEl: 3,
      carts: [],
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts;
      });
    },
    countQty(item) {
      item = item + 1;
      console.log(item);
    },
  },
  created() {
    this.getCarts();
  },
};
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
</style>
