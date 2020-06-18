<template>
  <div class="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <scroll class="scroll">
        <cart-list></cart-list>
      </scroll>
      <cart-bar></cart-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBar from './childComps/CartBar'
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:"Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBar

    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    }
}
</script>

<style scoped>
.nav-bar{
  background-color: #ff8198;
  color: #ffffff;
}
.scroll{
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>