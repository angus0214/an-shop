<template>
  <v-app>
    <v-col class="pt-0">test</v-col>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      products: {
        data: [],
      },
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      const vm = this;
      this.$http.get(api).then((response) => {
        vm.products.data = response.data.products;
      });
    },
  },
  created() {
      this.getProducts();
  },
};
</script>
