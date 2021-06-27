<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            AN - Shop 後台管理系統
          </v-list-item-title>
          <v-list-item-subtitle>
            user001
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-sm-body-2">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line style="position: absolute;bottom: 0;">
          <v-switch
            v-model="$vuetify.theme.dark"
            inset
            label="Theme Changer"
          ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>AN - Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style="background-color:#CFD8DC">
      <v-container>
        <Alert></Alert>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Alert from '../components/AlertMessages';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      drawer: 'true',
      navItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          link: '/admin/dashboard',
        },
        {
          title: 'Products',
          icon: 'mdi-folder-multiple',
          link: '/admin/products',
        },
        { title: 'Coupons', icon: 'mdi-ticket', link: '/admin/coupons' },
        { title: 'Orders', icon: 'mdi-clipboard-list', link: '/admin/orders' },
      ],
    };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    console.log('my cookie', token);
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>
