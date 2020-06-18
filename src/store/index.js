import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      //payload 新添加的商品
      let oldProduct = null;
      for (let i = 0; i < state.cartList.length; i++) {
        if (state.cartList[i].iid === payload.iid) {
          oldProduct = state.cartList[i]
        }
      }
      //查找数组中是否有该商品的另一种办法
      // let oldProduct = state.cartList.find(function(item){
      //   return item.iid === payload.iid
      // })

      //2.判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.check = false
        payload.count = 1
        state.cartList.push(payload)
      }
    },
    cartOneClick(state,payload){
      payload.check = !payload.check
    }
  },
  actions: {
    // addCart(context, payload) {
    //   //payload 新添加的商品
    //   let oldProduct = null;
    //   for (let i = 0; i < context.state.cartList.length; i++) {
    //     if (context.state.cartList[i].iid === payload.iid) {
    //       oldProduct = context.state.cartList[i]
    //     }
    //   }
    //   //查找数组中是否有该商品的另一种办法
    //   // let oldProduct = state.cartList.find(function(item){
    //   //   return item.iid === payload.iid
    //   // })

    //   //2.判断oldProduct
    //   if (oldProduct) {
    //     oldProduct.count += 1
    //   } else {
    //     payload.count = 1
    //     context.state.cartList.push(payload)
    //   }
    // }
  },
  modules: {
  }
})
