<template>
  <div>
    <v-img
      src="../../assets/banner-products.jpg"
      max-height="260"
      position="center 20%"
    >
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-stepper v-model="stepEl">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="stepEl > 1">
                確認商品
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="stepEl > 2">
                填寫資料
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3" :complete="stepEl > 3">
                完成訂購
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card color="grey lighten-1" class="mb-12" height="200px"
                  >111111</v-card
                >
                <v-btn color="primary" @click="stepEl = 2">
                  Continue
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="grey lighten-1" class="mb-12" height="200px"
                  >22222</v-card
                >
                <v-btn color="primary" @click="stepEl = 3">
                  Continue
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-12" height="200px"
                  >33333</v-card
                >
                <v-btn color="primary" @click="stepEl = 3">
                  Continue
                </v-btn>
                <v-btn text>
                  Cancel
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stepEl: 1,
    };
  },
};
</script>
