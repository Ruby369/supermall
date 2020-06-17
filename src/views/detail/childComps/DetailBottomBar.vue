<template>
  <div class="bottom-bar">
    <div class="bottom-row">
      <div class="bottom-left">
        <div class="bl-con">
          <i class="icon service"></i>
          <div>客服</div>
        </div>
        <div class="bl-con">
          <i class="icon shop"></i>
          <div>店铺</div>
        </div>
        <div class="bl-con">
          <i class="icon select"></i>
          <div>收藏</div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="br-shop" @click="shopClick">加入购物车</div>
        <div class="br-buy">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
      shopClick(){
          this.$emit('shopClick')
      }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.bottom-row,.bottom-left,.bottom-right{
    display: -webkit-box;
    display: flex;
}
.bottom-left,.bl-con{
    -webkit-box-flex: 1;
    flex: 1;
}
.bl-con > .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bl-con > .shop{
    background-position: 0 202px;
}
.bl-con > .service{
    background-position: 0 98px;
}
.bottom-right > div{
    padding: 0 7vw;
    line-height: 49px;
}
.br-shop{
    background-color: #ffe817;
    color: #333333;
}
.br-buy{
    background-color: #ff6699;
    color: #fff;
}
</style>