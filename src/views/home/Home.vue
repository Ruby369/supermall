<template>
  <div id="home">
    <nav-bar class="home-nav" ref="navBar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control1"
      :titles="['流行','新款','精选']"
      @tabClick="tabclick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabclick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- @click.native 必须加上native 否则会被认为监听的是自定义事件 -->
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //写this才会指定这个位置的方法 否则名字相同不知道调用哪个

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = this.debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("homeItemImgLoad", () => {
      // console.log('--')
      // this.$refs.scroll.refresh();
      refresh();
      console.log('--')
    });

    //2.获取tabControl的offsetTop
    //所有的组件都有一个属性$el:用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  destroyed(){
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
    // console.log('活跃')
  },
  deactivated(){
    this.saveY = this.$refs.scroll.scroll.y
    // console.log("去活");
    
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    //防抖函数
    debounce(func, delay) {
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    backclick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    tabclick(index) {
      if (index == 0) {
        this.currentType = "pop";
      } else if (index == 1) {
        this.currentType = "new";
      } else if (index == 2) {
        this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      // switch(index){
      //   case 0:
      //     this.currentType = 'pop'
      //     break
      //   case 1:
      //     this.currentType = 'new'
      //     break
      //   case 2:
      //     this.currentType = 'sell'
      //     break
      // }
    },
    contentScroll(position) {
      // console.log(position)
      // if(position.y < -700){
      //   this.isShowBackTop = true
      // }else{
      //   this.isShowBackTop = false
      // }
      // 1.判断backtop是否显示
      this.isShowBackTop = -position.y > 900;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - this.$refs.navBar.$el.offsetHeight;
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      // console.log(this.$refs.navBar.$el.offsetHeight)
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  /*
  padding-bottom: 55px; 

  另一种解决中间的定位
  position: relative;
  height: 100vh; */
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* 在使用浏览器原生滚动时的样式 用better-scroll时这个样式没用了 */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
/*
.tab-control {
   position: sticky;
  用better-scroll之后 这个不起作用了
  top: 44px;
  background-color: #fff;
}
*/
.tab-control1{
  position: fixed;
  z-index: 10;
  background-color:white;
}
.content {
  height: calc(100vh - 95px);
  overflow: hidden;
  /* 
  另一种解决中间的定位
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}
</style>