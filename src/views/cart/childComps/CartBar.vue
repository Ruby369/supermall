<template>
  <div class="cart-bar">
      <active><div slot="title">全选</div></active>
      <div>156465449649849849494654</div>
  </div>
</template>

<script>
import Active from "components/content/active/Active";

export default {
    name:"CartBar",
    components:{
        Active
    }
}
</script>

<style scoped>
.cart-bar{
    height: 49px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 15;
    background-color: #fff;
    display: flex;
}
</style>