<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  nama: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log('--')
    }
  },
  mounted() {
    //不要用js原生方法拿元素 用ref定义来拿
    // 1.创建BScroll
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      //默认值为0 可选1、2、3
      //0,1都是不侦测实时的位置
      //2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      //3: 只要是滚动，都侦测。
      pullUpLoad: this.pullUpLoad
    });
    // 2.监听滚动的位置
    this.scroll.on("scroll", position => {
      // console.log(position)
      this.$emit("scroll", position);
    });
    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  }
};
</script>

<style scoped>
</style>