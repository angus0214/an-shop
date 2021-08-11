<template>
  <v-app>
    <Navbar />
    <v-main>
      <Alert />
      <router-view />
      <Footer />
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
