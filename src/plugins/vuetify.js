import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
// import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        danger: colors.red.darken1 // #E53935
      },
      dark: {
        danger: colors.red.darken1
      }
    }
  }
})
