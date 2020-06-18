<template>
    <ul class="cart-list">
      <cart-list-item v-for="(item,index) in getCartList" :key="index" :cartListItem="item"></cart-list-item>
    </ul>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    getCartList() {
      return this.$store.state.cartList;
    }
  }
};
</script>

<style scoped>
.cart-list{
    margin: 5px 0;
}
</style>