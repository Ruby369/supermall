<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-item"
        v-for="(item,index) in tabMenu"
        :key="index"
        @click="menuClick(index)"
        :class="{active:index == currentIndex}"
      >{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    tabMenu: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    menuClick(index) {
      this.currentIndex = index;
      this.$emit("selectMenu", index);
    }
  }
};
</script>

<style scoped>
#tab-menu {
  width: 100px;
  height: 100%;
  background-color: #f6f6f6;
}
.menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.active{
  font-weight: bold;
  color: #ff8198;
  background-color: #fff;
  border-left: 4px solid #ff8198;
}
</style>