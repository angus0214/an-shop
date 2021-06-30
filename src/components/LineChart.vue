<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
