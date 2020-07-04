import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [],
    token:false
  },
  mutations: {
    cartOneClick(state, payload) {
      payload.check = !payload.check
    },
    addProCount(state,payload){
      payload.count += 1
    },
    addPro(state,payload){
      state.cartList.push(payload)
    }

  },
  actions: {
    addCart(context, payload) {
      return new Promise(function (resolve, reject) {
        //1.payload 新添加的商品
        let oldProduct = null;
        for (let i = 0; i < context.state.cartList.length; i++) {
          if (context.state.cartList[i].iid === payload.iid) {
            oldProduct = context.state.cartList[i]
          }
        }
        //查找数组中是否有该商品的另一种办法
        // let oldProduct = state.cartList.find(function(item){
        //   return item.iid === payload.iid
        // })

        //2.判断oldProduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addProCount',oldProduct)
          resolve('当前的商品数量+1')
        } else {
          payload.check = false
          payload.count = 1
          context.commit('addPro',payload)
          // context.state.cartList.push(payload)
          resolve('添加新商品')
        }
      })

    },
  },
  modules: {

  }
})
