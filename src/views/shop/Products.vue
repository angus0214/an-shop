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
                v-for="item in items"
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

                <v-list-item v-for="child in item.items" :key="child.title">
                  <v-list-item-content>
                    <v-list-item-title v-text="child.title">
                      <v-btn></v-btn>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-row>
            <v-col cols="4">
              <v-card>
                <v-img
                  height="200"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>
                <v-card-title>Cafe Badilico</v-card-title>
                <v-card-text>$556</v-card-text>
                <v-card-actions>
                  <v-btn color="deep-purple lighten-2" text @click="reserve">
                    詳細資訊
                  </v-btn>
                  <v-btn color="deep-purple lighten-2" text @click="reserve">
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
export default {
  data() {
    return {
      products: [],
      sidebar: [
        {
          text: '所有商品',
          icon: 'mdi-shopping',
        },
      ],
      items: [
        {
          action: 'mdi-ticket',
          active: true,
          items: [{ title: 'List Item' }],
          title: 'Attractions',
        },
        {
          action: 'mdi-silverware-fork-knife',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
          title: 'Dining',
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
