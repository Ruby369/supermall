<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt @load="imgLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgLoad() {
      if (this.$route.path.indexOf("/home") == -1) {
        this.$bus.$emit("homeItemImgLoad");
        console.log("home");
      } else if (this.$route.path.indexOf("/detail")) {
        this.$bus.$emit("detailItemImgLoad");
        console.log("detail");
      }
      // console.log(this.$bus)
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
    // itemClick(){
    //     this.$router.push({
    //         path:'/path',
    //         query:{
    //             iid:this.goodsItem.iid
    //         }
    //     })
    // }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  }
};
</script>

<style scoped>
.goods-item {
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
}
.goods-info .price {
  color: #ff8198;
}
.goods-info .collect {
  position: relative;
  margin-left: 15px;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  background: url("~assets/img/common/collect.svg");
  background-size: 14px;
  width: 14px;
  height: 14px;
  left: -14px;
  top: -1px;
}
</style>