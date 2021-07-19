<template>
  <div>
    <v-img
      src="../../assets/banner-products.jpg"
      max-height="460"
      position="center 20%"
    >
    </v-img>
    <v-container id="menu-start">
      <v-row>
        <v-col cols="12" sm="12" md="3" style="position: relative;">
          <v-card class="mx-auto" style="position: sticky;top:15px;">
            <v-list>
              <v-list-group
                v-for="item in menuItems"
                :key="item.id"
                v-model="item.active"
                :prepend-icon="item.action"
                no-action
                color="blue-grey darken-1"
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
        <v-col cols="12" sm="12" md="9">
          <div v-if="filterProducts.length > 0">
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="(item, index) in filterProducts"
                :key="index"
                class="pt-0"
              >
                <v-card :disabled="loading.isLoading && index == loading.index">
                  <template slot="progress">
                    <v-progress-linear
                      color="blue-grey"
                      height="10"
                      indeterminate
                      bottom
                      absolute
                    ></v-progress-linear>
                  </template>
                  <v-img height="250" :src="item.imageUrl"></v-img>
                  <div class="d-flex justify-space-between align-center">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-btn
                      v-if="getInLocalStorage(item)"
                      icon
                      class="ma-2"
                      @click="delFav(item)"
                    >
                      <v-icon color="red">mdi-heart</v-icon>
                    </v-btn>
                    <v-btn v-else icon class="ma-2" @click="setFav(item)">
                      <v-icon color="red">mdi-heart-outline</v-icon>
                    </v-btn>
                  </div>
                  <v-card-text>$ {{ item.price }}</v-card-text>
                  <v-card-actions>
                    <DialogProduct :product="item"></DialogProduct>
                    <v-btn
                      :loading="loading.isLoading && index == loading.index"
                      color="deep-purple lighten-2"
                      text
                      @click="addToCart(item.id, 1, index)"
                    >
                      加入購物車
                    </v-btn>
                  </v-card-actions>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title>分類標籤</v-card-title>
                  <v-card-text class="d-flex flex-wrap">
                    <v-chip
                      class="ma-1"
                      dark
                      v-for="(category, index) in item.description"
                      :key="index"
                      color="blue-grey "
                      @click="
                        focusMenuItem.type = 'tag';
                        focusMenuItem.category = category;
                        menuItems[1].active = true;
                      "
                      >{{ category }}</v-chip
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-btn
        class="mx-2 d-md-none"
        fab
        dark
        fixed
        bottom
        right
        color="teal lighten-1"
        @click="goTop"
      >
        <v-icon dark large>
          mdi-chevron-up
        </v-icon>
      </v-btn>
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
          active: true,
          action: 'mdi-ticket',
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
      loading: {
        index: -1,
        isLoading: false,
      },
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
        // console.log(response.data);
        vm.products = response.data.products;
        vm.products.forEach(function(el) {
          el.loading = false;
        });
      });
    },
    addToCart(id, itemQty, index) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const vm = this;
      vm.loading.isLoading = true;
      vm.loading.index = index;
      vm.filterProducts[index].loading = true;
      this.$http
        .post(api, { data: { product_id: id, qty: itemQty } })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            vm.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增至購物車`,
              'success',
              'mdi-check-circle'
            );
            vm.loading.isLoading = false;
          } else {
            vm.$bus.$emit(
              'messsage:push',
              `${response.data.data.product.title}新增失敗`,
              'error',
              'mdi-alert-outline'
            );
            vm.loading.isLoading = false;
          }
        });
    },
    setFav(item) {
      let storageAry = [];
      if (localStorage.getItem('favProducts') === null) {
        localStorage.setItem('favProducts', JSON.stringify(storageAry));
      } else {
        storageAry = JSON.parse(localStorage.getItem('favProducts'));
      }
      storageAry.push(item);
      localStorage.setItem('favProducts', JSON.stringify(storageAry));
      this.$bus.$emit(
        'messsage:push',
        `${item.title} 新增至我的最愛`,
        'success',
        'mdi-check-circle'
      );
      this.getProducts();
    },
    delFav(item) {
      let storageAry = JSON.parse(localStorage.getItem('favProducts'));
      storageAry.forEach(function(el, index) {
        if (el.id === item.id) {
          storageAry.splice(index, 1);
        }
      });
      localStorage.setItem('favProducts', JSON.stringify(storageAry));
      this.$bus.$emit(
        'messsage:push',
        `${item.title} 從我的最愛移除`,
        'error',
        'mdi-alert-outline'
      );
      this.getProducts();
    },
    getInLocalStorage(item) {
      let storageAry = JSON.parse(localStorage.getItem('favProducts')) || [];
      let status = false;
      storageAry.forEach(function(el) {
        if (el.id === item.id) {
          status = true;
        }
      });
      return status;
    },
    goTop() {
      const el = document.getElementById('menu-start');
      el.scrollIntoView({ behavior: 'smooth' });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
<style lang="css">
.menu_item:before {
  background-color: #b0bec5;
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
  background-color: #cfd8dc;
}
</style>
