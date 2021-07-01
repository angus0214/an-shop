<template>
  <div>
    <v-row class="pa-8">
      <v-col cols="12">
        <div
          class="text-center text-sm-left text-h4 font-weight-bold blue-grey--text text--darken-2"
        >
          Dashboard
        </div>
      </v-col>
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
          <div class="text-h6 font-weight-bold">
            本年度每月訂單數量
            <span class="text-subtitle-1" v-if="!loaded">圖表載入中 ...</span>
          </div>
          <LineChart
            v-if="loaded"
            :chartdata="ordersChartData"
            :options="options"
          />
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card flat class="chart-container pa-4">
          <div class="text-h6 font-weight-bold">上架商品比例</div>
          <PieChart />
        </v-card>
      </v-col>
      <v-col cols="12"></v-col>
    </v-row>
  </div>
</template>
<script>
import LineChart from '../components/LineChart.vue';
import PieChart from '../components/PieChart.vue';
import moment from 'moment';
export default {
  components: { LineChart, PieChart },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      loaded: false,
      ordersChartData: null,
      orders: {
        data: [],
        total_pages: 0,
      },
    };
  },
  methods: {
    async getChartData() {
      const vm = this;
      let total_page = 1;
      vm.orders.data = [];
      // get total page
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=1`;
      await this.$http.get(api).then((response) => {
        total_page = response.data.pagination.total_pages;
      });
      // fetch all data
      let promiseAry = [];
      for (let i = 1; i <= total_page; i++) {
        let getApi = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${i}`;
        promiseAry.push(
          this.$http.get(getApi).then((response) => {
            vm.orders.data = vm.orders.data.concat(response.data.orders);
          })
        );
      }
      await Promise.all(promiseAry);
      vm.fillData();
      vm.loaded = true;
    },
    fillData() {
      const vm = this;
      let orderschart = {
        labels: [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC',
        ],
        datasets: [
          {
            label: 'Orders',
            backgroundColor: ['#80DEEA'],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: ['#00838F'],
          },
        ],
      };
      vm.orders.data.forEach(function(el) {
        let year = moment(el.create_at * 1000).format('YYYY');
        let month = moment(el.create_at * 1000).format('MM');

        if (year === '2021') {
          switch (month) {
            case '01':
              orderschart.datasets[0].data[0] =
                orderschart.datasets[0].data[0] + 1;
              break;
            case '02':
              orderschart.datasets[0].data[1] =
                orderschart.datasets[0].data[1] + 1;
              break;
            case '03':
              orderschart.datasets[0].data[2] =
                orderschart.datasets[0].data[2] + 1;
              break;
            case '04':
              orderschart.datasets[0].data[3] =
                orderschart.datasets[0].data[3] + 1;
              break;
            case '05':
              orderschart.datasets[0].data[4] =
                orderschart.datasets[0].data[4] + 1;
              break;
            case '06':
              orderschart.datasets[0].data[5] =
                orderschart.datasets[0].data[5] + 1;
              break;
            case '07':
              orderschart.datasets[0].data[6] =
                orderschart.datasets[0].data[6] + 1;
              break;
            case '08':
              orderschart.datasets[0].data[7] =
                orderschart.datasets[0].data[7] + 1;
              break;
            case '09':
              orderschart.datasets[0].data[8] =
                orderschart.datasets[0].data[8] + 1;
              break;
            case '10':
              orderschart.datasets[0].data[9] =
                orderschart.datasets[0].data[9] + 1;
              break;
            case '11':
              orderschart.datasets[0].data[10] =
                orderschart.datasets[0].data[10] + 1;
              break;
            case '12':
              orderschart.datasets[0].data[11] =
                orderschart.datasets[0].data[11] + 1;
              break;
          }
        }
      });
      vm.ordersChartData = Object.assign({}, orderschart);
    },
  },
  async mounted() {
    this.getChartData();
  },
  created() {},
};
</script>
<style lang="scss"></style>
