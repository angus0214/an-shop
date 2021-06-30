<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        :headers="coupons.dataHeaders"
        :items="coupons.data"
        :search="search"
        :loading="loading.dataTable"
        mobile-breakpoint="0"
        loading-text="資料載入中... 請稍等"
      >
        <template v-slot:top>
          <div class="pa-3 d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Coupons</div>
            <div class="d-none d-sm-block">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </div>
            <!-- edit dialog -->
            <v-dialog v-model="dialog.editDialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  @click="openEditDialog({}, true)"
                >
                  新增優惠券
                </v-btn>
              </template>
              <v-card :loading="loading.card" :disabled="loading.card">
                <template slot="progress">
                  <v-progress-linear
                    color="primary"
                    height="6"
                    indeterminate
                    absolute
                    bottom
                  ></v-progress-linear>
                </template>
                <v-card-title>
                  <span class="headline" v-if="coupons.isNew">新增優惠券</span>
                  <span class="headline" v-else>編輯優惠券</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            label="優惠券名稱"
                            v-model="coupons.tempCoupon.title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            label="優惠券代碼"
                            v-model="coupons.tempCoupon.code"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu
                            ref="menu"
                            v-model="datePicker"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="coupons.due_date"
                                label="到期日"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="coupons.due_date"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.menu.save(coupons.tempCoupon.due_date)
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            label="折扣百分比 ( 直接填入數字 )"
                            v-model="coupons.tempCoupon.percent"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox
                            v-model="coupons.tempCoupon.is_enabled"
                            true-value="1"
                            false-value="0"
                            label="啟用"
                          ></v-checkbox
                        ></v-col>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeEditDialog">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="updateCoupon">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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

          <!-- del dialog -->
          <v-dialog v-model="dialog.delDialog" max-width="500px">
            <v-card :loading="loading.delete" :disabled="loading.delete">
              <template slot="progress">
                <v-progress-linear
                  color="danger"
                  height="6"
                  indeterminate
                  absolute
                  bottom
                ></v-progress-linear>
              </template>
              <v-card-title class="headline text-center white--text danger"
                >是否刪除以下優惠券</v-card-title
              >
              <v-card-title> {{ coupons.tempCoupon.title }} </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelDialog()"
                  >Cancel</v-btn
                >
                <v-btn color="danger" text @click="deleteCoupon">Delete</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.percent="{ item }">
          {{ item.percent }}%
        </template>
        <template v-slot:item.due_date="{ item }">
          {{ item.due_date | date }}
        </template>
        <template v-slot:item.edit="{ item }">
          <v-icon
            color="success"
            @click="
              openEditDialog(item);
              coupons.isNew = false;
            "
          >
            mdi-pencil
          </v-icon>
          <v-icon color="danger" @click="openDelDialog(item, false)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: {
        dataHeaders: [
          {
            text: '名稱',
            align: 'start',
            value: 'title',
          },
          { text: '折扣代碼', value: 'code' },
          { text: '折扣百分比(%)', value: 'percent' },
          { text: '到期日', value: 'due_date' },
          { text: '編輯', value: 'edit', filterable: false, sortable: false },
        ],
        data: [],
        due_date: '',
        tempCoupon: {},
        isNew: false,
        total_pages: '',
      },
      loading: {
        dataTable: false,
        card: false,
        delete: false,
      },
      search: '',
      date: new Date().toISOString().substr(0, 10),
      datePicker: false,
      dialog: {
        editDialog: false,
        delDialog: false,
      },
    };
  },
  watch: {
    'coupons.due_date': function() {
      const vm = this;
      const timestamp = new Date(vm.coupons.due_date).getTime() / 1000;
      vm.coupons.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getAllCoupons() {
      const vm = this;
      vm.coupons.data = [];
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=1`;
      vm.loading.dataTable = true;
      this.$http.get(api).then((response) => {
        vm.coupons.total_pages = response.data.pagination.total_pages;
        for (let i = 1; i <= vm.coupons.total_pages; i++) {
          this.getCoupons(i);
        }
        vm.loading.dataTable = false;
      });
    },
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      this.$http.get(api).then((response) => {
        vm.coupons.data = vm.coupons.data.concat(response.data.coupons);
      });
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      let httpMethod = 'post';
      let alertMessage = '新增';
      const vm = this;
      vm.loading.card = true;
      if (!vm.coupons.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.coupons.tempCoupon.id}`;
        httpMethod = 'put';
        alertMessage = '編輯';
      }
      this.$http[httpMethod](api, { data: vm.coupons.tempCoupon }).then(
        (response) => {
          if (response.data.success) {
            // console.log(response.data);
            vm.$bus.$emit(
              'messsage:push',
              `優惠券${alertMessage}成功`,
              'success',
              'mdi-check-circle'
            );
          } else {
            // console.log(response.data);
            vm.$bus.$emit(
              'messsage:push',
              `優惠券${alertMessage}失敗`,
              'danger',
              'mdi-alert-outline'
            );
          }
          this.getAllCoupons();
          this.closeEditDialog();
          vm.loading.card = false;
        }
      );
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.coupons.tempCoupon.id}`;
      vm.loading.delete = true;
      this.$http.delete(api).then((response) => {
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
        console.log(response.data);
        this.getAllCoupons();
        this.closeDelDialog();
        vm.loading.delete = false;
      });
    },
    openEditDialog(item, isNew) {
      const vm = this;
      vm.coupons.isNew = isNew;
      if (vm.coupons.isNew) {
        vm.coupons.due_date = new Date()
          .toLocaleDateString()
          .replace(/\//g, '-');
        vm.coupons.tempCoupon = Object.assign({}, {});
      } else {
        vm.coupons.tempCoupon = Object.assign({}, item);
        const dateAndTime = new Date(vm.coupons.tempCoupon.due_date * 1000)
          .toLocaleDateString()
          .replace(/\//g, '-');
        vm.coupons.due_date = dateAndTime;
      }
      vm.dialog.editDialog = true;
    },
    closeEditDialog() {
      const vm = this;
      vm.dialog.editDialog = false;
    },
    openDelDialog(item) {
      const vm = this;
      vm.coupons.tempCoupon = Object.assign({}, item);
      vm.dialog.delDialog = true;
    },
    closeDelDialog() {
      const vm = this;
      vm.dialog.delDialog = false;
    },
  },
  created() {
    this.getAllCoupons();
  },
};
</script>
