<template>
  <v-app class="bg">
    <v-container>
      <h1 class="text-center white--text py-6">AN - Shop</h1>
      <v-card width="374" class="mx-auto" :loading="loading">
        <template slot="progress">
          <v-progress-linear
            color="primary"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-tabs
          grow
          hide-slider
          active-class="v-tab-active"
          v-model="selectTab"
        >
          <v-tab>User</v-tab>
          <v-tab>Manager</v-tab>
        </v-tabs>
        <v-card-title class="justify-center">Login</v-card-title>
        <v-form>
          <v-card-text>
            <v-text-field
              v-model="user.username"
              label="Account"
              prepend-inner-icon="mdi-account"
              solo
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              type="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              solo
              required
            ></v-text-field>
            <v-card-text class="py-0 text-center red--text" v-if="loginError">
              登入失敗 !
            </v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success" @click="signin">
              Sign In
            </v-btn>
          </v-card-actions>
          <v-card-actions class="mb-2">
            <v-btn block color="warning">
              Go Shop
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>
<style lang="scss">
.v-tab-active {
  background-color: #1976d2;
  color: #ffffff !important;
  transition: all 0.5s ease-out;
}
.bg .v-application--wrap {
  background-image: url(../assets/login_bg.jpg);
  background-position: center center;
  background-size: cover;
}
</style>
<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      selectTab: 0,
      loading: false,
      loginError: false
    }
  },
  methods: {
    con () {
      console.log(this.selectTab)
    },
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`
      vm.loginError = false
      vm.loading = true
      this.$http.post(api, vm.user).then((response) => {
        // console.log(response.data);
        if (response.data.success === true) {
          const token = response.data.token
          const expired = response.data.expired
          // console.log(token,expired)
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          if (vm.selectTab === 0) {
            vm.$router.push('/shop')
          } else {
            vm.$router.push('/admin')
          }
        } else {
          // console.log(response.data);
          vm.loginError = true
        }
        vm.loading = false
      })
    }
  }
}
</script>
