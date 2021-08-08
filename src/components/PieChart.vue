<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,

  data () {
    return {
      chartdata: {
        labels: ['watches', 'sunglasses', 'ring', 'necklace', 'earings'],
        datasets: [
          {
            backgroundColor: ['#F44336', '#3F51B5', '#009688', '#FF9800', '#795548'],
            data: [40, 20, 10, 20, 30]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      products: []
    }
  },
  async mounted () {
    await this.getProducts()
    this.renderChart(this.chartdata, this.options)
  },
  methods: {
    async getProducts () {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`
      const vm = this
      const data = [0, 0, 0, 0, 0]
      await this.$http.get(api).then((response) => {
        response.data.products.forEach(function (el) {
          switch (el.category) {
            case 'watches':
              data[0] = data[0] + 1
              break
            case 'sunglasses':
              data[1] = data[1] + 1
              break
            case 'ring':
              data[2] = data[2] + 1
              break
            case 'necklace':
              data[3] = data[3] + 1
              break
            case 'earings':
              data[4] = data[4] + 1
              break
          }
        })
        vm.chartdata.datasets[0].data = data
      })
    }
  }
}
</script>
