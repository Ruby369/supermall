<template>
  <tab-bar class="tab-bar" v-show="isShow">
    <tab-bar-item path="/home" activeColor="RGB(255, 87, 119)">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="RGB(255, 87, 119)">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="RGB(255, 87, 119)">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="RGB(255, 87, 119)">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabbar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      isShow: true
    };
  },
  watch: {
    $route(to, from) {
      if (
        to.path == "/home" ||
        to.path == "/category" ||
        to.path == "/profile"
      ) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>

<style scoped>
.tab-bar {
  z-index: 11;
}
</style>