<template>
  <div>
    <v-img
      src="../../assets/banner-products.jpg"
      max-height="460"
      position="center 20%"
    >
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="mx-auto">
            <v-list>
              <v-list-group
                v-for="item in menuItems"
                :key="item.title"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="child in item.items"
                  :key="child.title"
                  @click="focusMenuItem = child.value"
                  class="menu_item"
                  :class="{ active: focusMenuItem === child.value }"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-text="child.title"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="4" v-for="(item, index) in products" :key="index">
              <v-card>
                <v-img height="250" :src="item.imageUrl"></v-img>
                <v-card-title>{{ item.title }}</v-card-title>
                <v-card-text>$ {{ item.price }}</v-card-text>
                <v-card-actions>
                  <DialogProduct :product="item"></DialogProduct>
                  <v-btn color="deep-purple lighten-2" text>
                    加入購物車
                  </v-btn>
                </v-card-actions>
                <v-divider class="mx-4"></v-divider>
                <v-card-title>分類標籤</v-card-title>
                <v-card-text>
                  <v-chip-group column>
                    <v-chip dark color="blue-grey lighten-2">5:30PM</v-chip>
                    <v-chip dark color="blue-grey lighten-2">7:30P</v-chip>
                    <v-chip dark color="blue-grey lighten-2">8:00PM</v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import DialogProduct from '../../components/shop/DialogProduct.vue';
export default {
  components: {
    DialogProduct,
  },
  data() {
    return {
      products: [],
      focusMenuItem: 'all',
      menuItems: [
        {
          action: 'mdi-ticket',
          active: true,
          items: [
            { title: '手錶', value: 'watches' },
            { title: '墨鏡', value: 'sunglasses' },
            { title: '戒指', value: 'rings' },
            { title: '項鍊', value: 'neck' },
            { title: '耳環', value: 'earrings' },
          ],
          title: '商品分類',
        },
        {
          action: 'mdi-silverware-fork-knife',
          items: [
            { title: 'Man', value: 'Man' },
            { title: 'Lady', value: 'Lady' },
            { title: 'Fashion', value: 'Fashion' },
            { title: 'Best Sell', value: 'Best Sell' },
            { title: 'Character', value: 'Character' },
          ],
          title: '標籤分類',
        },
      ],
    };
  },
  methods: {
    // 取得所有商品資料
    getProducts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
<style lang="css">
.menu_item:before {
  background-color: #007aff;
  bottom: 0;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.menu_item.active {
  background-color: #bbdefb;
}
</style>
