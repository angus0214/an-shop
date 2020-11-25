<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        :headers="products.dataHeaders"
        :items="products.data"
        :search="search"
      >
        <template v-slot:top>
          <v-card-title class="mb-4 font-weight-bold">
            Product
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="pt-0 mt-0 mr-12"
            ></v-text-field>

            <v-btn color="primary" @click="addProduct()">新增商品</v-btn>
          </v-card-title>
        </template>
        <template v-slot:item.edit="{ item }">          
            <v-icon color="success" @click="editProduct(item)">
              mdi-pencil
            </v-icon>      
            <v-icon color="danger" @click="delProduct(item)">
              mdi-delete
            </v-icon>   
        </template>
        <template v-slot:item.is_enabled="{ item }">
          <p v-if="item.is_enabled === 1" class="mb-0 success--text">Yes</p>
          <p v-else class="mb-0 danger--text">No</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: {
        dataHeaders: [
          {
            text: '品牌',
            align: 'start',
            value: 'category',
          },
          { text: '產品名稱', value: 'title' },
          { text: '售價', value: 'origin_price' },
          { text: '定價', value: 'price' },
          { text: '是否啟用', value: 'is_enabled', filterable: false },
          { text: '編輯', value: 'edit', filterable: false },
        ],
        data: [],
      },
      pagination: {},
      search: '',
      editDialog: false,
    };
  },
  methods: {
    consoleApi() {
      console.log(
        process.env.VUE_APP_API_PATH,
        process.env.VUE_APP_CUSTOM_PATH
      );
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`;
      const vm = this;
      //   console.log(api);
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.products.data = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    addProduct() {
      console.log('add');
    },
    editProduct(item) {
      console.log(item);
    },
    delProduct(item) {
      console.log(item);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
