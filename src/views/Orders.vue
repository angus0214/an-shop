<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        :headers="orders.dataHeaders"
        :items="orders.data"
        :search="search"
        :loading="loading.dataTable"
        loading-text="資料載入中... 請稍等"
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
      loading:{
          dataTable:false,
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
