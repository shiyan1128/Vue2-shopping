import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  // 提供数据
  state: {
  },
  // 提供基于state所派生出来的一些属性
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  // 提供修改数据的方法
  mutations: {
  },
  // 提供异步操作
  actions: {
  },
  // 用来挂载模块到vuex上
  modules: {
    user,
    cart
  }
})
