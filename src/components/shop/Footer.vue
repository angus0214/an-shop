<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="blue-grey darken-1 text-center">
      <v-card-text>
        <v-btn v-for="icon in footerIcons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Angus Wu</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data () {
    return {
      footerIcons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
    }
  }
}
</script>
