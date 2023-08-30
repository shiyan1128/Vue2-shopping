export default {
  // 此处编写的就是 vue组件实例的配置项，通过一定语法，可以直接混入到组件内
  // data methods computed 生命周期函数...
  // 注意点：
  // 1.如果此处 和 组件内，提供了同名的data 或 methods， 则族健脑优先级更高
  // 2.如果编写了生命周期函数，则mixins中的生命周期函数和页面的生命周期函数，会用数组管理统一执行
  data () {
    return {

    }
  },
  methods: {
    // 根据登录状态，判断是否需要显示登录确认框
    // 1.如果未登录 => 显示确认框 返回true
    // 2.如果已登录 => 啥也不干 返回false
    loginConfirm () {
      // 判断token是否存在
      // 1.如果token不存在，需要弹确认框
      // 2.如果token存在,继续操作
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          // 如果希望跳转到登录，登录完成后能跳回来，需要在跳转时携带参数（当前路径地址）
          // this.$route.fullPath (会包含查询参数)
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          }) // 确认
          .catch(() => {}) // 取消
        return true
      }
      return false
    }
  }
}
