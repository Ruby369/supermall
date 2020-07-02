<template>
  <div id="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :tabMenu="tabMenu" ></tab-menu>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabMenu from './childComps/TabMenu'

import {getCategory} from 'network/category'
export default {
  name: "Category",
  components: {
    Scroll,
    NavBar,
    TabMenu
  },
  data() {
    return {
      tabMenu:[]
    }
  },
  created(){
    this._getCategory();
  },
  methods: {
    _getCategory(){
      getCategory().then(res=>{
        console.log(res.data);
        this.tabMenu = res.data.category.list
        console.log(this.tabMenu);
      })
    }
  },
};
</script>

<style scoped>
#category{
  padding-top: 44px;
}
.cate-nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: #ff8198;
  color: #fff;
  z-index: 1;
}
.content{
  height: calc(100vh - 44px - 49px);
}
</style>