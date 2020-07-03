<template>
  <div id="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :tabMenu="tabMenu" @selectMenu="selectMenu"></tab-menu>
      <scroll class="cate-scroll" ref="menuItemScroll">
        <tab-menu-item :menuItem="menuItem" @imgLoad="imgLoad"></tab-menu-item>
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="showgoods" class="cate-goods"></goods-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabMenu from "./childComps/TabMenu";
import TabMenuItem from "./childComps/TabMenuItem";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import {debounce} from 'common/utils'
export default {
  name: "Category",
  components: {
    Scroll,
    NavBar,
    TabMenu,
    TabMenuItem,
    TabControl,
    GoodsList
  },
  data() {
    return {
      tabMenu: [],
      currentIndex: Number,
      menuItem: [],
      isControl: "pop",
      goods: {
        pop: [],
        sell: [],
        new: []
      }
    };
  },
  created() {
    this._getCategory();
  },
  mounted(){
    //图片加载完成的事件监听
    let refresh = debounce(this.$refs.menuItemScroll.refresh, 50);
    this.$bus.$on("categoryItemImgLoad", () => {
      refresh()
    });

  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.tabMenu = res.data.category.list;
        this._getSubcategory(0);
      });
    },
    selectMenu(index) {
      this._getSubcategory(index);
    },
    _getSubcategory(index) {
      this.currentIndex = index;
      let mailkey = this.tabMenu[index].maitKey;
      getSubcategory(mailkey).then(res => {
        this.menuItem = res.data.list;
      });
      this._getCategoryDetail("pop");
      this._getCategoryDetail("sell");
      this._getCategoryDetail("new");
    },
    imgLoad() {
      this.$refs.menuItemScroll.refresh();
    },
    _getCategoryDetail(type) {
      let miniWallkey = this.tabMenu[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        this.goods[type] = res;
        // console.log(this.goods);

        this.goods = { ...this.goods };
      });
    },
    tabClick(index) {
      if (index == 0) {
        this.isControl = "pop";
      }
      if (index == 1) {
        this.isControl = "sell";
      }
      if (index == 2) {
        this.isControl = "new";
      }
    },
  },
  computed: {
    showgoods() {
      if (this.isControl == "pop") {
        return this.goods.pop;
      }
      if (this.isControl == "sell") {
        return this.goods.sell;
      }
      if (this.isControl == "new") {
        return this.goods.new;
      }
    }
  }
};
</script>

<style scoped>
#category {
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
.content {
  height: calc(100vh - 44px - 49px);
  display: flex;
}
.cate-scroll {
  flex: 1;
  width: 0;
  height: 100%;
}
</style>