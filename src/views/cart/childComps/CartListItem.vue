<template>
  <li class="cart-list-item">
    <active :checked="cartListItem.check" @click.native="activeClick()"></active>
    <div class="item-img">
      <img :src="cartListItem.image" alt />
    </div>
    <div class="item-info">
      <div class="info-top">{{cartListItem.title}}</div>
      <div class="flex"></div>
      <div class="info-center">{{cartListItem.desc}}</div>
      <div class="flex"></div>
      <div class="info-bottom">
        <div class="info-left">
          <span>{{cartListItem.price}}</span>
        </div>
        <div class="info-right">
          <span>x</span>
          <span>{{cartListItem.count}}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Active from "components/content/active/Active";
export default {
  name: "CartListItem",
  props: {
    cartListItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  components: {
    Active
  },
  methods:{
    activeClick(){
      this.$store.commit("cartOneClick",this.cartListItem)
    }
  }
};
</script>

<style scoped>
.cart-list-item {
  display: -webkit-box;
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #cccccc;
}
.item-img {
  padding-left: 5px;
}
.item-img > img {
  width: 70px;
  height: 100px;
  border-radius: 5px;
}
.item-info {
  height: 100px;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 10px;
}
.info-top {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
}
.info-center {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
}
.info-bottom {
  display: -webkit-box;
  display: flex;
}
.info-left {
  color: #ff8198;
  flex: 1;
}
.info-right {
  font-size: 14px;
}
.flex {
  flex: 1;
}
</style>