<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        :headers="orders.dataHeaders"
        :items="orders.data"
        :search="search"
        :loading="loading.dataTable"
        :expanded.sync="expanded"
        loading-text="資料載入中... 請稍等"
        show-expand
      >
        <!-- Table Header -->
        <template v-slot:top>
          <v-card-title class="mb-4 font-weight-bold">
            Orders
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="pt-0 mt-0 mr-12"
            ></v-text-field>
          </v-card-title>
        </template>
        <template v-slot:item.create_at="{ item }">
          {{ item.create_at | date }}
        </template>
        <template v-slot:item.user.email="{ item }">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          {{ item.user.email }}
        </template>
        <template v-slot:item.products="{ item }">
          <div
            class="my-1"
            v-for="(product, index) in item.products"
            :key="index"
          >
            {{ product.product.title }} : {{ product.qty }}
            {{ product.product.unit }}
          </div>
        </template>
        <template v-slot:item.is_paid="{ item }">
          <p v-if="item.is_paid == 1" class="mb-0 success--text">Yes</p>
          <p v-else class="mb-0 danger--text">No</p>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-0" elevation="0">
            <div
              class="pa-3 font-weight-bold"
              style="background-color: #EEEEEE;"
            >
              訂單詳細資訊
            </div>
            <v-simple-table
              dense
              class="rounded-0"
              style="background-color: #EEEEEE;"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      產品名稱
                    </th>
                    <th class="text-left">
                      數量
                    </th>
                    <th class="text-left">
                      產品售價
                    </th>
                    <th class="text-left">
                      總計金額
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(products, index) in item.products" :key="index">
                    <td>{{ products.product.title }}</td>
                    <td>{{ products.qty }} {{ products.product.unit }}</td>
                    <td>{{ products.product.price }} 元</td>
                    <td>{{ products.final_total }} 元</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: {
        dataHeaders: [
          { text: '', value: 'data-table-expand' },
          {
            text: '購買時間',
            align: 'start',
            value: 'create_at',
          },
          { text: '購買人 Email', value: 'user.email' },
          { text: '購買款項', value: 'products', sortable: false },
          { text: '應付金額', value: 'total' },
          { text: '是否付款', value: 'is_paid', filterable: false },
        ],
        data: [],
        total_pages: '',
      },
      expanded: [],
      dialog:{
        userInfo:false,
      },
      loading: {
        dataTable: false,
      },
      search: '',
    };
  },
  methods: {
    getAllOrders() {
      const vm = this;
      vm.orders.data = [];
      vm.loading.dataTable = true;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=1`;
      this.$http.get(api).then((response) => {
        vm.orders.total_pages = response.data.pagination.total_pages;
        for (let i = 1; i <= vm.orders.total_pages; i++) {
          this.getOrders(i);
        }
        vm.loading.dataTable = false;
      });
    },
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.orders.data = vm.orders.data.concat(response.data.orders);
      });
    },
  },
  created() {
    this.getAllOrders();
  },
};
</script>
<style>
.v-data-table
  > .v-data-table__wrapper
  tbody
  tr.v-data-table__expanded__content {
  box-shadow: none;
}
</style>
