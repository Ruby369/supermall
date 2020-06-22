<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="left" @click="clickBack">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll ref="scroll" class="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bar @total='total'></cart-bar>
    <!-- <toast :message="message" :toastShow="isShow"></toast> -->
  </div>
</template>

<script>
import "assets/img/iconfont/iconfont.css";
import "assets/img/iconfont/iconfont.js";
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBar from "./childComps/CartBar";
import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";

export default {
  name: "Cart",
  // data() {
  //   return {
  //     message:'',
  //     isShow:false
  //   }
  // },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBar,
    // Toast
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    }
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
    },
    total(){
      if(!this.$store.state.cartList.find(item => item.check == true)){
        this.$toast.show("你还没选择商品",1500)
        // this.isShow = true;
        // this.message = "你没有选择商品"
        // setTimeout(() => {
        //   this.isShow = false;
        // }, 1000);
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: #ff8198;
  color: #ffffff;
}
.scroll {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.icon-fanhui {
  font-size: 20px;
}
</style>