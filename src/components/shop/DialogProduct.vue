<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="80%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" text>
          詳細資訊
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 blue-grey darken-1 white--text">
          {{ product.title }}
        </v-card-title>
        <div class="d-flex flex-wrap">
          <v-col cols="12" sm="6">
            <v-img max-height="500"  :src="product.imageUrl"> </v-img>
          </v-col>
          <v-col cols="12" sm="6">
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
                :items="selectItems"
                label="請選擇數量"
                v-model="tempQty"
              ></v-select>
            </div>
            <div>
              <v-btn
                depressed
                dark
                color="blue-grey lighten-1"
                class="mr-3"
                :loading="loading"
                @click="addToCart"
                >加入購物車</v-btn
              >
              <v-btn depressed @click="dialog = false">繼續購物</v-btn>
            </div>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    product: {},
  },
  data() {
    return {
      dialog: false,
      selectItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tempQty: 1,
      loading: false,
    };
  },
  methods: {
    addToCart() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.loading = true;
      this.$http
        .post(api, { data: { product_id: vm.product.id, qty: vm.tempQty } })
        .then((response) => {
          if (response.data.success) {
            this.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增至購物車`,
              'success',
              'mdi-check-circle'
            );
            vm.loading = false;
          } else {
            this.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增失敗`,
              'danger',
              'mdi-alert-outline'
            );
            vm.loading = false;
          }
        });
    },
  },
};
</script>
