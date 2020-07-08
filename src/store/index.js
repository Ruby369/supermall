import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [
      { "image": "//s5.mogucdn.com/mlcdn/c45406/180815_81dj3id2i70kfeh4eekd94k9ij0k4_640x913.jpg", "title": "2018秋冬新款ins超火针织时尚两件套小香风套装女", "desc": "新款", "price": "¥108.00", "iid": "1m76l50", "nowPrice": "154.29", "check": false, "count": 1 },
      { "image": "//s3.mogucdn.com/mlcdn/55cf19/180917_7e2fdc2d8131698jkg69c9586lkel_640x960.jpg", "title": "2018新款时尚百搭黑色宽松机车皮夹克+网纱半身裙套装两件套", "desc": "新款", "price": "¥158.00", "iid": "1m8o442", "nowPrice": "225.72", "check": false, "count": 1 }
    ],
    token: ''
  },
  mutations: {
    cartOneClick(state, payload) {
      payload.check = !payload.check
    },
    addProCount(state, payload) {
      payload.count += 1
    },
    addPro(state, payload) {
      state.cartList.push(payload)
    },
    AddToken(state, payload) {
      state.token = payload
    },
    exitClick(state, payload) {
      state.token = ''
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
          context.commit('addProCount', oldProduct)
          resolve('当前的商品数量+1')
        } else {
          payload.check = false
          payload.count = 1
          context.commit('addPro', payload)
          // context.state.cartList.push(payload)
          resolve('添加新商品')
        }
      })

    },
  },
  modules: {

  }
})
