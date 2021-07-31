<template>
  <div class="sidebar-wrap d-sm-none" :class="{ active: isActive }">
    <div
      class="pa-4 d-flex justify-space-between"
      style="background-color:#607D8B;"
    >
      <div class="text-center text-h5 font-weight-bold white--text">
        An-Shop
      </div>
      <v-btn icon>
        <v-icon large color="white" @click="hide">mdi-close</v-icon>
      </v-btn>
    </div>
    <v-list nav>
      <v-list-item-group v-model="selectedItem" color="blue-grey">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" @click="hide">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      selectedItem: 1,
      items: [
        { text: 'Home', icon: 'mdi-home', to: '/index' },
        { text: 'Products', icon: 'mdi-animation', to: '/products' },
        { text: 'Carts', icon: 'mdi-cart', to: '/carts' },
        { text: 'About', icon: 'mdi-information',to: '/about' },
      ],
    };
  },
  methods: {
    hide() {
      this.$emit('hideBar');
    },
  },
};
</script>
<style lang="scss">
.sidebar-wrap {
  position: fixed;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background-color: #eceff1;
  transform: translateY(-100%);
  z-index: 2000000;
  transition: all ease 0.7s;
}
.sidebar-wrap.active {
  transform: translateY(0);
  transition: all ease 0.7s;
}
</style>
