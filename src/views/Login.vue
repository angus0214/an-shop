<template>
  <v-app class="bg">
    <v-container>
      <h1 class="text-center white--text py-6">AN - Shop</h1>
      <v-card width="374" class="mx-auto">
        <v-tabs grow hide-slider active-class="v-tab-active">
          <v-tab>User</v-tab>
          <v-tab>Manager</v-tab>
        </v-tabs>
        <v-card-title class="justify-center">Login</v-card-title>
        <v-form>
          <v-card-text>
            <v-text-field
              label="Account"
              prepend-inner-icon="mdi-account"
              solo
              required
            ></v-text-field>
            <v-text-field
              type="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              solo
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success">
              Sign In
            </v-btn>
          </v-card-actions>
          <v-card-actions class="mb-2">
            <v-btn block color="warning">
              Go Shop
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card></v-container
    >
  </v-app>
</template>
<style lang="scss" scope>
.v-tab-active {
  background-color: #1976d2;
  color: #ffffff !important;
  transition: all 0.5s ease-out;
}
.v-application--wrap {
  background-image: url(../assets/login_bg.jpg);
  background-position: center center;
  background-size: cover;
}
</style>
