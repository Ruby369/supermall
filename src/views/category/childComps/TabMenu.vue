<template>
  <scroll id="tab-menu">
      <div class="menu-list">
        <div class="menu-item" v-for="(item,index) in tabMenu" :key="index">
          {{item.title}}
        </div>
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
  props:{
    tabMenu:Array
  }
};
</script>

<style>
#tab-menu{
  width: 100px;
  height: 100%;
}
.menu-item{
  height: 45px;
  line-height: 45px;
  text-align: center;
}
</style>