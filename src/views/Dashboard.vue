<template>
  <div>
    <v-row class="pa-8">
      <v-col cols="12" sm="3">
        <v-card flat>
          <div class="d-flex justify-space-between align-center pa-3">
            <v-icon size="48" color="green">mdi-cash-100</v-icon>
            <div class="text-right">
              <div class="font-weight-bold">目前收益</div>
              <div class="text-h6">
                $ 15786
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="px-3 py-2 grey--text text--lighten-1 text-caption">
            More Info
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card flat>
          <div class="d-flex justify-space-between align-center pa-3">
            <v-icon size="48" color="blue">mdi-account-plus</v-icon>
            <div class="text-right">
              <div class="font-weight-bold">顧客成長</div>
              <div class="text-h6">
                + 49
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="px-3 py-2 grey--text text--lighten-1 text-caption">
            Last Year
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card flat>
          <div class="d-flex justify-space-between align-center pa-3">
            <v-icon size="48" color="red">mdi-chart-timeline-variant</v-icon>
            <div class="text-right">
              <div class="font-weight-bold">訂單成長</div>
              <div class="text-h6">
                + 13
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="px-3 py-2 grey--text text--lighten-1 text-caption">
            Last Month
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card flat>
          <div class="d-flex justify-space-between align-center pa-3">
            <v-icon size="48" color="indigo">mdi-facebook</v-icon>
            <div class="text-right">
              <div class="font-weight-bold">追蹤人數</div>
              <div class="text-h6">
                + 113
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="px-3 py-2 grey--text text--lighten-1 text-caption">
            Your Page
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card flat class="pa-4 chart-container">
          <LineChart :chartdata="chartdata" :options="options" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card flat class="chart-container pa-4">
          <PieChart :chartdata="chartdata" :options="options" />
        </v-card>
      </v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </div>
</template>
<script>
import LineChart from '../components/LineChart.vue';
import PieChart from '../components/PieChart.vue';
export default {
  components: { LineChart, PieChart },
  data() {
    return {
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#f87979', 'black'],
            data: [40, 20],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
<style lang="scss">
.chart-container {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }
}
</style>
