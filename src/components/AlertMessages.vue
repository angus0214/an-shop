<template>
  <div class="alert-custom">
    <v-card v-for="(item, i) in messages" :key="i">
      <v-alert
        dense
        text
        border="left"
        :type="item.status"
        close-icon="mdi-close"
        :icon="item.icon"
        class="text-left"
      >
        {{ item.message }}
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status, icon) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        icon,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created () {
    const vm = this
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('messsage:push', (message, status = 'info', icon) => {
      vm.updateMessage(message, status, icon)
    })
    // vm.$bus.$emit('messsage:push');
  }
}
</script>
<style>
.alert-custom {
  position: fixed;
  right: 24px;
  z-index: 999;
  top: 10px;
}
</style>
