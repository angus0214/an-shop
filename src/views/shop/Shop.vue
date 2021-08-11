<template>
  <v-app>
    <Navbar></Navbar>
    <v-main>
      <Alert></Alert>
      <router-view></router-view>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>
<script>
import Navbar from '@/components/shop/Navbar.vue'
import Footer from '@/components/shop/Footer.vue'
import Alert from '@/components/AlertMessages'
export default {
  components: {
    Alert,
    Navbar,
    Footer
  }
}
</script>
