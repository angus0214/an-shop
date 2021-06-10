<template>
  <div class="side-cart-wrap" :class="{ active: isActive }">
    <div class="side-cart">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">
                品名
              </th>
              <th class="text-left">
                售價
              </th>
              <th class="text-left">
                數量
              </th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>name</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>總計 : $20000</div>
      <v-btn>結帳去</v-btn>
    </div>
    <div class="overlay" @click="hide"></div>
  </div>
</template>
<script>
export default {
  props: {
    isActive: Boolean,
  },
  computed: {
    sideCartActive() {
      return this.isActive;
    },
  },
  methods: {
    hide() {
      this.$emit('hideCart');
    },
    getCarts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      // const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
      });
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
<style lang="scss">
.side-cart-wrap {
  .side-cart {
    position: fixed;
    height: 100vh;
    width: 20%;
    right: 0;
    top: 0;
    background-color: #eceff1;
    z-index: 2000000;
    transform: translateX(100%);
    transition: all ease 0.7s;
  }
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    background-color: black;
    z-index: 2000;
    top: 0;
    display: none;
  }
}
.side-cart-wrap.active {
  .side-cart {
    transform: translateX(0);
    transition: all ease 0.7s;
  }
  .overlay {
    display: block;
  }
}
</style>
