<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4"> <LineChart /></v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import LineChart from '../components/LineChart.vue';
export default {
  components: { LineChart },
  data() {
    return {};
  },
};
</script>
