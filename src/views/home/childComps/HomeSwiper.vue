<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a>
        <img :src="item.image" alt @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imgLoad(){
      //使用一个变量让发出事件只有一次
      if(!this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }

    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
</style>