import { setInfo, getInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有的mutations的第一个参数，都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  getters: {

  },
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})
      // 购物车信息要重置 (跨模块调用mutation)
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
