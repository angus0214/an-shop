<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        v-if="orders"
        :headers="orders.dataHeaders"
        :items="orders.data"
        :search="search"
        :loading="loading.dataTable"
        :expanded.sync="expanded"
        mobile-breakpoint="0"
        loading-text="資料載入中... 請稍等"
        show-expand
      >
        <!-- Table Header -->
        <template v-slot:top>
          <div class="pa-3 d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Orders</div>
            <div class="d-none d-sm-block">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
          </div>
          <div class="d-sm-none px-3 mb-6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </div>

          <!-- userInfo Dialog -->
          <v-dialog v-model="dialog.userInfo" max-width="400px">
            <v-card>
              <v-card-title class="headline">
                購買人詳細資訊
              </v-card-title>
              <v-card-text>
                <v-icon class="pr-2">
                  mdi-account
                </v-icon>
                {{ orders.tempUser.name }}
              </v-card-text>
              <v-card-text>
                <v-icon class="pr-2">
                  mdi-email
                </v-icon>
                {{ orders.tempUser.email }}
              </v-card-text>
              <v-card-text>
                <v-icon class="pr-2">
                  mdi-home
                </v-icon>
                {{ orders.tempUser.address }}
              </v-card-text>
              <v-card-text>
                <v-icon class="pr-2">
                  mdi-phone
                </v-icon>
                {{ orders.tempUser.tel }}
              </v-card-text>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.create_at="{ item }">
          {{ item.create_at | date }}
        </template>
        <template v-slot:item.user.email="{ item }">
          <div class="d-flex align-center">
            <v-btn color="primary" icon @click="openUserInfoDialog(item)">
              <v-icon>mdi-account-box</v-icon>
            </v-btn>
            <div v-if="item.user">{{ item.user.email }}</div>
          </div>
        </template>
        <template v-slot:item.products="{ item }">
          
          <div style="max-height:100px;overflow-y: hidden;">
            <div
              class="my-1"
              v-for="(product, index) in item.products"
              :key="index"
            >
              {{ product.product.title }} : {{ product.qty }}
            </div>
          </div>
          <div v-if="getObjLength(item) > 3" class="font-weight-bold">...</div>
        </template>
        <template v-slot:item.is_paid="{ item }">
          <p v-if="item.is_paid == 1" class="mb-0 success--text">Yes</p>
          <p v-else class="mb-0 danger--text">No</p>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-btn icon color="success" @click="openEditDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="px-0" elevation="0">
            <div class="pa-3 font-weight-bold">
              訂單詳細資訊
            </div>
            <v-simple-table dense class="rounded-0">
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
    <v-dialog
      v-model="editDialog"
      max-width="650px"
      v-if="orders.tempOrder.user"
    >
      <v-card>
        <v-card-title style="background-color: blue;">
          <span class="headline white--text">編輯訂單</span>
        </v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">訂購人資料</v-col>
            <v-col cols="6" class="pa-3"
              ><v-text-field
                label="訂購人姓名"
                v-model="orders.tempOrder.user.name"
              ></v-text-field
            ></v-col>
            <v-col cols="6" class="pa-3"
              ><v-text-field
                label="訂購人 E-mail"
                v-model="orders.tempOrder.user.email"
              ></v-text-field
            ></v-col>
            <v-col cols="6" class="pa-3"
              ><v-text-field
                label="訂購人電話"
                v-model="orders.tempOrder.user.tel"
              ></v-text-field
            ></v-col>
            <v-col cols="6" class="pa-3"
              ><v-text-field
                label="訂購人地址"
                v-model="orders.tempOrder.user.address"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-checkbox
                label="是否付款"
                v-model="orders.tempOrder.is_paid"
              ></v-checkbox>
            </v-col>
            <v-btn @click="updateOrder">確認</v-btn>
          </v-row></v-container
        >
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editDialog: false,
      orders: {
        dataHeaders: [
          { text: '', value: 'data-table-expand' },
          {
            text: '購買時間',
            align: 'start',
            value: 'create_at',
          },
          { text: '購買人 Email', value: 'user.email' },
          { text: '購買品項', value: 'products', sortable: false },
          { text: '應付金額', value: 'total' },
          { text: '是否付款', value: 'is_paid', filterable: false },
          { text: '編輯', value: 'edit', sortable: false },
        ],
        data: [],
        total_pages: '',
        tempUser: {},
        tempOrder: {},
      },
      expanded: [],
      dialog: {
        userInfo: false,
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
    updateOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/order/${vm.orders.tempOrder.id}`;
      this.$http.put(api, { data: vm.orders.tempOrder }).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit(
            'messsage:push',
            response.data.message,
            'success',
            'mdi-check-circle'
          );
        } else {
          vm.$bus.$emit(
            'messsage:push',
            response.data.message,
            'danger',
            'mdi-alert-outline'
          );
        }
        vm.getAllOrders();
        vm.editDialog = false;
      });
    },
    openUserInfoDialog(item) {
      const vm = this;
      vm.orders.tempUser = Object.assign({}, item.user);
      console.log(vm.orders.tempUser);
      vm.dialog.userInfo = true;
    },
    openEditDialog(item) {
      const vm = this;
      vm.orders.tempOrder = Object.assign({}, item);
      console.log(vm.orders.tempOrder);
      vm.editDialog = true;
    },
    getObjLength(item) {
      console.log(item);
      let length = 0;
      if (Object.prototype.hasOwnProperty.call(item, 'products')) {
        length = Object.keys(item.products).length;
      }
      console.log(length);
      return length;
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
