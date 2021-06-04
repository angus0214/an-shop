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
        <v-col sm="12" md="3">
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
                  @click="
                    focusMenuItem.type = item.type;
                    focusMenuItem.category = child.value;
                  "
                  class="menu_item"
                  :class="{ active: focusMenuItem.category === child.value }"
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
        <v-col sm="12" md="9">
          <v-row>
            <v-col
              sm="12"
              md="4"
              v-for="(item, index) in filterProducts"
              :key="index"
            >
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
                <v-card-text class="d-flex flex-wrap">
                  <v-chip
                    class="ma-1"
                    dark
                    color="blue-grey lighten-2"
                    v-for="(category, index) in item.description"
                    :key="index"
                    >{{ category }}</v-chip
                  >
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
      focusMenuItem: {
        type: 'products',
        category: 'all',
      },
      menuItems: [
        {
          action: 'mdi-ticket',
          active: true,
          items: [
            { title: '全部商品', value: 'all' },
            { title: '手錶', value: 'watches' },
            { title: '墨鏡', value: 'sunglasses' },
            { title: '戒指', value: 'ring' },
            { title: '項鍊', value: 'necklace' },
            { title: '耳環', value: 'earings' },
          ],
          type: 'products',
          title: '商品分類',
        },
        {
          action: 'mdi-silverware-fork-knife',
          items: [
            { title: 'Man', value: 'Man' },
            { title: 'Lady', value: 'Lady' },
            { title: 'Fashion', value: 'Fashion' },
            { title: 'Best Sell', value: 'Best Sell' },
            { title: 'Character', value: 'character' },
          ],
          type: 'tag',
          title: '標籤分類',
        },
      ],
    };
  },
  computed: {
    filterProducts() {
      const vm = this;
      let data = [];
      if (vm.focusMenuItem.type === 'products') {
        if (vm.focusMenuItem.category === 'all') {
          data = vm.products;
        } else {
          data = vm.products.filter(function(item) {
            return item.category === vm.focusMenuItem.category;
          });
        }
      } else if (vm.focusMenuItem.type === 'tag') {
        vm.products.forEach(function(el) {
          el.description.forEach(function(item) {
            if (item === vm.focusMenuItem.category) {
              data.push(el);
            }
          });
        });
        console.log(data);
      }
      return data;
    },
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
