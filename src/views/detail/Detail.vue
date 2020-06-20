<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @navBarClick="navBarClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="commentInfo" @imgLoad="imageLoad"></detail-comment-info>
      <goods-list :goods="recommend" ref="goodsList"></goods-list>
    </scroll>
    <detail-bottom-bar @shopClick="shopClick"></detail-bottom-bar>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :toastShow="toastShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

//封装的方法和类
import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      paramInfoTop: 0,
      commentInfoTop: 0,
      goodsListTop: 0,
      themeTopYs: [],
      // message:'',
      // toastShow:false
    };
  },
  created() {
    //1.保存存入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      // console.log(res);
      let data = res.result;
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("detailItemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.paramInfoTop = this.$refs.paramInfo.$el.offsetTop - 44;
      // console.log(this.paramInfoTop)
      this.commentInfoTop = this.$refs.commentInfo.$el.offsetTop - 44;
      this.goodsListTop = this.$refs.goodsList.$el.offsetTop - 44;
      console.log("刷新滚动条完成");

      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop - 44)
      // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop - 44)
      // this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop - 44)
      // this.themeTopYs.push(Number.MAX_VALUE) //hadk写法添加条件
      // console.log(this.themeTopYs)
      //P206、207
    },
    navBarClick(index) {
      if (index == 0) {
        this.$refs.scroll.scrollTo(0, 0);
      } else if (index == 1) {
        this.$refs.scroll.scrollTo(0, -this.paramInfoTop);
      } else if (index == 2) {
        this.$refs.scroll.scrollTo(0, -this.commentInfoTop);
      } else if (index == 3) {
        this.$refs.scroll.scrollTo(0, -this.goodsListTop);
      }
    },
    contentScroll(position) {
      let positionY = -position.y;
      if (positionY > 0 && positionY < this.paramInfoTop) {
        this.$refs.nav.currentIndex = 0;
      } else if (
        positionY >= this.paramInfoTop &&
        positionY < this.commentInfoTop
      ) {
        this.$refs.nav.currentIndex = 1;
      } else if (
        positionY >= this.commentInfoTop &&
        positionY < this.goodsListTop
      ) {
        this.$refs.nav.currentIndex = 2;
      } else if (positionY >= this.goodsListTop) {
        this.$refs.nav.currentIndex = 3;
      }

      // let length = this.themeTopYs.length
      // for(let i = 0;i<length;i++){
      //   if(this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
      //   ||(i === length - 1 && positionY >= this.themeTopYs[i]))){
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      // hack做法
      // for (let i = 0; i < length - 1; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      //P206、207
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
    },
    shopClick() {
      //1.获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.price;
      product.iid = this.iid;
      product.nowPrice = this.goods.nowPrice;
      //2.将商品添加到购物车里
      // this.$route.cartList.push(product) 不要直接加进去 这样vue工具检测不到
      // 放进mutations 同步
      // this.$store.commit("addCart", product);
      // 放进actions 异步 promise
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res,1500)
        // this.toastShow = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.toastShow = false;
        //   this.message = '';
        // }, 1000);
        // console.log(res);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 13;
  background-color: #fff;
}
.detail-navbar {
  position: relative;
  z-index: 14;
  background-color: #fff;
}
.detail-scroll {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>