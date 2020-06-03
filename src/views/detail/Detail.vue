<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @navBarClick="navBarClick"></detail-nav-bar>
    <scroll class="detail-scroll" ref="detailScroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="commentInfo" @imgLoad="imageLoad"></detail-comment-info>
      <goods-list :goods="recommend" ref="goodsList"></goods-list>
    </scroll>
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
import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

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
    GoodsList
  },
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
      goodsListTop: 0
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
  mounted() {},
  methods: {
    imageLoad() {
      this.$refs.detailScroll.refresh();
      this.paramInfoTop = this.$refs.paramInfo.$el.offsetTop;
      // console.log(this.paramInfoTop)
      this.commentInfoTop = this.$refs.commentInfo.$el.offsetTop;
      console.log("--");
      this.goodsListTop = this.$refs.goodsList.$el.offsetTop;
    },
    navBarClick(index) {
      if (index == 0) {
        this.$refs.detailScroll.scrollTo(0, 0);
      } else if (index == 1) {
        this.$refs.detailScroll.scrollTo(0, -this.paramInfoTop + 44);
      } else if (index == 2) {
        this.$refs.detailScroll.scrollTo(0, -this.commentInfoTop + 44);
      } else if (index == 3) {
        this.$refs.detailScroll.scrollTo(0, -this.goodsListTop + 44);
      }
    },
    contentScroll(position){
      // if(-position.y > this.paramInfoTop && -position.y < this.commentInfoTop){
      //   navBarClick(index=1)
      // }else if(-position.y > this.commentInfoTop && -position.y < this.goodsListTop){
      //   navBarClick(index=2)
      // }else if(-position.y > this.goodsListTop){
      //   navBarClick(index=3)
      // }
      
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
  height: calc(100vh - 44px);
  overflow: hidden;
}
</style>