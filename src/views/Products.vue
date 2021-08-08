<template>
  <div>
    <v-card class="mt-8">
      <v-data-table
        :headers="products.dataHeaders"
        :items="products.data"
        :search="search"
        :loading="loading.dataTable"
        mobile-breakpoint="0"
        loading-text="資料載入中... 請稍等"
      >
        <template v-slot:top>
          <div class="pa-3 d-flex justify-space-between align-center">
            <div class="text-h4 font-weight-bold">Product</div>
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
            <v-dialog v-model="editDialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="products.isNew = true"
                >
                  新增產品
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
                  <span class="headline">新增產品</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="3">
                        <v-row>
                          <v-col cols="12">
                            <v-img
                              lazy-src="https://picsum.photos/id/11/10/6"
                              max-height="150"
                              max-width="250"
                              :src="products.tempProduct.imageUrl"
                            >
                            </v-img>
                            <label
                              for="btn-file"
                              class="d-block text-center primary white--text py-2 my-2 rounded-lg"
                              style="cursor: pointer;"
                            >
                              上傳圖片
                            </label>
                            <input
                              type="file"
                              ref="files"
                              @change="uploadFile"
                              placeholder=""
                              id="btn-file"
                              class="d-none"
                            />
                            <p class="text-center mb-2">OR</p>
                            <v-text-field
                              dense
                              outlined
                              label="圖片連結"
                              class="mt-0"
                              v-model="products.tempProduct.imageUrl"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="9">
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="產品名稱"
                              v-model="products.tempProduct.title"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="品牌"
                              v-model="products.tempProduct.category"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              label="單位"
                              v-model="products.tempProduct.unit"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="原價"
                              v-model="products.tempProduct.origin_price"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="售價"
                              v-model="products.tempProduct.price"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-autocomplete
                              :items="[
                                'Man',
                                'Lady',
                                'Fashion',
                                'Best Sell',
                                'character',
                              ]"
                              label="Hashtag"
                              v-model="products.tempProduct.description"
                              multiple
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              no-resize
                              label="產品描述"
                              hint="An-Shop"
                              v-model="products.tempProduct.content"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-checkbox
                              v-model="products.tempProduct.is_enabled"
                              true-value="1"
                              false-value="0"
                              label="啟用"
                            ></v-checkbox
                          ></v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeEditDialog">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="updateProduct">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <v-spacer></v-spacer>
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
          <v-dialog v-model="delDialog" max-width="500px">
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
                >是否刪除以下商品</v-card-title
              >
              <v-card-title
                >{{ products.delItem.category }} -
                {{ products.delItem.title }}</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelDialog"
                  >Cancel</v-btn
                >
                <v-btn color="danger" text @click="delProduct">Delete</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.edit="{ item }">
          <v-icon
            color="success"
            @click="
              openEditDialog(item);
              products.isNew = false;
            "
          >
            mdi-pencil
          </v-icon>
          <v-icon color="danger" @click="openDelDialog(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:item.is_enabled="{ item }">
          <p v-if="item.is_enabled == 1" class="mb-0 success--text">Yes</p>
          <p v-else class="mb-0 danger--text">No</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      products: {
        dataHeaders: [
          {
            text: '品牌',
            align: 'start',
            value: 'category'
          },
          { text: '產品名稱', value: 'title' },
          { text: '售價', value: 'origin_price' },
          { text: '定價', value: 'price' },
          { text: '是否啟用', value: 'is_enabled', filterable: false },
          { text: '編輯', value: 'edit', filterable: false }
        ],
        data: [],
        tempProduct: {},
        delItem: {},
        isNew: false
      },
      loading: {
        dataTable: false,
        card: false,
        delete: false
      },
      search: '',
      editDialog: false,
      delDialog: false
    }
  },
  methods: {
    // 向 Sever 取得產品資料
    getProducts () {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`
      const vm = this
      vm.loading.dataTable = true
      vm.$http.get(api).then((response) => {
        vm.products.data = response.data.products
        vm.pagination = response.data.pagination
        vm.loading.dataTable = false
      })
    },
    // 新增編輯產品
    updateProduct () {
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`
      let httpMethod = 'post'
      let alertMessage = '新增'
      const vm = this
      vm.loading.card = true
      if (!vm.products.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.products.tempProduct.id}`
        httpMethod = 'put'
        alertMessage = '編輯'
      }
      vm.$http[httpMethod](api, { data: vm.products.tempProduct }).then(
        (response) => {
          if (response.data.success) {
            vm.$bus.$emit(
              'messsage:push',
              `產品${alertMessage}成功`,
              'success',
              'mdi-check-circle'
            )
          } else {
            vm.$bus.$emit(
              'messsage:push',
              `產品${alertMessage}失敗`,
              'danger',
              'mdi-alert-outline'
            )
          }
          vm.getProducts()
          vm.closeEditDialog()
          vm.loading.card = false
        }
      )
    },
    // 圖片上傳
    uploadFile () {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.data.success) {
            vm.$set(
              vm.products.tempProduct,
              'imageUrl',
              response.data.imageUrl
            )
          }
        })
    },
    // 刪除產品
    delProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.products.delItem.id}`
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit(
            'messsage:push',
            response.data.message,
            'success',
            'mdi-check-circle'
          )
        } else {
          vm.$bus.$emit(
            'messsage:push',
            response.data.message,
            'danger',
            'mdi-alert-outline'
          )
        }
        vm.getProducts()
        vm.closeDelDialog()
      })
    },
    // 編輯 Modal
    openEditDialog (item) {
      const vm = this
      vm.products.tempProduct = Object.assign({}, item)
      vm.editDialog = true
    },
    closeEditDialog () {
      const vm = this
      vm.products.tempProduct = {}
      vm.editDialog = false
    },
    // 刪除 Modal
    openDelDialog (item) {
      const vm = this
      vm.products.delItem = Object.assign({}, item)
      vm.delDialog = true
    },
    closeDelDialog () {
      const vm = this
      vm.products.delItem = {}
      vm.delDialog = false
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
<style lang="scss">
@media screen and (max-width: 600px) {
  .v-data-footer__pagination {
    display: none;
  }
}
</style>
