<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <router-view></router-view>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>
<script>
import Navbar from '../../components/shop/Navbar.vue';
import Footer from '../../components/shop/Footer.vue';
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
