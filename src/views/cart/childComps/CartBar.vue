<template>
  <div class="cart-bar">
    <active class="cb-check" @click.native="cartAllClick" :checked="allSelect">
      <div class="cb-title" slot="title">全选</div>
    </active>
    <div class="cart-bar-price">
      <div class="cb-price">
        合计：￥
        <span>{{totalPrice}}</span>
      </div>
      <div class="cb-totalbtn" @click="total">去计算({{checkCount}})</div>
    </div>
  </div>
</template>

<script>
import Active from "components/content/active/Active";

export default {
  name: "CartBar",
  components: {
    Active
  },
  methods: {
    cartAllClick() {
      let select = this.allSelect;
      if (select) {
        for (let i in this.$store.state.cartList) {
          this.$store.state.cartList[i].check = false;
        }
      } else {
        for (let i in this.$store.state.cartList) {
          this.$store.state.cartList[i].check = true;
        }
      }
    },
    total(){
      this.$emit('total')
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      let list = this.$store.state.cartList;
      let newList = list.filter(function(n) {
        return n.check == true;
      });
      for (let i in newList) {
        total += newList[i].count * newList[i].nowPrice;
      }
      return total.toFixed(2);
      // const cartList = this.$store.state.cartList;
      // return cartList
      //   .filter(item => {
      //     return item.check;
      //   })
      //   .reduce((preValue, item) => {
      //     return preValue + item.count * item.nowPrice;
      //   }, 0)
      //   .toFixed(2);
    },
    checkCount() {
      return this.$store.state.cartList.filter(function(list) {
        return list.check == true;
      }).length;
    },
    allSelect() {
    //find函数
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      return !this.$store.state.cartList.find(function(n) {
        return n.check == false;
      });

    //普通遍历
    //   if (this.$store.state.cartList.length == 0) {
    //     return false;
    //   }
    //   for (let item of this.$store.state.cartList) {
    //     if (!item.check) {
    //       return false;
    //     }
    //   }
    //   return true;
    }
  }
};
</script>

<style scoped>
.cart-bar {
  height: 49px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 15;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.cb-title {
  padding-left: 5px;
}
.cart-bar-price {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cb-price {
  padding-right: 10px;
}
.cb-totalbtn {
  height: 49px;
  padding: 0 10px;
  background-color: #ff8198;
  color: #fff;
  line-height: 49px;
}
</style>