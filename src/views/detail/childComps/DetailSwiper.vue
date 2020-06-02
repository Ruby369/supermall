<template>
  <swiper class="swiper-style">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img class="swiper-img" :src="item" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper';

export default {
    name:'DetailSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return[]
            }
        }
    }
}
</script>

<style scoped>
.swiper-style{
    height: 250px;
    overflow: hidden;
}
</style>